#!/usr/local/bin/python
# -*- coding: utf-8 -*-
import logging
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.conf import settings
from django.utils import timezone
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
from authentication.permissions import AdminCreatorOnly
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
	""" Main page """
	serializer_class = ArticlesSerializerHome
	pagination_class = None


class ArticlesList(BaseArticleList):
	""" All articles """
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
	""" Article API for creators """
	permission_classes = [AdminCreatorOnly]

	def get_queryset(self):
		return Articles.objects.filter(is_published=True).select_related('category')

	def get(self, request, *args, **kwargs):
		""" List with all articles """
		queryset = self.get_queryset()
		serializer = ArticlesSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def get_object(self, category_slug, post_slug):
		category = get_object_or_404(Category, slug=category_slug)
		article = get_object_or_404(Articles, category=category, slug=post_slug)
		return article

	def post(self, request, *args, **kwargs):
		data = self._get_article_data(request)
		serializer = ArticlesSerializer(data=data, context={"request": request})
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def put(self, request, cat_slug, post_slug):
		article = self.get_object(cat_slug, post_slug)
		data = request.data.copy()

		serializer = ArticlesSerializer(
			article,
			data=data,
			partial=True,
			context={"request": request},
		)

		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, cat_slug, post_slug) -> Response:
		article = self.get_object(cat_slug, post_slug)
		if article.author != request.user:
			return Response(
				{"error": "You do not have permission to delete this article."},
				status=status.HTTP_403_FORBIDDEN
			)

		article.delete()
		return Response(status=status.HTTP_202_ACCEPTED)

	def _get_article_data(self, request):
		""" Helper method to extract article data from request """
		return {
			"title": request.data.get('title'),
			"description": request.data.get('description'),
			"category": request.data.get('category'),
			"img": request.data.get('img'),
			"author": request.user,
			"time_create": timezone.now(),
		}


class CategoriesList(ListAPIView):
	""" All categories """
	authentication_classes = []
	serializer_class = CategorySerializer
	queryset = Category.objects.all()
	permission_classes = [permissions.AllowAny]

	@method_decorator(cache_page(60 * 15))
	def get(self, request, *args, **kwargs):
		""" List with all categories """
		return super().get(request, *args, **kwargs)


class CategoryDetail(APIView):
	""" Detail category used for filter """
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
