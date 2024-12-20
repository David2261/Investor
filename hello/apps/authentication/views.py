import os
from tokenize import TokenError
from jwt import InvalidTokenError
import environ

from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.yandex.views import YandexOAuth2Adapter
from allauth.socialaccount.providers.microsoft.views import (
	MicrosoftGraphOAuth2Adapter
)

from hello.settings import BASE_DIR

from .models import User
from .social import SocialLoginViewMixin
from .serializers import RegistrationSerializer
from .serializers import MyTokenObtainPairSerializer
from .serializers import UserSerializer


env = environ.Env()
environ.Env.read_env(env_file=os.path.join(BASE_DIR, '.env'))


""" Для обычных пользователей """


class RegistrationAPIView(CreateAPIView):
	queryset = User.objects.all()
	permission_classes = [permissions.AllowAny]
	serializer_class = RegistrationSerializer


class UserLoginView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer


class CustomTokenRefreshView(TokenRefreshView):
	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)

		try:
			serializer.is_valid(raise_exception=True)
		except TokenError as e:
			raise InvalidTokenError(f'Invalid token {e}')

		tokens = serializer.validated_data
		response = Response(tokens, status=status.HTTP_200_OK)
		response.set_cookie(
				key='refresh_token',
				value=tokens['refresh'],
				httponly=True)
		return response


class CurrentUserView(generics.RetrieveAPIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = UserSerializer

	def get_object(self):
		user = self.request.user
		return user


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer

	@method_decorator(cache_page(60 * 15))
	def get(self, request, *args, **kwargs):
		return super().get(request, *args, **kwargs)


class GoogleLoginView(SocialLoginViewMixin):
	adapter_class = GoogleOAuth2Adapter
	client_class = OAuth2Client
	callback_url = '/api/v1/allauth/accounts/google/login/callback'

	def get(self, request, *args, **kwargs):
		return Response(
				{"message": "GET request successful"},
				status=status.HTTP_200_OK)

	def post(self, request, *args, **kwargs):
		return Response(
				{"message": "POST request successful"},
				status=status.HTTP_200_OK)


class YandexLoginView(SocialLoginViewMixin):
	adapter_class = YandexOAuth2Adapter
	client_class = OAuth2Client
	callback_url = '/api/v1/allauth/accounts/yandex/login/callback'

	def get(self, request, *args, **kwargs):
		return Response(
				{"message": "GET request successful"},
				status=status.HTTP_200_OK)

	def post(self, request, *args, **kwargs):
		return Response(
				{"message": "POST request successful"},
				status=status.HTTP_200_OK)


class MicrosoftLoginView(SocialLoginViewMixin):
	adapter_class = MicrosoftGraphOAuth2Adapter
	client_class = OAuth2Client
	callback_url = '/api/v1/allauth/accounts/microsoft/login/callback'

	def get(self, request, *args, **kwargs):
		return Response(
				{"message": "GET request successful"},
				status=status.HTTP_200_OK)

	def post(self, request, *args, **kwargs):
		return Response(
				{"message": "POST request successful"},
				status=status.HTTP_200_OK)
