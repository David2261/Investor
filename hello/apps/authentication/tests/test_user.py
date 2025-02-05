import pytest
from django.core.exceptions import ValidationError
from authentication.models import User


@pytest.mark.django_db
class TestUserModel:
	def test_create_user(self):
		"""Тест создания обычного пользователя"""
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		# Проверяем, что пользователь создается с корректными данными
		assert user.username == "testuser"
		assert user.email == "test@example.com"
		assert not user.is_staff  # is_staff теперь контролируется через member
		assert not user.is_superuser  # аналогично
		assert user.check_password("testpassword123")

		# Проверяем атрибуты через связанный объект Member
		assert not user.member.is_admin
		assert not user.member.is_creator

	def test_create_superuser(self):
		"""Тест создания суперпользователя"""
		superuser = User.objects.create_superuser(
			username="adminuser",
			email="admin@example.com",
			password="adminpass123"
		)
		assert superuser.username == "adminuser"
		assert superuser.email == "admin@example.com"
		assert superuser.is_staff
		assert superuser.is_superuser
		assert superuser.check_password("adminpass123")

		assert not superuser.member.is_admin
		assert not superuser.member.is_creator

	def test_user_str_representation(self):
		"""Тест строкового представления пользователя"""
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		assert str(user) == "testuser"

	def test_token_generation(self):
		"""Тест генерации JWT-токена для пользователя"""
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		token = user.token
		assert isinstance(token, str)

	def test_invalid_email(self):
		""" Тест создания пользователя с недопустимым email.
		(вызывает ValidationError) """
		with pytest.raises(ValidationError):
			user = User(username="invaliduser", email="invalid-email")
			user.full_clean()

	def test_get_full_name(self):
		"""Тест функции get_full_name (должен вернуть username)"""
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		assert user.get_full_name() == "testuser"

	def test_get_short_name(self):
		"""Тест функции get_short_name (должен вернуть username)"""
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		assert user.get_short_name() == "testuser"
