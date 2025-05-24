import jwt
from typing import Optional
from typing import Any
from typing import Type
from datetime import datetime, timedelta
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.db import models
from django.core import validators
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings


class UserManager(BaseUserManager):
	def _create_user(
			self,
			username: str,
			email: str,
			password: Optional[str] = None,
			**extra_fields: Any) -> 'User':
		""" Verifying username, email, and password.
		Then it writes them to the User object. """
		if not username:
			raise ValueError('Указанное имя пользователя должно быть установлено')
		if not email:
			raise ValueError('Данный адрес электронной почты должен быть установлен')
		if not password:
			raise ValueError('Указанный пароль должно быть установлено')

		email = self.normalize_email(email)
		user = self.model(username=username, email=email, **extra_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_user(
			self,
			username: str,
			email: str,
			password: Optional[str] = None,
			**extra_fields: Any) -> 'User':
		""" Creates a standard user to User object and writes
		is_active = True. """
		extra_fields.setdefault('is_active', True)
		return self._create_user(username, email, password, **extra_fields)

	def create_superuser(
			self,
			username: str,
			email: str,
			password: Optional[str] = None,
			**extra_fields: Any) -> 'User':
		""" Creates a superuser user to User object and writes
		is_active = True. """
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)

		if not extra_fields.get('is_staff'):
			raise ValueError('Суперпользователь должен иметь is_staff=True.')
		if not extra_fields.get('is_superuser'):
			raise ValueError('Суперпользователь должен иметь is_superuser=True.')

		return self._create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
	""" Сам пользователь """
	member: Optional['Member'] = None
	username = models.CharField(db_index=True, max_length=255, unique=True)
	email = models.EmailField(
		validators=[validators.validate_email],
		unique=True,
		blank=False)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects: UserManager = UserManager()

	def __str__(self) -> str:
		return self.username

	@property
	def token(self) -> str:
		""" Returns the JWT token. """
		return self._generate_jwt_token()

	@property
	def is_member_admin(self) -> bool:
		""" Checks whether the user is an administrator via Member. """
		member = getattr(self, 'member', None)
		return member.is_admin if member and hasattr(member, 'is_admin') else False

	def _generate_jwt_token(self) -> str:
		dt = datetime.now() + timedelta(days=60)
		token = jwt.encode({
			'id': self.pk,
			'exp': int(dt.timestamp())
		}, settings.SECRET_KEY, algorithm='HS256')
		return token

	def get_full_name(self) -> str:
		""" This method is under development! """
		return self.username

	def get_short_name(self) -> str:
		""" This method is under development! """
		return self.username


class Member(models.Model):
	""" Классы пользователя - является ли он админом или креатором. """
	user = models.OneToOneField(
		User,
		on_delete=models.CASCADE,
		related_name='member')
	is_admin = models.BooleanField(default=False)
	is_creator = models.BooleanField(default=False)

	def __str__(self) -> str:
		return f"Member: {self.user.username}"


@receiver(post_save, sender=User)
def create_member_for_user(
		sender: Type[User],
		instance: User,
		created: bool,
		**kwargs: Any) -> None:
	""" The signal that the User sends,
	after which the Member object is created """
	if created:
		Member.objects.get_or_create(user=instance)


@receiver(post_save, sender=User)
def save_member_for_user(
		sender: Type[User],
		instance: User,
		**kwargs: Any) -> None:
	""" The signal that the User sends.
	It checks if there is a Member object and saves it.
	This is necessary if there have been changes. """
	if hasattr(instance, 'member'):
		instance.member.save()
