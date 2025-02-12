import json
import pytest
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient
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
		email="admin@example.com")
	user.is_staff = True
	user.is_active = True
	user.save()
	return user


@pytest.fixture
def create_bonds(db, admin_user):
	bond_1 = Bonds.objects.create(
		title="Sample Bond 1",
		description="A test bond 1",
		price=1000,
		maturity=timezone.now() + timezone.timedelta(days=365),
		is_published=True,
		cupon=50,
		cupon_percent=5.0,
		author=admin_user
	)
	bond_2 = Bonds.objects.create(
		title="Sample Bond 2",
		description="A test bond 2",
		price=2000,
		maturity=timezone.now() + timezone.timedelta(days=730),
		is_published=True,
		cupon=100,
		cupon_percent=5.0,
		author=admin_user
	)
	return bond_1, bond_2


class TestAppAdminBonds:
	""" Тестирование AppAdminBondsGenerateCSV """

	@pytest.mark.django_db
	def test_generate_csv(self, admin_user, api_client, create_bonds):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:bonds-generate-csv')
		response = api_client.get(url)

		assert response.status_code == status.HTTP_200_OK
		assert response['Content-Type'] == 'text/csv'
		assert response['Content-Disposition'] == 'attachment; filename="bonds.csv"'
		assert b'Sample Bond 1' in response.content
		assert b'Sample Bond 2' in response.content

	@pytest.mark.django_db
	def test_generate_csv_no_bonds(self, admin_user, api_client):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:bonds-generate-csv')

		Bonds.objects.all().delete()

		response = api_client.get(url)

		assert response.status_code == status.HTTP_200_OK
		assert response['Content-Type'] == 'text/csv'
		assert response['Content-Disposition'] == 'attachment; filename="bonds.csv"'
		assert b'id;title;category;description;price;maturity;is_published;cupon;cupon_percent' in response.content  # noqa: E501
		assert b'Sample Bond 1' not in response.content
		assert b'Sample Bond 2' not in response.content

	@pytest.mark.django_db
	def test_generate_json(self, admin_user, api_client, create_bonds):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:bonds-generate-json')
		response = api_client.get(url)

		assert response.status_code == status.HTTP_200_OK
		assert response['Content-Type'] == 'application/json; charset=utf-8'
		assert response['Content-Disposition'] == \
			'attachment; filename="bonds.json"'

		json_data = response.content.decode('utf-8')
		bonds_list = json.loads(json_data)

		assert len(bonds_list) == 2
		assert bonds_list[0]['title'] == 'Sample Bond 2'
		assert bonds_list[1]['title'] == 'Sample Bond 1'

	@pytest.mark.django_db
	def test_generate_json_no_bonds(self, admin_user, api_client):
		api_client.force_authenticate(user=admin_user)
		url = reverse('adminpanel:bonds-generate-json')

		# Удаляем все облигации для теста
		Bonds.objects.all().delete()

		response = api_client.get(url)

		assert response.status_code == status.HTTP_200_OK
		assert response['Content-Type'] == 'application/json; charset=utf-8'
		assert response['Content-Disposition'] == \
			'attachment; filename="bonds.json"'

		json_data = response.content.decode('utf-8')
		bonds_list = json.loads(json_data)

		assert len(bonds_list) == 0
