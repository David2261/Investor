import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


@pytest.fixture
def api_client():
	return APIClient()


@pytest.fixture
def create_user():
	def _create_user(**kwargs):
		return User.objects.create_user(**kwargs)
	return _create_user


@pytest.mark.django_db
class TestAuthenticationViews:

	@pytest.fixture(autouse=True)
	def setup(self, api_client, create_user):
		self.client = api_client
		self.create_user = create_user

	# Тесты для RegistrationAPIView
	def test_registration_view(self):
		url = reverse('authentication:user_registration')
		data = {
			'username': 'testuser',
			'password': 'strongpassword',
			'email': 'testuser@example.com',
			'password2': 'strongpassword'
		}
		response = self.client.post(url, data, format='json')
		assert response.status_code == status.HTTP_201_CREATED
		assert User.objects.filter(username='testuser').exists()
		assert response.data['username'] == 'testuser'
		assert response.data['email'] == 'testuser@example.com'

	# Тесты для UserLoginView
	def test_user_login_view(self):
		_ = self.create_user(
			username='testuser',
			password='strongpassword',
			email='testuser@example.com')
		url = reverse('authentication:user_login')
		data = {
			'email': 'testuser@example.com',
			'password': 'strongpassword'
		}
		response = self.client.post(url, data, format='json')
		assert response.status_code == status.HTTP_200_OK
		assert 'access' in response.data
		assert 'refresh' in response.data
		assert response.data['access'] is not None
		assert response.data['refresh'] is not None

	# Тесты для CustomTokenRefreshView
	def test_token_refresh_view(self):
		user = self.create_user(
			username='testuser',
			password='strongpassword',
			email='testuser@example.com')
		url = reverse('authentication:token_refresh')
		refresh_token = str(RefreshToken.for_user(user))
		data = {
			'refresh': refresh_token
		}
		response = self.client.post(url, data, format='json')
		assert response.status_code == status.HTTP_200_OK
		assert 'access' in response.data

	# Тесты для CurrentUserView
	def test_current_user_view(self):
		user = self.create_user(
			username='testuser',
			password='strongpassword',
			email='testuser@example.com')
		self.client.force_authenticate(user=user)
		url = reverse('authentication:current-user')
		response = self.client.get(url)
		assert response.status_code == status.HTTP_200_OK
		assert response.data['username'] == user.username
		assert response.data['email'] == user.email

	# Тесты для UserDetailView
	def test_user_detail_view(self):
		user = self.create_user(
			username='testuser',
			password='strongpassword',
			email='testuser@example.com')
		self.client.force_authenticate(user=user)
		url = reverse('authentication:user-detail', args=[user.id])
		response = self.client.get(url)
		assert response.status_code == status.HTTP_200_OK
		assert response.data['username'] == user.username
		assert response.data['email'] == user.email

	# Тесты для GoogleLoginView
	def test_google_login_view(self):
		url = reverse('authentication:google_login')
		response = self.client.get(url)
		assert response.status_code == status.HTTP_200_OK
		assert response.data['message'] == "GET request successful"

	# Тесты для YandexLoginView
	def test_yandex_login_view(self):
		url = reverse('authentication:yandex_login')
		response = self.client.get(url)
		assert response.status_code == status.HTTP_200_OK
		assert response.data['message'] == "GET request successful"

	# Тесты для MicrosoftLoginView
	def test_microsoft_login_view(self):
		url = reverse('authentication:microsoft_login')
		response = self.client.get(url)
		assert response.status_code == status.HTTP_200_OK
		assert response.data['message'] == "GET request successful"
