import pytest
from django.test import TestCase
from articles.models import Category


"""
Нужно придумать способ обработки CBV
посмотреть, что можно тестить в views
"""

class TestViewCategory(TestCase):
    def test_get_category(client):
        response = client.get("/")
        assert response.status_code == 200