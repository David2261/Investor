from rest_framework import serializers
from django.contrib.auth.models import Group

from authentication.models import User
from .models import Category, Articles


class ArticlesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Articles
		fields = '__all__'


class ArticleDetailSerializer(serializers.ModelSerializer):
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
	articles = ArticlesSerializer(many=True, required=False)
	class Meta:
		model = Category
		fields = '__all__'
