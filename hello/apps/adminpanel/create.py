from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from authentication.permissions import IsAdminUser
from articles.models import Articles
from articles.models import Category
from bonds.models import Bonds
from .serializers.category_serializers import AdminCategorySerializerCreate
from .serializers.article_serializers import AdminArticleSerializerCreate
from .serializers.bond_serializers import AdminBondSerializerCreate


class AppAdminCategoryCreate(generics.CreateAPIView):
	queryset = Category.objects.all()
	serializer_class = AdminCategorySerializerCreate
	permission_classes = [IsAdminUser]

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		return Response(serializer.data, status=status.HTTP_201_CREATED)


class AppAdminArticleCreate(generics.CreateAPIView):
	queryset = Articles.objects.all()
	serializer_class = AdminArticleSerializerCreate
	permission_classes = [IsAdminUser]

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		return Response(serializer.data, status=status.HTTP_201_CREATED)


class AppAdminBondCreate(generics.CreateAPIView):
	queryset = Bonds.objects.all()
	serializer_class = AdminBondSerializerCreate
	permission_classes = [IsAdminUser]

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		return Response(serializer.data, status=status.HTTP_201_CREATED)
