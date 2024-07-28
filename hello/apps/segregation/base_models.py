# -*- coding: utf-8 -*-
from django.db import models
from django.utils.text import slugify

from authentication.models import User

from .options import check_lang
from django.conf import settings
import logging


logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")


class BasePost(models.Model):
	id = models.AutoField(
			primary_key=True,
			editable=False)
	title = models.CharField(
			verbose_name="Заголовок статьи",
			help_text="Название статьи",
			max_length=255,
			null=False,
			blank=False)
	time_create = models.DateTimeField(
			auto_now_add=True,
			verbose_name="Время создания")
	slug = models.SlugField(
			default='',
			editable=False,
			max_length=255,
			verbose_name="URL")
	author = models.ForeignKey(User, on_delete=models.CASCADE)

	def save(self, *args, **kwargs):
		value = self.title
		self.slug = slugify(check_lang(value), allow_unicode=False)
		super().save(*args, **kwargs)

	class Meta:
		abstract = True

	def __str__(self):
		return self.title or str(self.title)
