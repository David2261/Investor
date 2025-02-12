import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from articles.models import Articles
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
	category = Category.objects.create(name="Test")
	return category


@pytest.fixture
def article(db, admin_user, category):
	return Articles.objects.create(
		title="Sample Article",
		description="This is an article.",
		author=admin_user,
		category=category
	)


@pytest.mark.django_db
class TestAppAdminArticleCreate:
	def test_create_article_as_admin(self, api_client, admin_user, category):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:articles-create')

		data = {
			"title": "New Article",
			"description": "This is an article.",
			"author": admin_user.id,
			"category": category.id,
		}

		response = api_client.post(url, data)

		print(response.data)

		assert response.status_code == status.HTTP_201_CREATED
		assert Articles.objects.filter(title="New Article").exists()

	def test_create_article_as_regular_user(self, api_client, regular_user):
		api_client.force_authenticate(user=regular_user)
		url = reverse('adminpanel:articles-create')

		data = {
			"title": "New Article",
			"description": "This is a new article."
		}

		response = api_client.post(url, data)

		assert response.status_code == status.HTTP_403_FORBIDDEN

	def test_create_article_without_authentication(self, api_client):
		url = reverse('adminpanel:articles-create')

		data = {
			"title": "New Article",
			"description": "This is a new article."
		}

		response = api_client.post(url, data)

		assert response.status_code == status.HTTP_401_UNAUTHORIZED

	def test_create_article_with_invalid_data(self, api_client, admin_user):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:articles-create')

		data = {
			"title": "",
			"description": "This is a new"
		}

		response = api_client.post(url, data)

		assert response.status_code == status.HTTP_400_BAD_REQUEST
		assert "title" in response.data


@pytest.mark.django_db
class TestAppAdminArticleEdit:
	def test_update_article_as_admin(self, api_client, admin_user, article):
		api_client.force_authenticate(user=admin_user)

		cat_slug = article.category.slug
		post_slug = article.slug

		url = reverse(
			'adminpanel:articles-edit',
			kwargs={'cat_slug': cat_slug, 'post_slug': post_slug})

		data = {
			"title": "Updated Article",
			"description": "This is an updated article.",
			"author": admin_user.id,
			"category": article.category.id,
		}

		response = api_client.put(url, data)

		assert response.status_code == status.HTTP_200_OK
		assert response.data['detail'] == "Article updated successfully."
		article.refresh_from_db()
		assert article.title == "Updated Article"
		assert article.description == "This is an updated article."

	def test_delete_article_as_admin(self, api_client, admin_user, article):
		api_client.force_authenticate(user=admin_user)

		cat_slug = article.category.slug
		post_slug = article.slug

		url = reverse(
			'adminpanel:articles-edit',
			kwargs={'cat_slug': cat_slug, 'post_slug': post_slug})

		response = api_client.delete(url)

		assert response.status_code == status.HTTP_204_NO_CONTENT
		assert not Articles.objects.filter(pk=article.pk).exists()

	def test_update_article_as_regular_user(
			self,
			api_client,
			regular_user,
			article):
		api_client.force_authenticate(user=regular_user)

		cat_slug = article.category.slug
		post_slug = article.slug

		url = reverse(
			'adminpanel:articles-edit',
			kwargs={'cat_slug': cat_slug, 'post_slug': post_slug})

		data = {
			"title": "Attempted Update",
			"description": "This update should fail.",
			"author": regular_user.id,
			"category": article.category.id,
		}

		response = api_client.put(url, data)

		assert response.status_code == status.HTTP_403_FORBIDDEN

	def test_delete_article_as_regular_user(
			self,
			api_client,
			regular_user,
			article):
		api_client.force_authenticate(user=regular_user)

		cat_slug = article.category.slug
		post_slug = article.slug

		url = reverse(
			'adminpanel:articles-edit',
			kwargs={'cat_slug': cat_slug, 'post_slug': post_slug})

		response = api_client.delete(url)

		assert response.status_code == status.HTTP_403_FORBIDDEN
