import pytest
from rest_framework.test import APIClient

client = APIClient()


@pytest.mark.django_db
def test_register_user():
	f_user = dict(
				username="Michael",
				email="michael@gmail.com",
				is_staff=False,
				is_active=True)

	response = client.post("api/auth/registration", f_user)
	data = response.data
	assert data["username"] == f_user["username"]
