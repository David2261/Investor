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

