import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from articles.models import Category
from bonds.models import Bonds
from authentication.models import User


@pytest.fixture
def api_client():
	return APIClient()


@pytest.fixture
def admin_user(db):
	user = User.objects.create_superuser(
		username="admin",
		password="password",
		email="admin@example.com"
	)
	user.is_staff = True
	user.member.is_admin = True
	return user


@pytest.fixture
def regular_user(db):
	user = User.objects.create_user(
		username="user",
		password="password",
		email="user@example.com"
	)
	return user


@pytest.fixture
def category(db):
	return Category.objects.create(name="Test Category", slug="test-category")


@pytest.mark.django_db
class TestAppAdminBondCreate:
	def test_create_bond_as_admin(self, api_client, admin_user, category):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:bonds-create')

		data = {
			"title": "Test Bond",
			"description": "This is a test bond.",
			"category": "municipal bonds",
			"price": 1000.00,
			"maturity": "2025-12-31",
			"cupon": 50.00,
			"cupon_percent": 5.0,
			"slug": "test-bond"
		}

		response = api_client.post(url, data)
		print(response.data)

		assert response.status_code == status.HTTP_201_CREATED
		assert Bonds.objects.filter(title="Test Bond").exists()

	def test_create_bond_as_regular_user(
			self,
			api_client,
			regular_user,
			category):
		api_client.force_authenticate(user=regular_user)
		url = reverse('adminpanel:bonds-create')

		data = {
			"title": "Test Bond",
			"description": "This is a test bond.",
			"category": category.pk,
			"price": 1000.00,
			"maturity": "2025-12-31",
			"cupon": 50.00,
			"cupon_percent": 5.0,
			"slug": "test-bond"
		}

		response = api_client.post(url, data)

		assert response.status_code == status.HTTP_403_FORBIDDEN

	def test_create_bond_with_invalid_data(
			self,
			api_client,
			admin_user,
			category):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:bonds-create')

		data = {
			"title": "TB",  # Заголовок слишком короткий
			"description": "This is a test bond.",
			"category": category.pk,
			"price": -1000.00,  # Неверная цена
			"maturity": "2025-12-31",
			"cupon": 50.00,
			"cupon_percent": 5.0,
			"slug": "test-bond"
		}

		response = api_client.post(url, data)

		assert response.status_code == \
			status.HTTP_400_BAD_REQUEST  # Ожидаем ошибку валидации
		assert "Заголовок должен содержать не менее 5 символов." \
			in response.data['title']
		assert "Цена должна быть положительным числом." in response.data['price']
