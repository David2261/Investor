# import json
# import pytest

from django.urls import reverse

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from authentication.models import User
from articles.models import Articles
from articles.models import Category


class HomePageAPIViewTestCase(APITestCase):

	def setUp(self):
		self.username = "john"
		self.email = "john@gmail.com"
		self.password = "john12345"
		self.title = "Ganda Gana"
		self.description = "Ganda Gana Georgian Music"
		self.category_name = "Music"
		self.category = Category.objects.create(name=self.category_name)
		self.user = User.objects.create_user(
			self.username,
			self.email,
			self.password)
		self.articles = Articles.objects.create(
			title=self.title,
			description=self.description,
			category=self.category)
		self.token = Token.objects.create(user=self.user)
		self.api_authentication()

	def api_authentication(self):
		self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
