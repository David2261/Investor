from rest_framework import serializers
from django.contrib.auth.models import Group

from authentication.models import User
from .models import Ip, Category, Articles


class IpSerializer(serializers.ModelSerializer):
	class Meta:
		model = Ip
		fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = '__all__'


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
