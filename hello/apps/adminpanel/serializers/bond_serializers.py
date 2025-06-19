from rest_framework import serializers
from bonds.models import Bonds
from .base_serializers import ValidateTitleSlugMixin
from django.utils import timezone


class AdminBondSerializer(serializers.ModelSerializer):
	class Meta:
		model = Bonds
		fields = [
			'title',
			'description',
			'category',
			'price',
			'maturity',
			'cupon',
			'cupon_percent',
			'time_create',
			'slug']


class AdminBondSerializerCreate(
		serializers.ModelSerializer,
		ValidateTitleSlugMixin):
	class Meta:
		model = Bonds
		fields = [
			'title',
			'description',
			'category',
			'price',
			'maturity',
			'cupon',
			'cupon_percent',
			'time_create',
			'is_published',
			'slug']

	def create(self, validated_data):
		return Bonds.objects.create(**validated_data)

	def validate_price(self, value):
		if value <= 0:
			raise serializers.ValidationError(
				"Цена должна быть положительным числом.")
		return value


class AdminBondSerializerEdit(
		serializers.ModelSerializer,
		ValidateTitleSlugMixin):
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
		for attr, value in validated_data.items():
			setattr(instance, attr, value)
		instance.save()
		return instance

	def validate_price(self, value):
		if value <= 0:
			raise serializers.ValidationError(
				"Цена должна быть положительным числом.")
		return value

	def validate_maturity(self, value):
		if value.date() <= timezone.now().date():
			raise serializers.ValidationError(
				"Дата погашения должна быть в будущем.")
		return value
