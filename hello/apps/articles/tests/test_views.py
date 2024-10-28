# tests/test_views.py
import pytest
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient
from ..models import Articles, Category
from authentication.models import User


@pytest.mark.django_db
class TestArticlesViews:
	@pytest.fixture
	def api_client(self):
		return APIClient()

	@pytest.fixture
	def sample_category(self, db):
		return Category.objects.create(name="Test Category")

	@pytest.fixture
	def admin_user(self, db):
		return User.objects.create_superuser(
			username="admin", password="password", email="admin@example.com"
		)

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
		assert response.status_code == status.HTTP_200_OK
		assert "results" in response.data, "'results' key not found in response."
		assert isinstance(response.data[
				"results"], list), "'results' is not a list."
		assert len(response.data[
				"results"]) > 0, "No articles returned in the 'results'."
		assert response.data["results"][0]["title"] == sample_article.title

	def test_article_detail(self, api_client, sample_article):
		url = reverse("articles:article-detail", args=[
				sample_article.category.slug,
				sample_article.slug])
		response = api_client.get(url)
		assert response.status_code == status.HTTP_200_OK
		assert response.data["title"] == sample_article.title

	def test_generate_csv(self, api_client):
		url = reverse("articles:db-list")
		response = api_client.get(url)
		assert response.status_code == status.HTTP_200_OK
		assert response["Content-Type"] == "text/csv"

	@pytest.mark.skip(
			reason="The test skipped cause the system for uploading "
			"data from csv has not been fully developed")
	def test_upload_csv(self, api_client, admin_user):
		api_client.force_authenticate(user=admin_user)
		url = reverse("articles:upload_csv")
		with open("articles/test/utils/sample_articles.csv", "rb") as csv_file:
			response = api_client.post(url, {"csv_file": csv_file})
		assert response.status_code == status.HTTP_200_OK
		assert Articles.objects.count() > 0


@pytest.mark.django_db
class TestArticleAPICreator:
	@pytest.fixture
	def api_client(self):
		return APIClient()

	@pytest.fixture
	def admin_user(self, db):
		return User.objects.create_superuser(
			username="admin", password="password", email="admin@example.com"
		)

	@pytest.fixture
	def sample_category(self, db):
		return Category.objects.create(name="Test Category", slug="test-category")

	def test_list_articles(self, api_client, admin_user, sample_category):
		Articles.objects.create(
			title="Sample Article",
			description="A test article",
			category=sample_category,
			author=admin_user,
			is_published=True
		)
		url = reverse("articles:articles-list")
		response = api_client.get(url)
		assert response.status_code == status.HTTP_200_OK
		assert len(response.data) > 0

	@pytest.mark.skip(reason="The test skipped cause no time to check")
	def test_create_article(self, api_client, admin_user, sample_category):
		api_client.force_authenticate(user=admin_user)
		article = Articles.objects.create(
			title="Old Title",
			description="A test article",
			category=sample_category,
			author=admin_user,
			slug="old-title",
			is_published=True
		)
		url = reverse("articles:article-creator", kwargs={
				"cat_slug": sample_category.slug,
				"post_slug": article.slug})
		data = {
			"title": "New Article",
			"description": "A new test article",
			"category": sample_category.id,
			"img": None,
			"is_published": True
		}

		response = api_client.post(url, data, format="json")

		assert response.status_code == status.HTTP_201_CREATED
		assert Articles.objects.filter(title="New Article").exists()

	@pytest.mark.skip(reason="The test skipped cause no time to check")
	def test_update_article(self, api_client, admin_user, sample_category):
		api_client.force_authenticate(user=admin_user)
		article = Articles.objects.create(
			title="Old Title",
			description="A test article",
			category=sample_category,
			author=admin_user,
			slug="old-title",
			is_published=True
		)
		url = reverse("articles:article-detail", args=[
				article.category.slug,
				article.slug])
		data = {"title": "Updated Title"}

		response = api_client.put(url, data, format="json")
		assert response.status_code == status.HTTP_200_OK
		article.refresh_from_db()
		assert article.title == "Updated Title"

	@pytest.mark.skip(reason="The test skipped cause no time to check")
	def test_delete_article(self, api_client, admin_user, sample_category):
		api_client.force_authenticate(user=admin_user)
		article = Articles.objects.create(
			title="To Be Deleted",
			description="A test article",
			category=sample_category,
			author=admin_user,
			is_published=True
		)
		url = reverse("articles:article-detail", args=[
				article.category.slug,
				article.slug])
		response = api_client.delete(url)
		assert response.status_code == status.HTTP_204_NO_CONTENT
		assert not Articles.objects.filter(id=article.id).exists()
