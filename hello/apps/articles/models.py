# -*- coding: utf-8 -*-
import uuid
import logging

from django.db import models
from django.urls import reverse
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify

from authentication.models import User
from .segregation.base_models import BasePost
from .segregation.fields import WEBPField


logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")


STATUS_CHOICES = (
		('draft', 'Draft'),
		('published', 'Published'),
	)


class Ip(models.Model):
	logger.info("Включен 'Ip models'")
	ip = models.CharField(editable=False, max_length=100)

	def __str__(self):
		return self.ip


class Category(models.Model):
	logger.info("Включен 'Category models'")
	name = models.CharField(
			verbose_name=_("Category"),
			max_length=255)
	slug = models.SlugField(
			default='',
			editable=False,
			max_length=255,
			verbose_name="URL")

	def __str__(self):
		return self.name

	def get_absolute_url(self):
		return reverse("category", kwargs={'cat_slug': self.slug})

	def save(self, *args, **kwargs):
		value = self.name
		self.slug = slugify(value, allow_unicode=True)
		super().save(*args, **kwargs)

	class Meta:
		verbose_name = _('Category')
		verbose_name_plural = _('Categories')
		ordering = ('id', 'name')


def image_folder(instance, filename):
	""" Generate random name with UUID """
	return 'photos/{}.webp'.format(uuid.uuid4().hex)


class Articles(BasePost):
	logger.info("Включен 'Articles models'")
	description = models.TextField(
			verbose_name=_("The text of the article"),
			null=False,
			blank=False)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	img = WEBPField(
			upload_to=image_folder,
			verbose_name=_("Image"),
			height_field=None,
			width_field=None,
			max_length=100)
	time_update = models.DateTimeField(
			auto_now=True,
			verbose_name=_("Time of change"))
	is_published = models.BooleanField(
			default=True,
			verbose_name=_("Publication"))
	views = models.ManyToManyField(
			Ip, related_name="post_views",
			editable=False,
			blank=True)

	def get_absolute_url(self):
		return reverse("post", kwargs={'post_slug': self.slug})

	def total_views(self):
		return self.views.count()

	@property
	def comments(self):
		return self.comment_set.all()

	def save(self, *args, **kwargs):
		self.slug = slugify(self.title)
		super(Articles, self).save(*args, **kwargs)

	class Meta:
		verbose_name = _("Article")
		verbose_name_plural = _("Articles")
		ordering = ('-time_update', '-time_create')


class Comment(BasePost):
	logger.info("Включен 'Comment models'")
	post = models.ForeignKey(Articles, on_delete=models.CASCADE)
	text = models.CharField(max_length=280, blank=False)
	author = models.ForeignKey(User, on_delete=models.CASCADE)

	def save(self, *args, **kwargs):
		self.slug = slugify(self.title)
		super(Articles, self).save(*args, **kwargs)
