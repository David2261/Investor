# -*- coding: utf-8 -*-
from django import forms
from .models import Articles


class ArticlesCSVForm(forms.ModelForm):
	class Meta:
		model = Articles
		fields = [
				'title',
				'category',
				'description',
				'img',
				'is_published']
