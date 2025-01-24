from rest_framework import serializers
from articles.models import Articles
from articles.models import Category
from bonds.models import Bonds
from authentication.models import User


class AdminCategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ['name']


class AdminAllUsersSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username', 'email', 'is_staff', 'is_active']


class AdminUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username']


class AdminCategorySerializerCreate(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ["name", "slug"]

	def validate_slug(self, value):
		if Category.objects.filter(slug=value).exists():
			raise serializers.ValidationError(
				"Слаг должен быть уникальным. Измените название")
		return value


class AdminArticleSerializerCreate(serializers.ModelSerializer):
	category = serializers.PrimaryKeyRelatedField(
		queryset=Category.objects.all()
	)
	img = serializers.ImageField(required=False)

	class Meta:
		model = Articles
		fields = ['title', 'description', 'img', 'is_published', 'category', 'slug']

	def create(self, validated_data):
		"""
		Custom logic for creating an article instance.
		"""
		# Include any additional data handling if required
		return Articles.objects.create(**validated_data)

	def validate_title(self, value):
		"""
		Validate that the title meets the required criteria.
		"""
		if len(value) < 5:
			raise serializers.ValidationError(
				"Заголовок должен содержать не менее 5 символов."
			)
		return value

	def validate_slug(self, value):
		"""
		Ensure the slug is unique for new articles.
		"""
		if Articles.objects.filter(slug=value).exists():
			raise serializers.ValidationError("Слаг должен быть уникальным.")
		return value



class AdminArticleSerializerEdit(serializers.ModelSerializer):
	category = serializers.PrimaryKeyRelatedField(
		queryset=Category.objects.all())
	img = serializers.ImageField(required=False)

	class Meta:
		model = Articles
		fields = ['title', 'description', 'img', 'is_published', 'category', 'slug']

	def create(self, validated_data):
		return Articles.objects.create(**validated_data)

	def validate_title(self, value):
		if len(value) < 5:
			raise serializers.ValidationError(
				"Заголовок должен содержать не менее 5 символов.")
		return value

	def validate_slug(self, value):
		if Articles.objects.filter(slug=value).exists():
			raise serializers.ValidationError("Слаг должен быть уникальным.")
		return value


class AdminArticleSerializer(serializers.ModelSerializer):
	category = AdminCategorySerializer()
	author = AdminUserSerializer()

	class Meta:
		model = Articles
		fields = ['title', 'author', 'is_published', 'category', 'time_update']


class AdminBondSerializer(serializers.ModelSerializer):
	class Meta:
		model = Bonds
		fields = ['title', 'is_published', 'maturity', 'cupon_percent', 'category']
