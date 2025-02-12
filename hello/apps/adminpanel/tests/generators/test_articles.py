import pytest
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient
from articles.models import Articles
from articles.models import Category
from authentication.models import User


@pytest.fixture
def api_client():
	return APIClient()


@pytest.fixture
def sample_category(db):
	return Category.objects.create(name="Test Category")


@pytest.fixture
def admin_user(db):
	user = User.objects.create_superuser(
		username="admin",
		password="password",
		email="admin@example.com")
	user.is_staff = True
	user.is_active = True
	user.save()
	return user


@pytest.fixture
def create_articles(db, admin_user, sample_category):
	article_1 = Articles.objects.create(
		title="Sample Article 1",
		description="A test article 1",
		time_create=timezone.now(),
		category=sample_category,
		author=admin_user,
		is_published=True,
		popularity=100)
	article_2 = Articles.objects.create(
		title="Sample Article 2",
		description="A test article 2",
		time_create=timezone.now(),
		category=sample_category,
		author=admin_user,
		is_published=True,
		popularity=100)
	return article_1, article_2


class TestAppAdminArticles:
	"""
	Тестирование AppAdminArticlesGenerateCSV и AppAdminArticlesGenerateJSON
	"""
	@pytest.mark.django_db
	def test_generate_csv(self, admin_user, api_client, create_articles):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:articles-generate-csv')
		response = api_client.get(url)

		assert response.status_code == status.HTTP_200_OK
		assert response['Content-Type'] == 'text/csv'
		assert response[
			'Content-Disposition'] == 'attachment; filename="articles.csv"'
		assert b'Sample Article 1' in response.content
		assert b'Sample Article 2' in response.content

	@pytest.mark.django_db
	def test_generate_json(self, admin_user, api_client, create_articles):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:articles-generate-json')
		response = api_client.get(url)

		assert response.status_code == status.HTTP_200_OK
		assert response['Content-Type'] == 'application/json; charset=utf-8'
		assert response[
			'Content-Disposition'] == 'attachment; filename="articles.json"'

		json_data = response.json()
		assert len(json_data) == 2
		assert json_data[0]['title'] == 'Sample Article 2'
		assert json_data[1]['title'] == 'Sample Article 1'
