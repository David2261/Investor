import logging

from django.conf import settings
from django.db import models
from django.urls import reverse
from django.template.defaultfilters import slugify
from django.utils.translation import gettext_lazy as _

from segregation.base_models import BasePost
from segregation.options import check_lang


logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")


class Category(models.Model):
	logger.info("Включен 'Category models'")
	CATEGORY_CHOICES = [
        ('municipal bonds', 'Municipal bonds'),
        ('Corporate bonds', 'Corporate bonds'),
        ('federal loan bonds', 'Federal loan bonds'),
    ]
	name = models.CharField(
			max_length=255,
			choices=CATEGORY_CHOICES)
	slug = models.SlugField(
			default='',
			editable=False,
			max_length=255,
			verbose_name="URL")

	def __str__(self):
		return self.name

	def get_absolute_url(self):
		return reverse("bonds:category-detail", kwargs={'category_slug': self.slug})

	def save(self, *args, **kwargs):
		value = self.name
		self.slug = slugify(check_lang(value))
		super().save(*args, **kwargs)

	class Meta:
		verbose_name = _('Category')
		verbose_name_plural = _('Categories')
		ordering = ('id',)
		app_label = "bonds"


class Bonds(BasePost):
	description = models.TextField(
			verbose_name=_("The text of the bond"),
			null=False,
			blank=False)
	category = models.ForeignKey(
			Category,
			related_name='bonds',
			on_delete=models.CASCADE)
	time_update = models.DateTimeField(
			auto_now=True,
			verbose_name=_("Time of change"))
	price = models.FloatField(
			verbose_name=_("The price of the bond (1 lot)"),
			null=False,
			blank=False)
	maturity = models.DateTimeField(
			verbose_name=_("Maturity date of the bonds"),
			null=False,
			blank=False)
	is_published = models.BooleanField(
			default=True,
			verbose_name=_("Publication"))
	cupon = models.FloatField(
			verbose_name=_("The cupon of the bond (1 lot)"),
			null=False,
			blank=False)
	cupon_percent = models.FloatField(
			verbose_name=_("The cupon of the bond (1 lot) with %"),
			null=False,
			blank=False)

	def get_absolute_url(self):
		return reverse("bond", kwargs={'bond_slug': self.slug})

	def save(self, *args, **kwargs):
		self.slug = slugify(check_lang(self.title))
		super(Bonds, self).save(*args, **kwargs)

	class Meta:
		verbose_name = _("Bond")
		verbose_name_plural = _("Bonds")
		ordering = ('-time_update', '-time_create')
		app_label = "bonds"
