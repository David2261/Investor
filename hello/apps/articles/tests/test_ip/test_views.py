import pytest
from django.test import Client


@pytest.mark.skip("UserWarning: No directory at: ~/Investor/static/")
class TestClient:
    def setUp(self):
        self.client = Client()

    def test_home_client_ip(self):
        response = self.client.get("/")
        with pytest.raises(AssertionError):
            assert response.status_code == 200

    def test_admin_client_ip(self):
        response = self.client.get("/admin/")
        with pytest.raises(AssertionError):
            assert response.status_code == 302
