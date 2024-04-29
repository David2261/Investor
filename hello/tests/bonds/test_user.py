import json
import requests
import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

client = APIClient()

@pytest.mark.django_db
def test_registration():
    # Create a new user
    User = get_user_model()
    user = User.objects.create_user(
        username='testuser',
        email='testuser@example.com',
        password='testpassword',
    )

    # Send an HTTP POST request to the registration endpoint
    data = {
        'username': 'newuser',
        'email': 'newuser@example.com',
        'password': 'newpassword',
        'password2': 'newpassword',
    }
    response = client.post(reverse('authentication:user_registration'), data=data)

    # Check the response status code
    assert response.status_code == status.HTTP_201_CREATED

    # Check the response data
    response_data = json.loads(response.content)
    assert response_data['token'] is not None

    # Check that a new user was created
    new_user = User.objects.get(username='newuser')
    assert new_user.email == 'newuser@example.com'


def test_login_user():
	User = get_user_model()
	f_user = dict(
				username="Michael",
				email="michael@gmail.com",
				is_staff=False,
				is_active=True)
	
	client.post("api/v1/token/", f_user)