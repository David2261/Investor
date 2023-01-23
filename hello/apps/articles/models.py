# -*- coding: utf-8 -*-
import logging
from django.db import models
from django.urls import reverse
# from django.contrib.auth.models import AbstractUser

from django.conf import settings

logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")

STATUS_CHOICES = (
   ('draft', 'Draft'),
   ('published', 'Published'),
)

# class User(AbstractUser):
# 	...

# class User(models.Model):
# 	choices = (
# 		('M', 'Male'),
# 		('F', 'Female')
# 	)
# 	name = models.CharField(verbose_name="Имя", max_length=255)
# 	password = models.CharField(verbose_name="Пароль", max_length=255)
# 	img = models.ImageField(upload_to='User/% Y/% m/% d/', verbose_name="Иконка", height_field=None, width_field=None, max_length=100)
# 	time_create = models.DateTimeField(auto_now_add=True, verbose_name="Время создания")
# 	slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
# 	sex = models.CharField(max_length=255, choices=choices)
# 	age = models.SmallIntegerField()

# 	def get_absolute_url(self):
# 		return reverse("user", kwargs={'user_slug': self.slug})

# 	def __str__(self):
# 		return '%s & %s' % (self.name, self.sex)

# 	class Meta:
# 		unique_together = [['name', 'slug']]
# 		verbose_name = 'Пользователь'
# 		verbose_name_plural = 'Пользователи'
# 		ordering = ('id', 'name')


class Ip(models.Model):
	logger.info("Включен 'Ip models'")
	ip = models.CharField(max_length=100)


class Category(models.Model):
	logger.info("Включен 'Category models'")
	name = models.CharField(verbose_name="Категория", max_length=255)
	slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')

	def __str__(self):
		return self.name

	def get_absolute_url(self):
		return reverse("category", kwargs={'cat_slug': self.slug})

	class Meta:
		verbose_name = 'Категория'
		verbose_name_plural = 'Категории'
		ordering = ('id', 'name')


class Articles(models.Model):
	logger.info("Включен 'Articles models'")
	title = models.CharField(verbose_name = "Заголовок статьи", help_text = "Название статьи", max_length = 255, null = False, blank = False, primary_key = True)
	description = models.TextField(verbose_name = "Текст статьи", null = False, blank = False)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	img = models.ImageField(upload_to='Articles/% Y/% m/% d/', verbose_name="Изображение", height_field=None, width_field=None, max_length=100)
	time_create = models.DateTimeField(auto_now_add=True, verbose_name="Время создания")
	time_update = models.DateTimeField(auto_now=True, verbose_name="Время изменения")
	is_published = models.BooleanField(default=True, verbose_name="Публикация")
	views = models.ManyToManyField(Ip, related_name="post_views", blank=True)
	slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')

	def get_absolute_url(self):
		return reverse("post", kwargs={'post_slug': self.slug})
	
	def total_views(self):
		return self.views.count()

	def __str__(self):
		return self.title

	class Meta:
		verbose_name = "Статья"
		verbose_name_plural= "Статьи"
		ordering = ('-time_update', '-time_create')
