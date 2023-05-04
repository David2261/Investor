import pytest
from django.test import TestCase
from django.test import Client

"""
Нужно придумать способ обработки CBV
посмотреть, что можно тестить в views
"""


class TestViewCategory(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get_category(client):
        response = client("/")
        assert response.status_code == 403

    def test_get_fail_category(client):
        response = client.get("/")
        with pytest.raises(AssertionError):
            assert response == 404
