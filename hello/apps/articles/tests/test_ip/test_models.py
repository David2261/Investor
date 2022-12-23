from django.test import TestCase
from articles.models import Ip, Category, Articles


class TestIp:
    def setup(self):
        Ip.objects.create(ip="176.52.98.172")

    def test_create_category():
        assert category.ip == "176.52.98.172"
