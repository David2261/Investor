# -*- coding: utf-8 -*-
from django import forms


class UserCreationForm(forms.Form):
	name = forms.CharField(label='Your name', max_length=100)