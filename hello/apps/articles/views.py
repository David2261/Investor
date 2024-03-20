import csv
import logging
from django.http import Http404, HttpResponse
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.conf import settings
from django.shortcuts import render
from django.contrib import messages
# DRF - API
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.response import Response

from authentication.models import User
from authentication.permissions import AdminCreatorOnly
from .segregation.decorators import counted
from .models import Category, Articles
from .serializers import (
	CategorySerializer,
	ArticlesSerializer,
	UserSerializer,
	ArticleDetailSerializer
)

logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")


class ArticlesList(ListAPIView):
	permissions_classes = [permissions.AllowAny]
	queryset = Articles.objects.filter(is_published=True)
	serializer_class = ArticlesSerializer

	def get(self, request, *args, **kwargs):
		""" List with all articles """
		return self.list(
				self.serializer_class.data,
				status=status.HTTP_200_OK)

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


@method_decorator(login_required, name="dispatch")
class ArticleDetail(APIView):
	permissions_classes = [permissions.AllowAny]

	def get_object(self, cat_slug, post_slug):
		try:
			return Articles.objects.filter(category__slug=cat_slug).get(slug=post_slug)
		except Articles.DoesNotExist:
			raise Http404

	@counted
	def get(self, request, cat_slug, post_slug, format=None):
		article = self.get_object(cat_slug, post_slug)
		serializer = ArticleDetailSerializer(article)
		return Response(serializer.data)


class ArticleAPICreator(APIView):
	permission_classes = [AdminCreatorOnly]
	queryset = Articles.objects.filter(is_published=True)
	serializer_class = ArticlesSerializer

	def get(self, request, *args, **kwargs):
		""" List with all articles """
		return self.list(
				self.serializer_class.data,
				status=status.HTTP_200_OK)

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

	def put(self, request, post_slug):
		saved_post = Articles.objects.filter(is_published=True, post_slug=post_slug)
		data = {
			"title": request.data.get('title'),
			"description": request.data.get('description'),
			"category": request.data.get('category'),
			"img": request.data.get('img'),
			"user": request.user.id
		}
		serializer = ArticlesSerializer(
				instance=saved_post,
				data=data,
				partial=True)
		if serializer.is_valid(raise_exception=True):
			post_saved = serializer.save()
		return Response(post_saved, status=status.HTTP_200_OK)

	def delete(self, request, post_slug):
		post = Articles.objects.filter(is_published=True, post_slug=post_slug)
		post.delete()
		return Response(status=status.HTTP_202_ACCEPTED)


class CategoriesList(ListAPIView):
	serializer_class = CategorySerializer
	queryset = Category.objects.all()
	permission_classes = [permissions.AllowAny]

	def get(self, request, *args, **kwargs):
		""" List with all categories """
		return self.list(
				self.serializer_class.data,
				status=status.HTTP_200_OK)


class CategoryDetail(APIView):
	permissions_classes = [permissions.AllowAny]

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
	permissions_classes = [permissions.AllowAny]
	# authentication_classes = [TokenAuthentication]
	serializer_class = UserSerializer


def generate_csv(request):
	response = HttpResponse(content_type='text/csv')
	response['Content-Disposition'] = 'attachment; filename="file.csv"'
	articles = Articles.objects.all()
	writer = csv.writer(response)
	for article in articles:
		writer.writerow([
			article.title,
			article.category,
			article.description,
			article.img,
			article.is_published])
	return response


def upload_csv(request):
	data = {}
	if "GET" == request.method:
		return render(request, "options/upload.html", data)

	try:
		csv_file = request.FILES["csv_file"]
		if not csv_file.name.endswith('.csv'):
			messages.error(request, "File isn't a CSV")
			return HttpResponseRedirect(reverse("articles:upload_csv"))
		if csv_file.multiple_chunks():
			messages.error(
				request,
				"Uploaded file is too big (%.2f MB). " % (csv_file.size / (1000 * 1000),))
			return HttpResponseRedirect(reverse("articles:upload_csv"))

		file_data = csv_file.read().decode("utf-8")

		lines = file_data.split("\n")

		for line in lines:
			fields = line.split(",")

			try:
				article = Articles(
					title=fields[0],
					description=fields[1],
					img=fields[3],
					is_published=fields[4])
				article.save()

			except Exception as e:
				messages.error(request, "Unable to upload file. " + repr(e))
				pass
	except Exception as e:
		messages.error(request, "Unable to upload file. " + repr(e))

	return HttpResponseRedirect(reverse("articles:upload_csv"))
