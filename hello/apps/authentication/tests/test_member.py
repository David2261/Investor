import pytest
from authentication.models import User


@pytest.mark.django_db
class TestMemberModel:

	def test_create_member(self):
		""" Тест создания Member и связанного пользователя """
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123")

		# Проверяем, что объект Member создаётся автоматически
		member = user.member

		assert member is not None, "Member не был автоматически \
			создан."
		assert member.user == user, "Member не связан с User."
		assert member.is_admin is False, "is_admin \
			должен быть False по умолчанию."
		assert member.is_creator is False, "is_creator \
			должен быть False по умолчанию."
		assert user.is_active is True, "Пользователь \
			должен быть активным по умолчанию."

	def test_member_str_representation(self):
		""" Тест строкового представления Member """
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		member = user.member
		assert str(member) == f"Member: {user.username}", "Некорректное \
			строковое представление Member."

	def test_is_member_admin_property(self):
		""" Тест свойства is_member_admin пользователя через Member. """
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		user.member.is_admin = True
		user.member.save()

		assert user.is_member_admin is True, "Свойство is_member_admin \
			должно быть True, если is_admin = True."

	def test_is_creator_property(self):
		""" Тест свойства is_creator пользователя через Member """
		user = User.objects.create_user(
			username="testuser",
			email="test@example.com",
			password="testpassword123"
		)
		user.member.is_creator = True
		user.member.save()

		assert user.member.is_creator is True, "is_creator \
			должно быть True, если is_creator = True в Member."

	def test_superuser_properties(self):
		""" Тест создания суперпользователя и его свойств """
		superuser = User.objects.create_superuser(
			username="adminuser",
			email="admin@example.com",
			password="superpassword123"
		)

		assert superuser.is_staff is True, "Суперпользователь \
			должен иметь is_staff = True."
		assert superuser.is_superuser is True, "Суперпользователь \
			должен иметь is_superuser = True."
		assert superuser.is_active is True, "Суперпользователь \
			должен быть активным."
