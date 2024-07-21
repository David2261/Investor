from rest_framework import serializers

from .models import Bonds
from .models import Category


class CategoryBondsSerializer(serializers.ModelSerializer):
	url = serializers.SerializerMethodField()

	def get_url(self, obj):
		return obj.get_absolute_url()

	class Meta:
		model = Category
		fields = ['id', 'name', 'slug', 'url']


class BondsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Bonds
		fields = '__all__'


class BondDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = Bonds
		fields = (
			"title",
			"description",
			"category",
			"price",
			"maturity",
			"cupon",
			"cupon_percent",
			"time_create",
			"slug")
