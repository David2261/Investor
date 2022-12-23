import pytest
from articles.views import get_client_ip

def test_home_client_ip(client):
    response = client.get("/")
    assert response.status_code == 200

def test_admin_client_ip(client):
    response = client.get("admin/")
    assert response.status_code == 302

