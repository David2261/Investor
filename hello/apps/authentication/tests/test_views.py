import json
import pytest
from django.urls import reverse
from django.core import mail
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


@pytest.mark.django_db
class TestAuthenticationViews:

	def setup_method(self):
		self.client = APIClient()

	def test_user_registration(self):
		"""Test user registration."""
		url = reverse('authentication:user_registration')
		data = {
			'username': 'testuser',
			'email': 'test@example.com',
			'password': 'testpassword123',
			'password2': 'testpassword123'
		}
		response = self.client.post(
				url,
				data=json.dumps(data),
				content_type='application/json')
		assert response.status_code == status.HTTP_201_CREATED
		assert User.objects.filter(email='test@example.com').exists()

	def test_password_reset_request(self):
		"""Test password reset request."""
		_ = User.objects.create_user(
				username='testuser',
				email='test@example.com',
				password='testpassword123')
		url = reverse('authentication:password_reset_request')
		data = {'email': 'test@example.com'}

		response = self.client.post(
				url,
				data=json.dumps(data),
				content_type='application/json')
		assert response.status_code == status.HTTP_200_OK
		assert len(mail.outbox) == 1
		assert "Password Reset" in mail.outbox[0].subject

	@pytest.mark.skip(
			reason="This test is currently skipped cause sending "
			"confirmation to the mail has not been fully implemented.")
	def test_password_change(self):
		"""Test password change using token."""
		user = User.objects.create_user(
				username='testuser',
				email='test@example.com',
				password='testpassword123')
		token = default_token_generator.make_token(user)
		uid = urlsafe_base64_encode(force_bytes(user.pk))

		url = reverse('authentication:password_reset', args=[uid, token])
		data = {
			'new_password': 'newpassword123',
			'confirm_password': 'newpassword123'}

		response = self.client.post(
				url,
				data=json.dumps(data),
				content_type='application/json')
		assert response.status_code == status.HTTP_200_OK
		user.refresh_from_db()
		assert user.check_password('newpassword123')

	def test_token_refresh(self):
		"""Test token refresh."""
		user = User.objects.create_user(
				username='testuser',
				email='test@example.com',
				password='testpassword123')
		refresh = RefreshToken.for_user(user)

		url = reverse('authentication:token_refresh')
		response = self.client.post(
				url,
				data=json.dumps({'refresh': str(refresh)}),
				content_type='application/json')
		assert response.status_code == status.HTTP_200_OK
		assert 'access' in response.data

	def test_user_login(self):
		"""Test user login."""
		_ = User.objects.create_user(
				username='testuser',
				email='test@example.com',
				password='testpassword123')
		url = reverse('authentication:user_login')
		data = {
			'username': 'testuser',
			'email': 'test@example.com',
			'password': 'testpassword123'
		}
		response = self.client.post(
				url,
				data=json.dumps(data),
				content_type='application/json')
		assert response.status_code == status.HTTP_200_OK

	def test_current_user_data(self):
		"""Test getting current user data."""
		_ = User.objects.create_user(
				username='testuser',
				email='test@example.com',
				password='testpassword123')
		url = reverse('authentication:token_obtain_pair')
		data = {
			'username': 'testuser',
			'email': 'test@example.com',
			'password': 'testpassword123'
		}
		response = self.client.post(
				url,
				data=json.dumps(data),
				content_type='application/json')
		assert response.status_code == status.HTTP_200_OK, f"Token " \
									f"retrieval failed: {response.data}"
		access_token = response.data['access']
		self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
		url = reverse('authentication:current-user')
		response = self.client.get(url)

		assert response.status_code == status.HTTP_200_OK
		assert response.data['email'] == 'test@example.com'

	def test_google_login_view(self):
		"""Test Google login."""
		url = reverse('authentication:google_login')
		response = self.client.get(url)
		assert response.status_code == status.HTTP_200_OK

	def test_yandex_login_view(self):
		"""Test Yandex login."""
		url = reverse('authentication:yandex_login')
		response = self.client.get(url)
		assert response.status_code == status.HTTP_200_OK

	def test_microsoft_login_view(self):
		"""Test Microsoft login."""
		url = reverse('authentication:microsoft_login')
		response = self.client.get(url)
		assert response.status_code == status.HTTP_200_OK
