from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from articles.models import Articles
from bonds.models import Bonds
from articles.models import Category
from .serializers.category_serializers import AdminCategorySerializerEdit
from .serializers.article_serializers import AdminArticleSerializerEdit
from .serializers.bond_serializers import AdminBondSerializerEdit
from authentication.permissions import IsAdminUser


class AppAdminCategoryEdit(generics.RetrieveUpdateDestroyAPIView):
	queryset = Category.objects.all()
	serializer_class = AdminCategorySerializerEdit
	permission_classes = [IsAdminUser]

	def get_object(self):
		cat_slug = self.kwargs.get('cat_slug')
		return get_object_or_404(Category, slug=cat_slug)

	def update(self, request, *args, **kwargs):
		category = self.get_object()
		serializer = self.get_serializer(category, data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_update(serializer)

		category_url = category.get_absolute_url()
		return Response({
			"detail": "Category updated successfully.",
			"url": category_url},
			status=status.HTTP_200_OK)

	def destroy(self, request, *args, **kwargs):
		category = self.get_object()
		category.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


class AppAdminArticleEdit(generics.RetrieveUpdateDestroyAPIView):
	queryset = Articles.objects.all()
	serializer_class = AdminArticleSerializerEdit
	permission_classes = [IsAdminUser]

	def get_object(self):
		cat_slug = self.kwargs.get('cat_slug')
		post_slug = self.kwargs.get('post_slug')
		return get_object_or_404(Articles, slug=post_slug, category__slug=cat_slug)

	def update(self, request, *args, **kwargs):
		article = self.get_object()
		serializer = self.get_serializer(article, data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_update(serializer)

		article_url = article.get_absolute_url()
		return Response({
			"detail": "Article updated successfully.",
			"url": article_url},
			status=status.HTTP_200_OK)

	def destroy(self, request, *args, **kwargs):
		article = self.get_object()
		article.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


class AppAdminBondEdit(generics.RetrieveUpdateDestroyAPIView):
	queryset = Bonds.objects.all()
	serializer_class = AdminBondSerializerEdit
	permission_classes = [IsAdminUser]

	def get_object(self):
		bond_slug = self.kwargs.get('post_slug')
		return get_object_or_404(Bonds, slug=bond_slug)

	def update(self, request, *args, **kwargs):
		bond = self.get_object()
		serializer = self.get_serializer(bond, data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_update(serializer)

		bond_url = bond.get_absolute_url()
		return Response({
			"detail": "Bond updated successfully.",
			"url": bond_url
		}, status=status.HTTP_200_OK)

	def destroy(self, request, *args, **kwargs):
		bond = self.get_object()
		bond.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
