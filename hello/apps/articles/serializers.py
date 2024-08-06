from rest_framework import serializers

from authentication.models import User
from .models import Category, Articles


class CategorySerializerNS(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ['name', 'slug']


class ArticlesSerializer(serializers.ModelSerializer):
	category = CategorySerializerNS(read_only=True)
	class Meta:
		model = Articles
		fields = ['title', 'description', 'category', 'img', 'time_create', 'slug']
	
	def create(self, validated_data):
		return Articles.objects.create(**validated_data)
	
	def update(self, instance, validated_data):
		instance.title = validated_data.get("title", instance.title)
		instance.description = validated_data.get("description", instance.description)
		instance.category = validated_data.get("category", instance.category)
		instance.img = validated_data.get("img", instance.img)

		instance.save()
		return instance

class ArticleDetailSerializer(serializers.ModelSerializer):
	category = CategorySerializerNS(read_only=True)
	class Meta:
		model = Articles
		fields = (
			"title",
			"description",
			"category",
			"img",
			"time_create",
			"slug")


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
