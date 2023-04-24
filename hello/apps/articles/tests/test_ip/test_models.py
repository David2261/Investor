from django.test import TestCase
import pytest
from articles.models import Ip


class TestIp(TestCase):
    def test_create_ip(self):
        category = Ip.objects.create(ip="176.52.98.172")
        assert category.ip == "176.52.98.172"

    def test_create_fail_ip(self):
        with pytest.raises(AssertionError):
            category = Ip.objects.create(ip="176.52.98.172")
            assert category.ip == "176.52.98.001"
