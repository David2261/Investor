import json
import requests
import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

client = APIClient()
User = get_user_model()
@pytest.mark.django_db
def test_registration():
	data = {
		'username': 'newuser',
		'email': 'newuser@example.com',
		'password': 'newpassword',
		'password2': 'newpassword',
	}
	response = client.post(reverse('authentication:user_registration'), data=data)
	assert response.status_code == status.HTTP_201_CREATED
	response_data = json.loads(response.content)
	assert response_data['token'] is not None
	new_user = User.objects.get(username='newuser')
	assert new_user.email == 'newuser@example.com'


def test_login_user():
	f_user = dict(
				username="Michael",
				email="michael@gmail.com",
				is_staff=False,
				is_active=True)
	
	client.post("api/v1/token/", f_user)