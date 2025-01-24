#!/usr/local/bin/python
# -*- coding: utf-8 -*-
import logging
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.conf import settings
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
# DRF - API
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from authentication.models import User
from authentication.permissions import IsAdminUser
from segregation.decorators import counted
from segregation.views import BaseArticleList
from .models import Articles
from .models import Category
from .serializers import (
	CategorySerializer,
	ArticlesSerializer,
	UserSerializer,
	ArticleDetailSerializer,
	ArticlesSerializerHome)
from .pagination import ArticlesPagination
from .filters import ArticleFilter

logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")


class ArticlesListHome(BaseArticleList):
	serializer_class = ArticlesSerializerHome
	pagination_class = None


class ArticlesList(BaseArticleList):
	serializer_class = ArticlesSerializer
	pagination_class = ArticlesPagination
	filter_backends = [DjangoFilterBackend, OrderingFilter]
	permissions_classes = [permissions.IsAuthenticated]
	filterset_class = ArticleFilter
	ordering_fields = ['popularity', 'time_create']
	ordering = ['-time_create']

	def get_queryset(self):
		queryset = super().get_queryset()
		category_slug = self.request.query_params.get('category', None)
		if category_slug:
			queryset = queryset.filter(category__slug=category_slug)
		return queryset

	@method_decorator(cache_page(60 * 15))
	def get(self, request, *args, **kwargs):
		""" List with all articles """
		return super().list(request, *args, **kwargs)

	def post(self, request, *args, **kwargs):
		data = {
			"title": request.data.get('title'),
			"description": request.data.get('description'),
			"category": request.data.get('category'),
			"img": request.data.get('img'),
			"user": request.user.id
		}
		serializer = ArticlesSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return self.create(
					serializer.data,
					status=status.HTTP_201_CREATED)
		return self.create(
				serializer.errors,
				status=status.HTTP_400_BAD_REQUEST)


class ArticleDetail(APIView):
	permissions_classes = [permissions.IsAuthenticated]

	def get_object(self, cat_slug, post_slug):
		try:
			return Articles.objects.select_related(
				'category').get(category__slug=cat_slug, slug=post_slug)
		except Articles.DoesNotExist:
			raise Http404

	@method_decorator(cache_page(60 * 15))
	@counted
	def get(self, request, cat_slug, post_slug, format=None):
		article = self.get_object(cat_slug, post_slug)
		serializer = ArticleDetailSerializer(article)
		return Response(serializer.data)


class ArticleAPICreator(APIView):
	permission_classes = [IsAdminUser]

	def get_queryset(self):
		return Articles.objects.filter(is_published=True).select_related('category')

	def get(self, request, *args, **kwargs):
		""" List with all articles """
		queryset = self.get_queryset()
		serializer = ArticlesSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def post(self, request, *args, **kwargs):
		title = request.data.get("title")
		description = request.data.get("description")
		category_name = request.data.get("category")

		if not title or not description or not category_name:
			return Response(
				{"error": "Title, description, and category are required."},
				status=status.HTTP_400_BAD_REQUEST)

		category, _ = Category.objects.get_or_create(name=category_name)

		article = Articles.objects.create(
			title=title,
			category=category.id,
			description=description,
			author=request.user.id
		)

		serializer = ArticlesSerializer(article)
		if serializer.is_valid():
			serializer.save(user=request.user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def put(self, request, post_slug):
		article = get_object_or_404(Articles, is_published=True, slug=post_slug)
		serializer = ArticlesSerializer(article, data=request.data, partial=True)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, post_slug):
		post = Articles.objects.filter(is_published=True, slug=post_slug)
		post.delete()
		return Response(status=status.HTTP_202_ACCEPTED)


class CategoriesList(ListAPIView):
	serializer_class = CategorySerializer
	queryset = Category.objects.all()
	permissions_classes = [permissions.IsAuthenticated]

	@method_decorator(cache_page(60 * 15))
	def get(self, request, *args, **kwargs):
		""" List with all categories """
		return self.list(
				self.serializer_class.data,
				status=status.HTTP_200_OK)


class CategoryDetail(APIView):
	permissions_classes = [permissions.IsAuthenticated]

	def get_object(self, cat_slug):
		try:
			return Category.objects.get(slug=cat_slug)
		except Category.DoesNotExist:
			raise Http404

	def get(self, request, cat_slug: str, format=None):
		categories = self.get_object(cat_slug)
		serializer = CategorySerializer(categories)
		return Response(serializer.data, status=status.HTTP_200_OK)


class UserList(ListAPIView):
	queryset = User.objects.all()
	permission_classes = [IsAdminUser]
	serializer_class = UserSerializer
