from rest_framework import serializers

from .models import Bonds


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
