#!/usr/local/bin/python
# -*- coding: utf-8 -*-
import csv
import json
import logging
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.http import HttpResponse
from django.conf import settings
from django.contrib import messages
from django.views import View
from django.views.generic.edit import CreateView
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
from authentication.permissions import AdminCreatorOnly
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
from .forms import ArticlesCSVForm
from .forms import ArticlesJSONForm
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
	permission_classes = [AdminCreatorOnly]
	queryset = Articles.objects.filter(
		is_published=True).select_related('category')

	def get(self, request, *args, **kwargs):
		""" List with all articles """
		serializer = ArticlesSerializer(self.queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def post(self, request, *args, **kwargs):
		serializer = ArticlesSerializer(data=request.data)
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
		post = Articles.objects.filter(is_published=True, post_slug=post_slug)
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


class GenerateCSV(View):
	permission_classes = [IsAdminUser]

	def get(self, request, *args, **kwargs):
		response = HttpResponse(content_type='text/csv')
		response['Content-Disposition'] = 'attachment; filename="articles.csv"'

		articles = Articles.objects.values_list(
				'id',
				'title',
				'category__name',
				'description',
				'img',
				'is_published')
		writer = csv.writer(response, delimiter=';')
		writer.writerow([
				"id",
				"title",
				"category",
				"description",
				"img",
				"is_published"])
		writer.writerows(articles)

		return response


class UploadCSV(CreateView):
	permission_classes = [IsAdminUser]
	model = Articles
	form_class = ArticlesCSVForm
	template_name = "options/upload.html"

	def post(self, request, *args, **kwargs):
		if "csv_file" not in request.FILES:
			messages.error(request, "No file was uploaded")
			return super().post(request, *args, **kwargs)

		csv_file = request.FILES["csv_file"]
		if not csv_file.name.endswith('.csv'):
			messages.error(request, "File isn't a CSV")
			return super().post(request, *args, **kwargs)

		try:
			file_data = csv_file.read().decode("utf-8").splitlines()
			with transaction.atomic():
				for line in csv.reader(file_data, delimiter=';'):
					article_data = {
						'title': line[1],
						'category': Category.objects.get(name=line[2]),
						'description': line[3],
						'img': line[4],
						'is_published': line[5]
					}
					Articles.objects.create(**article_data)
		except Exception as e:
			messages.error(request, f"Unable to upload file. {repr(e)}")
			transaction.rollback()
		return super().post(request, *args, **kwargs)


class GenerateJSON(View):
	permission_classes = [IsAdminUser]

	def get(self, request, *args, **kwargs):
		articles = Articles.objects.values(
			'id',
			'title',
			'category__name',
			'description',
			'img',
			'is_published'
		)

		articles_list = list(articles)

		json_data = json.dumps(articles_list, ensure_ascii=False)

		response = HttpResponse(
				json_data,
				content_type='application/json; charset=utf-8')
		return response


class UploadJSON(CreateView):
	permission_classes = [IsAdminUser]
	model = Articles
	form_class = ArticlesJSONForm
	template_name = "options/upload_json.html"

	def post(self, request, *args, **kwargs):
		# Instantiate the form with the uploaded file
		form = self.get_form()

		if form.is_valid():
			json_file = form.cleaned_data['json_file']

			try:
				# Read and decode the JSON file
				file_data = json_file.read().decode("utf-8")
				articles_data = json.loads(file_data)

				with transaction.atomic():
					for article in articles_data:
						# Assuming the JSON structure has keys
						# matching the fields in your Articles model
						article_data = {
							'title': article.get('title'),
							'category': Category.objects.get(name=article.get('category__name')),
							'description': article.get('description'),
							'img': article.get('img'),
							'is_published': article.get('is_published')
						}
						Articles.objects.create(**article_data)

				messages.success(
						request,
						"JSON file uploaded and articles created successfully.")

			except json.JSONDecodeError:
				messages.error(request, "Invalid JSON format.")
			except Exception as e:
				messages.error(request, f"Unable to upload file. {repr(e)}")
				transaction.rollback()

		else:
			messages.error(
					request,
					"There was an error with your form. Please try again.")

		return super().post(request, *args, **kwargs)
