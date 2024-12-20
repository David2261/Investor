import pytest
import json
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from articles.models import Articles
from bonds.models import Bonds
from pathlib import Path


@pytest.mark.django_db
class TestAdminUploads:
	@pytest.fixture(autouse=True)
	def setup(self, django_user_model):
		# Настройка: создаем пользователя-администратора и нужные URL
		self.admin_user = django_user_model.objects.create_superuser(
			username="admin",
			email="admin@example.com",
			password="password")
		self.articles_csv_url = reverse('adminpanel:articles-upload-csv')
		self.articles_json_url = reverse('adminpanel:articles-upload-json')
		self.bonds_csv_url = reverse('adminpanel:bonds-upload-csv')
		self.bonds_json_url = reverse('adminpanel:bonds-upload-json')

	def test_upload_valid_bonds_json(self, client):
		client.login(email='admin@example.com', password="password")

		current_dir = Path(__file__).parent
		json_file_path = current_dir / "test_bonds.json"

		with open(json_file_path, "rb") as json_file:
			uploaded_file = SimpleUploadedFile(
				json_file_path.name,
				json_file.read(),
				content_type="application/json")

			response = client.post(
				self.bonds_json_url,
				{'json_file': uploaded_file})

		assert response.status_code == status.HTTP_201_CREATED

		with open(json_file_path, "r", encoding="utf-8") as json_file:
			bonds_data = json.load(json_file)
			for bond in bonds_data:
				assert Bonds.objects.filter(
					title=bond["title"],
					price=bond["price"],
					cupon=bond["cupon"],
					cupon_percent=bond["cupon_percent"]).exists()

	def test_upload_invalid_articles_csv(self, client):
		client.login(email='admin@example.com', password="password")

		# Загружаем невалидный CSV файл
		current_dir = Path(__file__).parent
		csv_file_path = current_dir / "test_invalid_articles.csv"

		assert csv_file_path.exists(), f"Test file \
			{csv_file_path} does not exist."

		with open(csv_file_path, "rb") as csv_file:
			uploaded_file = SimpleUploadedFile(
				csv_file_path.name,
				csv_file.read(),
				content_type="text/csv")

			response = client.post(self.articles_csv_url, {'csv_file': uploaded_file})

		# Ожидаем ошибку
		assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR

	@pytest.mark.parametrize("url, file_path, model", [
		("adminpanel:articles-upload-json", "test_articles.json", Articles)])
	def test_upload_valid_articles_json(self, client, url, file_path, model):
		client.login(email='admin@example.com', password='password')

		# Загружаем валидный JSON файл
		current_dir = Path(__file__).parent
		json_file_path = current_dir / file_path

		with open(json_file_path, "rb") as json_file:
			uploaded_file = SimpleUploadedFile(
				json_file_path.name,
				json_file.read(),
				content_type="application/json")

			response = client.post(
				reverse(url),
				{'json_file': uploaded_file})

		assert response.status_code == status.HTTP_201_CREATED

		with open(json_file_path, "r", encoding="utf-8") as json_file:
			articles_data = json.load(json_file)

			for article in articles_data:
				assert "title" in article, "Missing 'title' in JSON data"
				assert Articles.objects.filter(
					title=article["title"]).exists()

	@pytest.mark.parametrize("url, file_path", [
		("adminpanel:articles-upload-json", "test_invalid_articles.json")])
	def test_upload_invalid_articles_json(self, client, url, file_path):
		client.login(email='admin@example.com', password="password")

		# Загружаем невалидный JSON файл
		current_dir = Path(__file__).parent
		json_file_path = current_dir / file_path

		assert json_file_path.exists(), f"Test file \
			{json_file_path} does not exist."

		with open(json_file_path, "rb") as json_file:
			uploaded_file = SimpleUploadedFile(
				json_file_path.name,
				json_file.read(),
				content_type="application/json")

			response = client.post(
				reverse(url),
				{'json_file': uploaded_file})

		# Ожидаем ошибку
		assert response.status_code == status.HTTP_400_BAD_REQUEST

	def test_upload_valid_bonds_csv(self, client):
		client.login(email='admin@example.com', password="password")

		# Загружаем валидный CSV файл для облигаций
		current_dir = Path(__file__).parent
		csv_file_path = current_dir / "test_bonds.csv"

		assert csv_file_path.exists(), f"Test file \
			{csv_file_path} does not exist."

		with open(csv_file_path, "rb") as csv_file:
			uploaded_file = SimpleUploadedFile(
				csv_file_path.name,
				csv_file.read(),
				content_type="text/csv")

			response = client.post(
				self.bonds_csv_url,
				{'csv_file': uploaded_file})

		assert response.status_code == status.HTTP_201_CREATED
		assert Bonds.objects.filter(title="ГарИнв2P07").exists()

	def test_upload_invalid_bonds_csv(self, client):
		client.login(email='admin@example.com', password="password")

		# Загружаем невалидный CSV файл для облигаций
		current_dir = Path(__file__).parent
		csv_file_path = current_dir / "test_invalid_bonds.csv"

		with open(csv_file_path, "rb") as csv_file:
			uploaded_file = SimpleUploadedFile(
				csv_file_path.name,
				csv_file.read(),
				content_type="text/csv")

			response = client.post(
				self.bonds_csv_url,
				{'csv_file': uploaded_file})

		assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR

	@pytest.mark.parametrize("url, file_path", [
		("adminpanel:bonds-upload-json", "test_invalid_bonds.json")])
	def test_upload_invalid_bonds_json(self, client, url, file_path):
		client.login(email='admin@example.com', password="password")

		# Загружаем невалидный JSON файл
		current_dir = Path(__file__).parent
		json_file_path = current_dir / file_path

		assert json_file_path.exists(), f"Test file \
			{json_file_path} does not exist."

		with open(json_file_path, "rb") as json_file:
			uploaded_file = SimpleUploadedFile(
				json_file_path.name,
				json_file.read(),
				content_type="application/json")

			response = client.post(reverse(url), {'json_file': uploaded_file})

		# Ожидаем ошибку
		assert response.status_code == status.HTTP_400_BAD_REQUEST
