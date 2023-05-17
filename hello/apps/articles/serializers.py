from rest_framework import serializers
from django.contrib.auth.models import User, Group

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
