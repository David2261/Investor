import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.views import CurrentUserView


User = get_user_model()


@pytest.mark.django_db
class TestRegistrationAPIView:
	def test_post(self):
		client = APIClient()
		data = {'email': 'test@example.com', 'username': 'testuser', 'password': 'password123'}
		response = client.post(reverse('authentication:user_registration'), data, format='json')
		assert response.status_code == status.HTTP_201_CREATED
		assert response.data['email'] == 'test@example.com'
		assert User.objects.filter(email='test@example.com').exists()

	def test_post_invalid_data(self):
		client = APIClient()
		data = {'email': 'invalid_email', 'username': 'testuser', 'password': 'password123'}
		response = client.post(reverse('authentication:user_registration'), data, format='json')
		assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestCustomTokenRefreshView:
	def test_post(self):
		client = APIClient()
		user = User.objects.create_user(email='test@example.com', username='testuser', password='password123')
		refresh_token = RefreshToken.for_user(user)
		data = {'refresh': str(refresh_token)}
		response = client.post(reverse('authentication:token_refresh'), data, format='json')
		assert response.status_code == status.HTTP_200_OK
		assert 'access' in response.data

	def test_post_invalid_token(self):
		client = APIClient()
		data = {'refresh': 'invalid_token'}
		response = client.post(reverse('authentication:token_refresh'), data, format='json')
		assert response.status_code == status.HTTP_401_UNAUTHORIZED


class CurrentUserViewTestCase:
	@pytest.fixture
	def user(self):
		return {'email': 'test@example.com', 'username': 'testuser', 'password': 'password123'}

	@pytest.fixture
	def view(self):
		return CurrentUserView()

	def test_get(self, view, user, rf):
		request = rf.get(reverse('current-user'))
		request.user = user
		response = view(request)
		assert response.status_code == 200
		assert response.data['email'] == user['email']

	def test_get_unauthenticated(self, view, rf):
		request = rf.get(reverse('current-user'))
		request.user = None
		response = view(request)
		assert response.status_code == 401

# @pytest.mark.django_db
# class TestGoogleLoginView:
# 	def test_post(self):
# 		client = APIClient()
# 		data = {'access_token': 'valid_access_token'}
# 		response = client.post(reverse('google_login'), data)
# 		assert response.status_code == status.HTTP_200_OK
# 		assert SocialAccount.objects.filter(provider='google').exists()

# 	def test_post_invalid_token(self):
# 		client = APIClient()
# 		data = {'access_token': 'invalid_access_token'}
# 		response = client.post(reverse('google_login'), data)
# 		assert response.status_code == status.HTTP_401_UNAUTHORIZED
