from django.db import models
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User


class UserBackend(BaseBackend):

	def authenticate(self, request, username=None, password=None):
		login_valid
