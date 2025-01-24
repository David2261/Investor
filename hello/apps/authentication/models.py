import jwt
from datetime import datetime, timedelta
from typing import Optional
from django.conf import settings
from django.db import models
from django.core import validators
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserManager(BaseUserManager):
	"""
	Django требует, чтобы пользовательские `User`
	определяли свой собственный класс Manager.
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
		extra_fields.setdefault('is_staff', False)
		extra_fields.setdefault('is_superuser', False)

		return self._create_user(username, email, password, **extra_fields)

	def create_superuser(self, username, email, password, **extra_fields):
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
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username',]
	objects = UserManager()
	member: Optional["Member"] = None

	def __str__(self):
		return self.username

	@property
	def token(self):
		"""Позволяет нам получить токен пользователя, вызвав `user.token` вместо `user.generate_jwt_token()`."""
		return self._generate_jwt_token()

	def get_full_name(self):
		"""Этот метод используется для обработки электронной почты и других операций, требующих имени пользователя."""
		return self.username

	def get_short_name(self):
		"""Как правило, это будет имя пользователя."""
		return self.username

	def _generate_jwt_token(self):
		"""Создает веб-токен JSON, в котором хранится идентификатор пользователя и срок его действия составляет 60 дней в будущем."""
		dt = datetime.now() + timedelta(days=60)
		token = jwt.encode({
			'id': self.pk,
			'exp': int(dt.timestamp())
		}, settings.SECRET_KEY, algorithm='HS256')
		return token

	def get_role(self):
		try:
			member = getattr(self, 'member', None)
			if member:
				if member.is_admin:
					return "admin"
				elif member.is_creator:
					return "creator"
			return "regular user"
		except Member.DoesNotExist:
			return "regular user"

	@property
	def is_staff(self):
		"""Проверяет, является ли пользователь администратором через объект Member."""
		return getattr(self, 'member', None).is_admin if hasattr(self, 'member') else False

	@property
	def is_active(self):
		"""Проверяет, активен ли пользователь через объект Member."""
		return getattr(self, 'member', None).is_active if hasattr(self, 'member') else False

	@property
	def is_creator(self):
		"""Проверяет, является ли пользователь создателем через объект Member."""
		return getattr(self, 'member', None).is_creator if hasattr(self, 'member') else False


class Member(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='member')
	is_admin = models.BooleanField(default=False)
	is_creator = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)

	def __str__(self):
		return f"Member: {self.user.username}"


@receiver(post_save, sender=User)
def create_member_for_user(sender, instance, created, **kwargs):
	"""Создает объект Member, если он не существует."""
	if created:
		Member.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_member_for_user(sender, instance, **kwargs):
	"""Сохраняет объект Member при обновлении пользователя."""
	instance.member.save()

