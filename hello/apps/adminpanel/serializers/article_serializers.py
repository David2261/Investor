from rest_framework import serializers
from articles.models import Articles, Category
from authentication.models import User
from .base_serializers import ValidateTitleSlugMixin
from .category_serializers import AdminCategorySerializer


class AdminUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username']


class AdminArticleSerializerCreate(
		serializers.ModelSerializer,
		ValidateTitleSlugMixin):
	category = serializers.PrimaryKeyRelatedField(
		queryset=Category.objects.all())
	img = serializers.ImageField(required=False)

	class Meta:
		model = Articles
		fields = [
			'title',
			'description',
			'img',
			'is_published',
			'category',
			'slug']

	def create(self, validated_data):
		return Articles.objects.create(**validated_data)


class AdminArticleSerializerEdit(
		serializers.ModelSerializer,
		ValidateTitleSlugMixin):
	category = serializers.PrimaryKeyRelatedField(
		queryset=Category.objects.all())
	img = serializers.ImageField(required=False)

	class Meta:
		model = Articles
		fields = [
			'title',
			'description',
			'img',
			'is_published',
			'category',
			'slug']


class AdminArticleSerializer(serializers.ModelSerializer):
	category = AdminCategorySerializer()
	author = AdminUserSerializer()

	class Meta:
		model = Articles
		fields = [
			'title',
			'author',
			'is_published',
			'category',
			'time_update',
			'slug']
