import pytest
from django.contrib.auth import get_user_model
from ..models import Member

User = get_user_model()


@pytest.mark.django_db
class TestMemberModel:

	def test_create_member(self):
		"""Тест создания Member и связанного пользователя"""
		user = User.objects.create_user(
				username="testuser",
				email="test@example.com",
				password="testpassword123")
		member = Member.objects.create(
				user=user,
				is_admin=True,
				is_creator=False)
		assert member.user == user
		assert member.is_admin is True
		assert member.is_creator is False
		assert member.is_active is True

	def test_member_str_representation(self):
		"""Тест строкового представления Member"""
		user = User.objects.create_user(
				username="testuser",
				email="test@example.com",
				password="testpassword123")
		member = Member.objects.create(user=user)
		assert str(member) == "testuser"
