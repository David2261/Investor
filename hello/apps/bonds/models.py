from django.db import models
from django.urls import reverse
from transliterate import slugify
from django.utils.translation import gettext_lazy as _

from articles.models import Category
from articles.segregation.base_models import BasePost
from articles.segregation.options import check_lang


class Bonds(BasePost):
	description = models.TextField(
			verbose_name=_("The text of the bond"),
			null=False,
			blank=False)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
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
