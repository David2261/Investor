import pytest
from django.test import TestCase

"""
Нужно придумать способ обработки CBV
посмотреть, что можно тестить в views
"""


class TestViewCategory(TestCase):
    def test_get_category(client):
        response = client.get("/")
        assert response.status_code == 200

    def test_get_fail_category(client):
        response = client.get("/")
        with pytest.raises(AssertionError):
            assert response == 404
