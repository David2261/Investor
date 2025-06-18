from rest_framework import serializers
from articles.models import Category
from .base_serializers import ValidateTitleSlugMixin


class AdminCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', "slug"]


class AdminCategorySerializerEdit(
        serializers.ModelSerializer,
        ValidateTitleSlugMixin):
    class Meta:
        model = Category
        fields = ["name", "slug"]


class AdminCategorySerializerCreate(
        serializers.ModelSerializer,
        ValidateTitleSlugMixin):
    class Meta:
        model = Category
        fields = ["name", "slug"]
