# -*- coding: utf-8 -*-
from django.db import models

from django.conf import settings
import logging


logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")


class BasePost(models.Model):
	title = models.CharField(
			verbose_name="Заголовок статьи",
			help_text="Название статьи",
			max_length=255,
			null=False,
			blank=False,
			primary_key=True)
	time_create = models.DateTimeField(
			auto_now_add=True,
			verbose_name="Время создания")

	class Meta:
		abstract = True

	def __str__(self):
		return self.title or str(self.title)
