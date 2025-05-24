import pytest
import json
import requests
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.files.uploadedfile import SimpleUploadedFile
from pathlib import Path
from authentication.models import User
from articles.models import Category, Articles

# Базовый URL для API
BASE_URL = "http://127.0.0.1:8000"

@pytest.fixture
def client():
	return APIClient()

@pytest.fixture
def admin_user(db):
	return User.objects.create_superuser(
		username="admin",
		email="admin@example.com",
		password="password"
	)

@pytest.fixture
def auth_client(client, admin_user):
	login_url = reverse('authentication:user_login')
	response = client.post(
		login_url,
		data={"email": "admin@example.com", "password": "password"},
		format='json'
	)
	if response.status_code != 200:
		raise Exception(f"Login failed: {response.content}")
	assert 'jwt_access' in client.cookies, "JWT access token cookie not set"
	return client

@pytest.fixture
def category(db):
	return Category.objects.create(name="Test Category")

@pytest.mark.django_db
class TestAdminArticlesUploads:
	@pytest.fixture(autouse=True)
	def setup(self, admin_user, category):
		self.articles_csv_url = reverse('adminpanel:articles-upload-csv')
		self.articles_json_url = reverse('adminpanel:articles-upload-json')

	def test_upload_invalid_articles_csv(self, auth_client):
		invalid_csv_content = "invalid_column,wrong_data\nvalue1,value2"
		csv_file = SimpleUploadedFile(
			name="test_invalid_articles.csv",
			content=invalid_csv_content.encode('utf-8'),
			content_type="text/csv"
		)

		response = auth_client.post(self.articles_csv_url, files={"csv_file": csv_file})

		assert response.status_code == 400, f"Expected 400, got {response.status_code}: {response.content}"
		response_data = response.json()
		assert "error" in response_data, "Expected 'error' key in response"

	def test_upload_valid_articles_csv(self, auth_client, category):
		valid_csv_content = f"title,category_id,content\nTest Article,{category.id},This is a test article"
		csv_file = SimpleUploadedFile(
			name="test_valid_articles.csv",
			content=valid_csv_content.encode('utf-8'),
			content_type="text/csv"
		)

		response = auth_client.post(self.articles_csv_url, files={"csv_file": csv_file})

		assert response.status_code == 201, f"Expected 201, got {response.status_code}: {response.content}"
		assert Articles.objects.filter(title="Test Article").exists(), "Article was not created"

	def test_upload_articles_csv_unauthenticated(self, client):
		invalid_csv_content = "invalid_column,wrong_data\nvalue1,value2"
		csv_file = SimpleUploadedFile(
			name="test_invalid_articles.csv",
			content=invalid_csv_content.encode('utf-8'),
			content_type="text/csv"
		)

		response = client.post(self.articles_csv_url, files={"csv_file": csv_file})

		assert response.status_code == 401, f"Expected 401, got {response.status_code}: {response.content}"

	@pytest.mark.parametrize("url, file_path, model", [
		("adminpanel:articles-upload-json", "test_articles.json", Articles)
	])
	def test_upload_valid_articles_json(self, session, auth_cookies, url, file_path, model):
		"""Тест загрузки валидного JSON-файла."""
		session.cookies = auth_cookies

		# Подготавливаем валидный JSON-файл
		current_dir = Path(__file__).parent
		json_file_path = current_dir / file_path
		assert json_file_path.exists(), f"Test file {json_file_path} does not exist."

		with open(json_file_path, "rb") as json_file:
			uploaded_file = {
				"json_file": (json_file_path.name, json_file, "application/json")
			}
			response = session.post(
				f"{BASE_URL}{reverse(url)}",
				files=uploaded_file
			)

			# Отладочный вывод
			print(response.status_code, response.text)

			# Проверки
			assert response.status_code == 201, f"Expected 201, got {response.status_code}"

			with open(json_file_path, "r", encoding="utf-8") as json_file:
				articles_data = json.load(json_file)
				for article in articles_data:
					assert "title" in article, "Missing 'title' in JSON data"
					assert model.objects.filter(title=article["title"]).exists()

	@pytest.mark.parametrize("url, file_path", [
		("adminpanel:articles-upload-json", "test_invalid_articles.json")
	])
	def test_upload_invalid_articles_json(self, session, auth_cookies, url, file_path):
		"""Тест загрузки невалидного JSON-файла."""
		session.cookies = auth_cookies

		# Подготавливаем невалидный JSON-файл
		current_dir = Path(__file__).parent
		json_file_path = current_dir / file_path
		assert json_file_path.exists(), f"Test file {json_file_path} does not exist."

		with open(json_file_path, "rb") as json_file:
			uploaded_file = {
				"json_file": (json_file_path.name, json_file, "application/json")
			}
			response = session.post(
				f"{BASE_URL}{reverse(url)}",
				files=uploaded_file
			)

			# Отладочный вывод
			print(response.status_code, response.text)

			# Проверки
			assert response.status_code != 401, f"Unauthorized: {response.text}"
			assert response.status_code == 400, f"Expected 400, got {response.status_code}"