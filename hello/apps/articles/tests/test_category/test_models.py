import pytest
from django.test import TestCase
from articles.models import Category


class TestCategory(TestCase):
    def test_create_category(self):
        category = Category.objects.create(name="Bank", slug="bank")
        assert category.slug == "bank"

    def test_fail_create_category(self):
        category = Category.objects.create(name="Bank", slug="bank")
        with pytest.raises(AssertionError):
            assert category.slug == "finance"

    def test_fail_equal_category(self):
        category_1 = Category.objects.create(name="Bank", slug="bank")
        category_2 = Category.objects.create(name="Finance", slug="finance")
        with pytest.raises(AssertionError):
            assert category_1 == category_2
