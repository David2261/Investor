import pytest
from django.contrib.auth import get_user_model
from authentication.models import Member
from authentication.models import User


@pytest.mark.django_db
class TestMemberModel:

	def test_create_member(self):
		"""Тест создания Member и связанного пользователя"""
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)

		# После создания user, объект Member должен быть автоматически создан через сигнал
		assert hasattr(user, 'member')  # Проверяем, что связан объект Member

		member = user.member  # Получаем связанный объект Member через поле user.member

		assert member.user == user  # Проверяем связь между Member и User
		assert member.is_admin is False  # По умолчанию должно быть False
		assert member.is_creator is False  # По умолчанию должно быть False
		assert member.is_active is True  # По умолчанию должно быть True

	def test_member_str_representation(self):
		"""Тест строкового представления Member"""
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		member = user.member  # Получаем объект Member через пользователя
		assert str(member) == "testuser"  # Проверяем строковое представление

	def test_is_staff_property(self):
		"""Тест свойства is_staff пользователя через Member"""
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		user.member.is_admin = True  # Устанавливаем is_admin в Member
		user.member.save()  # Сохраняем изменения
		assert user.is_staff is True  # Проверяем, что свойство is_staff теперь возвращает True

	def test_is_active_property(self):
		"""Тест свойства is_active пользователя через Member"""
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		user.member.is_active = False  # Устанавливаем is_active в Member
		user.member.save()  # Сохраняем изменения
		assert user.is_active is False  # Проверяем, что свойство is_active теперь возвращает False

	def test_is_creator_property(self):
		"""Тест свойства is_creator пользователя через Member"""
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		user.member.is_creator = True  # Устанавливаем is_creator в Member
		user.member.save()  # Сохраняем изменения
		assert user.is_creator is True  # Проверяем, что свойство is_creator теперь возвращает True
