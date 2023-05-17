# -*- coding: utf-8 -*-
import logging
from django.db import models
from django.urls import reverse
from authentication.models import User

from django.conf import settings
from .regular_models import BasePost


logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")


STATUS_CHOICES = (
		('draft', 'Draft'),
		('published', 'Published'),
	)


class Ip(models.Model):
	logger.info("Включен 'Ip models'")
	ip = models.CharField(max_length=100)

	def __str__(self):
		return self.ip


class Category(models.Model):
	logger.info("Включен 'Category models'")
	name = models.CharField(verbose_name="Категория", max_length=255)
	slug = models.SlugField(
		max_length=255,
		unique=True,
		db_index=True,
		null=True,
		verbose_name='URL')

	def __str__(self):
		return self.name

	def get_absolute_url(self):
		return reverse("category", kwargs={'cat_slug': self.slug})

	class Meta:
		verbose_name = 'Категория'
		verbose_name_plural = 'Категории'
		ordering = ('id', 'name')


class Articles(BasePost):
	logger.info("Включен 'Articles models'")
	description = models.TextField(
			verbose_name="Текст статьи",
			null=False,
			blank=False)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	img = models.ImageField(
			upload_to='Articles/% Y/% m/% d/',
			verbose_name="Изображение",
			height_field=None,
			width_field=None,
			max_length=100)
	time_update = models.DateTimeField(
			auto_now=True,
			verbose_name="Время изменения")
	is_published = models.BooleanField(default=True, verbose_name="Публикация")
	views = models.ManyToManyField(Ip, related_name="post_views", blank=True)
	slug = models.SlugField(
			max_length=255,
			unique=True,
			db_index=True,
			null=True,
			verbose_name='URL')

	def get_absolute_url(self):
		return reverse("post", kwargs={'post_slug': self.slug})

	def total_views(self):
		return self.views.count()

	@property
	def comments(self):
		return self.comment_set.all()

	class Meta:
		verbose_name = "Статья"
		verbose_name_plural = "Статьи"
		ordering = ('-time_update', '-time_create')


class Comment(BasePost):
	logger.info("Включен 'Comment models'")
	post = models.ForeignKey(Articles, on_delete=models.CASCADE)
	text = models.CharField(max_length=280, blank=False)
	author = models.ForeignKey(User, on_delete=models.CASCADE)
