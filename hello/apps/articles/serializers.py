import math
from rest_framework import serializers

from authentication.models import User
from .models import Category, Articles


class CategorySerializerNS(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ['name', 'slug']


class ArticlesSerializerHome(serializers.ModelSerializer):
	category = CategorySerializerNS(read_only=True)

	class Meta:
		model = Articles
		fields = ['title', 'category', 'img', 'slug']


class ArticlesSerializer(serializers.ModelSerializer):
	category = CategorySerializerNS(read_only=True)
	time_create = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
	summary = serializers.CharField(read_only=True)
	reading_time_minutes = serializers.SerializerMethodField()

	class Meta:
		model = Articles
		fields = ['title', 'description', 'summary', 'reading_time_minutes', 'category', 'img', 'time_create', 'slug']
	
	def get_reading_time_minutes(self, obj):
		""" Функция для расчета время прочтения статьи,
		при учете 1500 символов в минуту """
		num_chars = len(obj.description)
		reading_time_minutes = num_chars / 1500
		return math.ceil(reading_time_minutes)

	def create(self, validated_data):
		return Articles.objects.create(**validated_data)
	
	def update(self, instance, validated_data):
		instance.title = validated_data.get("title", instance.title)
		instance.description = validated_data.get("description", instance.description)
		instance.category = validated_data.get("category", instance.category)
		instance.img = validated_data.get("img", instance.img)

		instance.save()
		return instance
	
	def validate(self, data):
		if not data.get('title'):
			raise serializers.ValidationError({'title': 'Title is required.'})
		if not data.get('description'):
			raise serializers.ValidationError({'description': 'Description is required.'})
		if not data.get('category'):
			raise serializers.ValidationError({'category': 'Category is required.'})

		return data


class ArticleDetailSerializer(serializers.ModelSerializer):
	category = CategorySerializerNS(read_only=True)
	time_create = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
	reading_time_minutes = serializers.SerializerMethodField()

	class Meta:
		model = Articles
		fields = (
			"title",
			"description",
			"category",
			"img",
			'reading_time_minutes',
			"time_create",
			"slug")

	def get_reading_time_minutes(self, obj):
		""" Функция для расчета время прочтения статьи,
		при учете 1500 символов в минуту """
		num_chars = len(obj.description)
		reading_time_minutes = num_chars / 1500
		return math.ceil(reading_time_minutes)


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
	posts = ArticlesSerializer(many=True)
	class Meta:
		model = Category
		fields = (
			"id",
			"name",
			"slug",
			"posts",
		)
