# -*- coding: utf-8 -*-
from django import forms
from .models import Bonds


class BondsForm(forms.ModelForm):
	class Meta:
		model = Bonds
		fields = [
				'title',
				'category',
				'description',
				'price',
				'maturity',
				'is_published',
				'cupon',
				'cupon_percent']
