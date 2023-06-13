import json
import pytest

from django.urls import reverse

from rest_framework.test import APITestCase
# from rest_framework.authtoken.models import Token

from authentication.models import User


@pytest.mark.auth
class UserRegistrationAPIViewTestCase(APITestCase):
	url = reverse("authentication:user_registration")

	def test_invalid_password(self):
		"""
		Test to verify that a post call with invalid passwords
		"""
		user_data = {
			"username": "testuser",
			"email": "testemail1111@gmail.com",
			"password": "password"
		}
		response = self.client.post(self.url, user_data, format="json")
		assert 201 == response.status_code

	def test_registration_user(self):
		"""
		Test to verify that a post call with valid passwords
		"""
		user_data = {
			"username": "testuser",
			"email": "testemail1111@gmail.com",
			"password": "password"
		}
		response = self.client.post(self.url, user_data)
		assert 201 == response.status_code
		assert "token" in json.loads(response.content)

	def test_unique_user_validation(self):
		"""
		Test to verify that a post call with already exists username
		"""
		user_data_1 = {
			"username": "testuser",
			"email": "test@testuser.com",
			"password": "password"
		}
		response = self.client.post(self.url, user_data_1)
		assert 201 == response.status_code

		user_data_2 = {
			"username": "testuser",
			"email": "test2@testuser.com",
			"password": "password"
		}
		response = self.client.post(self.url, user_data_2)
		assert 400 == response.status_code


class UserLoginAPIViewTestCase(APITestCase):
	url = reverse("authentication:user_login")

	def setUp(self):
		self.username = "john"
		self.email = "john@gmail.com"
		self.password = "john12345"
		self.user = User.objects.create_user(
			self.username,
			self.email,
			self.password)

	def test_authentication_without_password(self):
		response = self.client.post(self.url, {"username": "john"})
		assert 400 == response.status_code

	def test_authentication_with_wrong_password(self):
		response = self.client.post(self.url, {
			"username": self.username,
			"password": "Aloha"})
		assert 400 == response.status_code

	def test_authentication_with_valid_data(self):
		response = self.client.post(self.url, {
			"username": self.username,
			"email": self.email,
			"password": self.password})
		assert 200 == response.status_code
		assert "token" in json.loads(response.content)
