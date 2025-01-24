from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from authentication.permissions import IsAdminUser
from articles.models import Articles
from articles.models import Category
from .serializers import AdminArticleSerializerEdit
from .serializers import AdminCategorySerializerCreate
from .serializers import AdminArticleSerializerCreate


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


class AppAdminArticleEdit(generics.RetrieveUpdateDestroyAPIView):
	queryset = Articles.objects.all()
	serializer_class = AdminArticleSerializerEdit
	permission_classes = [IsAdminUser]

	def get_object(self):
		return super().get_object()

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
