from django.urls import reverse
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import generics
from rest_framework import status
from articles.models import Articles
from bonds.models import Bonds
from articles.models import Category
from .serializers.category_serializers import AdminCategorySerializerEdit
from .serializers.article_serializers import AdminArticleSerializerEdit
from .serializers.bond_serializers import AdminBondSerializerEdit
from .serializers.user_serializers import AdminUserSerializerEdit
from authentication.permissions import IsAdminUser
from authentication.models import User


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
		bond_slug = self.kwargs.get('bond_slug')
		return get_object_or_404(Bonds, slug=bond_slug)

	def update(self, request, *args, **kwargs):
		bond = self.get_object()
		serializer = self.get_serializer(bond, data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_update(serializer)

		bond_url = reverse('adminpanel:bonds-edit', kwargs={'bond_slug': bond.slug})
		return Response({
			"detail": "Bond updated successfully.",
			"url": bond_url
		}, status=status.HTTP_200_OK)

	def destroy(self, request, *args, **kwargs):
		bond = self.get_object()
		bond.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


class AppAdminUserEdit(generics.RetrieveUpdateDestroyAPIView):
	queryset = User.objects.all()
	serializer_class = AdminUserSerializerEdit
	lookup_field = 'pk'

	def get_object(self):
		user_id = self.kwargs.get('pk')
		return get_object_or_404(User, pk=user_id)

	def get_permissions(self):
		if self.request.method in ['PUT', 'PATCH']:
			permission_classes = [IsAdminUser]
		elif self.request.method == 'DELETE':
			permission_classes = []
		else:
			permission_classes = []

		return [permission() for permission in permission_classes]

	def update(self, request, *args, **kwargs):
		user = self.get_object()
		serializer = self.get_serializer(
			user,
			data=request.data,
			context={'request': request})
		serializer.is_valid(raise_exception=True)
		self.perform_update(serializer)

		return Response({
			"detail": "User updated successfully.",
			"user": serializer.data
		}, status=status.HTTP_200_OK)

	@action(detail=True, methods=['patch'], url_path='activate')
	def activate(self, request, pk=None):
		user = self.get_object()

		# Проверим, что только админ может менять активность
		if not request.user.is_staff:
			return Response(
				{"detail": "Недостаточно прав для активации/деактивации пользователя."},
				status=status.HTTP_403_FORBIDDEN)

		is_active = request.data.get('is_active')
		if is_active is None:
			return Response(
				{"detail": "Необходимо указать 'is_active' в теле запроса."},
				status=status.HTTP_400_BAD_REQUEST)

		user.is_active = bool(is_active)
		user.save()

		return Response({
			"detail": f"Пользователь \
				{'активирован' if user.is_active else 'деактивирован'}.",
			"user": self.get_serializer(user).data
		}, status=status.HTTP_200_OK)

	def destroy(self, request, *args, **kwargs):
		user = self.get_object()
		# Проверяем, что пользователь - не админ
		if not request.user.is_staff or not request.user.is_superuser:
			if user != request.user:
				Response(
					{"detail": "Вы можете удалять только собственный аккаунт."},
					status=status.HTTP_403_FORBIDDEN)
		else:
			if user.is_staff:
				return Response(
					{"detail": "Нельзя удалить другого администратора."},
					status=status.HTTP_403_FORBIDDEN)

		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
