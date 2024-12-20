# tests/test_views.py
import pytest
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile

from authentication.models import Member
from articles.models import Articles, Category
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


@pytest.mark.skip(
			reason="The test skipped cause the system for uploading "
			"img has not been fully developed")
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
		_ = Member.objects.create(user=admin_user, is_admin=True)
		img = SimpleUploadedFile(
				"test_image.webp",
				b"file_content",
				content_type="image/webp")
		api_client.force_authenticate(user=admin_user)
		Articles.objects.create(
			title="Old Title",
			description="A test article",
			category=sample_category,
			author=admin_user,
			time_create=timezone.now(),
			img=img,
			slug="old-title",
			is_published=True)
		url = reverse("articles:articles-list")
		response = api_client.get(url)
		assert response.status_code == status.HTTP_200_OK
		assert len(response.data) > 0

	def test_create_article(self, api_client, admin_user, sample_category):
		_ = Member.objects.create(user=admin_user, is_admin=True)
		img = SimpleUploadedFile(
				"test_image.webp",
				b"file_content",
				content_type="image/webp")
		api_client.force_authenticate(user=admin_user)
		article = Articles.objects.create(
			title="Old Title",
			description="A test article",
			category=sample_category,
			author=admin_user,
			time_create=timezone.now(),
			img=img,
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
			"time_create": timezone.now(),
			"img": img,
			"is_published": True
		}

		response = api_client.post(url, data, format="multipart")
		print(response.data)

		assert response.status_code == status.HTTP_201_CREATED
		assert Articles.objects.filter(title="New Article").exists()

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
