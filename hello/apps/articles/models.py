# -*- coding: utf-8 -*-
import uuid
import logging

from django.db import models
from django.urls import reverse
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify

from segregation.base_models import BasePost
from segregation.base_models import get_default_image_path
from segregation.fields import WEBPField
from segregation.options import check_lang


logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")


STATUS_CHOICES = (
		('draft', 'Draft'),
		('published', 'Published'),
	)


class PageHit(models.Model):
	url = models.CharField(unique=True, max_length=255)
	count = models.PositiveIntegerField(default=0)

	def __str__(self):
		return str(self.count)


class Category(models.Model):
	logger.info("Включен 'Category models'")
	name = models.CharField(
			verbose_name=_("Category"),
			max_length=255)
	author = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		null=True,
		blank=True)
	slug = models.SlugField(
			default='',
			editable=False,
			max_length=255,
			verbose_name="URL")

	def __str__(self):
		return self.name

	def get_absolute_url(self):
		return reverse("articles:category-detail", kwargs={'cat_slug': self.slug})

	def save(self, *args, **kwargs):
		value = self.name
		self.slug = slugify(check_lang(value), allow_unicode=False)
		super().save(*args, **kwargs)

	class Meta:
		verbose_name = _('Category')
		verbose_name_plural = _('Categories')
		ordering = ('id',)
		app_label = "articles"


def image_folder(instance, filename):
	""" Generate random name with UUID """
	return 'photos/{}.webp'.format(uuid.uuid4().hex)


class Articles(BasePost):
	logger.info("Включен 'Articles models'")
	description = models.TextField(
			verbose_name=_("The text of the article"),
			null=False,
			blank=False)
	category = models.ForeignKey(
			Category,
			related_name='posts',
			on_delete=models.CASCADE)
	img = WEBPField(
			upload_to=image_folder,
			verbose_name=_("Image"),
			height_field=None,
			width_field=None,
			max_length=100,
			default=get_default_image_path)
	time_update = models.DateTimeField(
			auto_now_add=True,
			verbose_name=_("Time of change"))
	is_published = models.BooleanField(
			default=False,
			verbose_name=_("Publication"))

	def get_absolute_url(self):
		return reverse(
				"articles:article-detail",
				kwargs={
						'cat_slug': self.category.slug,
						'post_slug': self.slug})

	@property
	def comments(self):
		return self.comment_set.all()

	@property
	def summary(self):
		return self.description[:150]

	def save(self, *args, **kwargs):
		self.slug = slugify(check_lang(self.title))
		super(Articles, self).save(*args, **kwargs)

	class Meta:
		verbose_name = _("Article")
		verbose_name_plural = _("Articles")
		ordering = ('-time_update', '-time_create')
		app_label = "articles"


class Comment(BasePost):
	logger.info("Включен 'Comment models'")
	post = models.ForeignKey(Articles, on_delete=models.CASCADE)
	text = models.CharField(max_length=280, blank=False)

	def save(self, *args, **kwargs):
		self.slug = slugify(check_lang(self.title))
		super().save(*args, **kwargs)
