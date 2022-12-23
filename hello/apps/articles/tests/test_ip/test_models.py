import pytest
from articles.models import Ip


class TestIp:
    def test_create_ip(self):
        category = Ip.objects.create(ip="176.52.98.172")
        assert category.ip == "176.52.98.172"
    
    def test_create_fail_ip(self):
        with pytest.raises(TypeError):
            category = Ip.objects.create(ip="176.52.98.172")
            assert category.ip == "176.52.98.001"
