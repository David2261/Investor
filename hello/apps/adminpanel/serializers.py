from rest_framework import serializers
from articles.models import Articles
from articles.models import Category
from bonds.models import Bonds
from authentication.models import User


class AdminCategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ['name', "slug"]


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
		fields = [
			'title',
			'description',
			'price',
			'maturity',
			'cupon',
			'cupon_percent',
			'time_create',
			'slug']


class AdminBondSerializerCreate(serializers.ModelSerializer):
	class Meta:
		model = Bonds
		fields = [
			'title',
			'description',
			'price',
			'maturity',
			'cupon',
			'cupon_percent',
			'time_create',
			'slug']

	def create(self, validated_data):
		"""
		Custom logic for creating a bond instance.
		"""
		return Bonds.objects.create(**validated_data)

	def validate_title(self, value):
		"""
		Validate that the title meets the required criteria.
		"""
		if len(value) < 5:
			raise serializers.ValidationError(
				"Заголовок должен содержать не менее 5 символов."
			)
		return value

	def validate_price(self, value):
		"""
		Validate that the price is a positive number.
		"""
		if value <= 0:
			raise serializers.ValidationError("Цена должна быть положительным числом.")
		return value

	def validate_slug(self, value):
		"""
		Ensure the slug is unique for new bonds.
		"""
		if Bonds.objects.filter(slug=value).exists():
			raise serializers.ValidationError("Слаг должен быть уникальным.")
		return value


class AdminBondSerializerEdit(serializers.ModelSerializer):
	class Meta:
		model = Bonds
		fields = [
			'title',
			'description',
			'price',
			'maturity',
			'cupon',
			'cupon_percent',
			'slug']

	def update(self, instance, validated_data):
		"""
		Custom logic for updating a bond instance.
		"""
		instance.title = validated_data.get('title', instance.title)
		instance.description = validated_data.get(
			'description',
			instance.description)
		instance.price = validated_data.get('price', instance.price)
		instance.maturity = validated_data.get('maturity', instance.maturity)
		instance.cupon = validated_data.get('cupon', instance.cupon)
		instance.cupon_percent = validated_data.get(
			'cupon_percent',
			instance.cupon_percent)
		instance.slug = validated_data.get('slug', instance.slug)
		instance.save()
		return instance

	def validate_title(self, value):
		if len(value) < 5:
			raise serializers.ValidationError(
				"Заголовок должен содержать не менее 5 символов."
			)
		return value

	def validate_slug(self, value):
		if Bonds.objects.filter(slug=value).exists():
			raise serializers.ValidationError("Слаг должен быть уникальным.")
		return value

	def validate_price(self, value):
		if value <= 0:
			raise serializers.ValidationError("Цена должна быть положительным числом.")
		return value

	def validate_maturity(self, value):
		from django.utils import timezone
		if value <= timezone.now().date():
			raise serializers.ValidationError("Дата погашения должна быть в будущем.")
		return value
