import jwt

from datetime import datetime
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.core import validators
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
	"""
	Django требует, чтобы пользовательские `User`
	определяли свой собственный класс Manager.
	Унаследовав от BaseUserManager, мы получаем много кода,
	используемого Django для создания `User`.

	Все, что нам нужно сделать, это переопределить функцию
	`create_user`, которую мы будем использовать
	для создания объектов `User`.
	"""

	def _create_user(self, username, email, password=None, **extra_fields):
		if not username:
			raise ValueError('Указанное имя пользователя должно быть установлено')

		if not email:
			raise ValueError('Данный адрес электронной почты должен быть установлен')

		email = self.normalize_email(email)
		user = self.model(username=username, email=email, **extra_fields)
		user.set_password(password)
		user.save(using=self._db)

		return user

	def create_user(self, username, email, password=None, **extra_fields):
		"""
		Создает и возвращает `User` с адресом электронной почты,
		именем пользователя и паролем.
		"""
		extra_fields.setdefault('is_staff', False)
		extra_fields.setdefault('is_superuser', False)

		return self._create_user(username, email, password, **extra_fields)

	def create_superuser(self, username, email, password, **extra_fields):
		"""
		Создает и возвращает пользователя с правами
		суперпользователя (администратора).
		"""
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)

		if extra_fields.get('is_staff') is not True:
			raise ValueError('Суперпользователь должен иметь is_staff=True.')

		if extra_fields.get('is_superuser') is not True:
			raise ValueError('Суперпользователь должен иметь is_superuser=True.')

		return self._create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
	username = models.CharField(db_index=True, max_length=255, unique=True)
	email = models.EmailField(
		validators=[validators.validate_email],
		unique=True,
		blank=False
	)
	is_staff = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ('username',)
	objects = UserManager()

	def __str__(self):
		return self.username

	@property
	def token(self):
		"""
		Позволяет нам получить токен пользователя, вызвав `user.token` вместо
		`user.generate_jwt_token().
		"""
		return self._generate_jwt_token()

	def get_full_name(self):
		"""
		Этот метод требуется Django для таких вещей,
		как обработка электронной почты.
		Обычно это имя и фамилия пользователя.
		Поскольку мы не храним настоящее имя пользователя,
		мы возвращаем его имя пользователя.
		"""
		return self.username

	def get_short_name(self):
		"""
		Этот метод требуется Django для таких вещей,
		как обработка электронной почты.
		Как правило, это будет имя пользователя.
		Поскольку мы не храним настоящее имя пользователя,
		мы возвращаем его имя пользователя.
		"""
		return self.username

	def _generate_jwt_token(self):
		"""
		Создает веб-токен JSON, в котором хранится идентификатор
		этого пользователя и срок его действия
		составляет 60 дней в будущем.
		"""
		dt = datetime.now() + timedelta(days=60)

		token = jwt.encode({
			'id': self.pk,
			'exp': int(dt.strftime('%s'))
		}, settings.SECRET_KEY, algorithm='HS256')

		return token
