# tests/test_views.py
import pytest
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APIClient

from articles.models import Articles
from articles.models import Category
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
class TestArticlesAdminViews:
	@pytest.fixture
	def api_client(self):
		return APIClient()

	@pytest.fixture
	def sample_category(self, db):
		return Category.objects.create(name="Test Category")

	@pytest.fixture
	def admin_user(self, db):
		user = User.objects.create_superuser(
			username="admin", password="password", email="admin@example.com")

		user.member.is_admin = True
		user.save()
		return user

	@pytest.fixture
	def sample_article(self, db, sample_category, admin_user):
		return Articles.objects.create(
				title="Sample Article",
				description="A test article",
				time_create=timezone.now(),
				category=sample_category,
				author=admin_user,
				is_published=True,
				popularity=100)

	def test_articles_list_home(self, api_client, sample_article):
		url = reverse("articles:articles-home-list")
		response = api_client.get(url)

		# Check if the response status is OK
		assert response.status_code == status.HTTP_200_OK

		# Check if the response data is a list
		assert isinstance(response.data, list), "'results' is not a list."

		# Check if the list is not empty
		assert len(response.data) > 0, "No articles returned in the 'results'."

		# Check if the sample article is in the response
		assert any(
			article["title"] == sample_article.title
			for article in response.data), "Sample article \
				not found in the response."

	def test_article_detail(self, api_client, sample_article):
		url = reverse("articles:article-detail", args=[
				sample_article.category.slug,
				sample_article.slug])
		response = api_client.get(url)
		assert response.status_code == status.HTTP_200_OK
		assert response.data["title"] == sample_article.title


@pytest.mark.django_db
class TestArticleAPICreator:
	@pytest.fixture
	def api_client(self):
		return APIClient()

	@pytest.fixture
	def admin_user(self, db):
		user = User.objects.create_superuser(
			username="admin", password="password", email="admin@example.com"
		)
		user.is_staff = True
		user.is_active = True
		user.member.is_creator = True
		user.save()
		return user

	@pytest.fixture
	def sample_category(self, db):
		return Category.objects.create(name="Test Category", slug="test-category")

	@pytest.fixture
	def sample_article(self, db, admin_user, sample_category):
		return Articles.objects.create(
			title="Sample Article",
			description="A test article",
			time_create=timezone.now(),
			category=sample_category,
			author=admin_user,
			is_published=True,
			popularity=100)

	def test_get_articles(self, api_client, admin_user, sample_article):
		"""Тест GET метода для получения списка статей"""
		api_client.force_authenticate(user=admin_user)
		url = reverse('articles:article-creator')
		response = api_client.get(url)
		assert response.status_code == 200
		assert response.data[0]["title"] == "Sample Article"
		assert response.data[0]["slug"] == "sample-article"

	def test_post_article_with_category(self, api_client, admin_user):
		"""Тест POST метода для создания статьи
		с автоматическим созданием категории"""
		api_client.force_authenticate(user=admin_user)
		url = reverse('articles:article-creator')
		data = {
			"title": "New Article",
			"description": "New Content",
			"category": "New Category",
			"time_create": timezone.now()
		}
		response = api_client.post(url, data)
		assert response.status_code == 201
		assert 'category' in response.data
		assert response.data['category']['name'] == "New Category"

	def test_post_article_missing_data(self, api_client, admin_user):
		""" Тест POST метода с отсутствующими обязательными полями """
		api_client.force_authenticate(user=admin_user)
		url = reverse('articles:article-creator')
		data = {
			"title": "",
			"description": "New Content",
			"category": "New Category",
			"time_create": timezone.now(),
		}
		response = api_client.post(url, data)
		assert response.status_code == 400
		assert response.data == {'title': [ErrorDetail(
				string='Это поле не может быть пустым.',
				code='blank')],
			'img': [ErrorDetail(
				string='Это поле не может быть пустым.',
				code='null')],
			'time_create': [ErrorDetail(
				string='Обязательное поле.',
				code='required')]}

	def test_put_article(self, api_client, admin_user, sample_article):
		"""Тест PUT метода для обновления статьи"""
		api_client.force_authenticate(user=admin_user)
		url = reverse(
			'articles:article-creator-detail',
			kwargs={"post_slug": sample_article.slug})
		data = {
			"title": "Updated Article",
			"description": "Updated Content",
		}
		response = api_client.put(url, data)
		sample_article.refresh_from_db()
		assert response.status_code == 200
		assert sample_article.title == "Updated Article"
		assert sample_article.description == "Updated Content"

	def test_delete_article(self, api_client, admin_user, sample_article):
		""" Тест DELETE метода для удаления статьи """
		api_client.force_authenticate(user=admin_user)
		assert Articles.objects.filter(slug=sample_article.slug).exists()
		url = reverse(
			'articles:article-creator-detail',
			kwargs={"post_slug": sample_article.slug})
		response = api_client.delete(url)
		print(response.data)
		assert response.status_code == 202
		assert not Articles.objects.filter(slug=sample_article.slug).exists()
