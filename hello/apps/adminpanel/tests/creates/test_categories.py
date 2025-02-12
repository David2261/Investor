import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from articles.models import Category
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
class TestAppAdminCategoryCreate:
	def test_create_category_as_admin(self, api_client, admin_user):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:categories-create')
		data = {
			"name": "New Category",
			"author": admin_user.id
		}

		response = api_client.post(url, data)

		assert response.status_code == status.HTTP_201_CREATED
		assert Category.objects.filter(name="New Category").exists()

	def test_create_category_as_regular_user(self, api_client, regular_user):
		api_client.force_authenticate(user=regular_user)
		url = reverse('adminpanel:categories-create')
		data = {
			"name": "New Category"
		}

		response = api_client.post(url, data)

		assert response.status_code == status.HTTP_403_FORBIDDEN

	def test_create_category_without_authentication(self, api_client):
		url = reverse('adminpanel:categories-create')
		data = {
			"name": "New Category"
		}

		response = api_client.post(url, data)

		assert response.status_code == status.HTTP_401_UNAUTHORIZED

	def test_create_category_with_invalid_data(self, api_client, admin_user):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:categories-create')
		data = {
			"name": ""
		}

		response = api_client.post(url, data)

		assert response.status_code == status.HTTP_400_BAD_REQUEST
		assert "name" in response.data


@pytest.mark.django_db
class TestAppAdminCategoryEdit:
	def test_update_category_as_admin(self, api_client, admin_user, category):
		api_client.force_authenticate(user=admin_user)
		url = reverse(
			'adminpanel:categories-edit',
			kwargs={'cat_slug': category.slug})

		data = {
			"name": "Updated Category",
			"slug": "updated-category"
		}

		response = api_client.put(url, data)

		assert response.status_code == status.HTTP_200_OK
		assert response.data['detail'] == "Category updated successfully."
		category.refresh_from_db()
		assert category.name == "Updated Category"
		assert category.slug == "updated-category"

	def test_delete_category_as_admin(self, api_client, admin_user, category):
		api_client.force_authenticate(user=admin_user)
		url = reverse(
			'adminpanel:categories-edit',
			kwargs={'cat_slug': category.slug})

		response = api_client.delete(url)

		assert response.status_code == status.HTTP_204_NO_CONTENT
		assert not Category.objects.filter(pk=category.pk).exists()

	def test_update_category_as_regular_user(self, api_client, category):
		regular_user = User.objects.create_user(
			username="user",
			password="password",
			email="user@example.com"
		)
		api_client.force_authenticate(user=regular_user)
		url = reverse(
			'adminpanel:categories-edit',
			kwargs={'cat_slug': category.slug})

		data = {
			"name": "Attempted Update",
			"slug": "attempted-update"
		}

		response = api_client.put(url, data)

		assert response.status_code == status.HTTP_403_FORBIDDEN

	def test_delete_category_as_regular_user(self, api_client, category):
		regular_user = User.objects.create_user(
			username="user",
			password="password",
			email="user@example.com"
		)
		api_client.force_authenticate(user=regular_user)
		url = reverse(
			'adminpanel:categories-edit',
			kwargs={'cat_slug': category.slug})

		response = api_client.delete(url)

		assert response.status_code == status.HTTP_403_FORBIDDEN
