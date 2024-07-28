from tokenize import TokenError
from jwt import InvalidTokenError
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenRefreshView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.yandex.views import YandexOAuth2Adapter
from allauth.socialaccount.providers.microsoft.views import (
	MicrosoftGraphOAuth2Adapter
)
from allauth.socialaccount.helpers import complete_social_login

from .models import User
from .serializers import RegistrationSerializer
from .serializers import UserSerializer


class RegistrationAPIView(CreateAPIView):
	queryset = User.objects.all()
	permission_classes = [permissions.AllowAny]
	serializer_class = RegistrationSerializer


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


class GoogleLoginView(APIView):
	adapter_class = GoogleOAuth2Adapter
	client_class = OAuth2Client
	callback_url = '/api/v1/allauth/accounts/google/login/callback'

	def post(self, request):
		adapter = self.adapter_class(request)
		app = adapter.get_provider().get_app(request)
		token = adapter.get_access_token(request)
		token.app = app
		token.save()
		login = self.get_social_login(
			adapter,
			app,
			token,
			response=Response)
		complete_social_login(request, login)
		return Response({'token': token.token})


class YandexLoginView(APIView):
	adapter_class = YandexOAuth2Adapter
	client_class = OAuth2Client
	callback_url = (
		'http://localhost:8000/api/v1/allauth/accounts/yandex/login/callback'
	)

	def post(self, request):
		adapter = self.adapter_class(request)
		app = adapter.get_provider().get_app(request)
		token = adapter.get_access_token(request)
		token.app = app
		token.save()
		login = self.get_social_login(
			adapter,
			app,
			token,
			response=Response)
		complete_social_login(request, login)
		return Response({'token': token.token})


class MicrosoftLoginView(APIView):
	adapter_class = MicrosoftGraphOAuth2Adapter
	client_class = OAuth2Client
	callback_url = (
		'http://localhost:8000/api/v1/allauth/accounts/microsoft/login/callback'
	)

	def post(self, request):
		adapter = self.adapter_class(request)
		app = adapter.get_provider().get_app(request)
		token = adapter.get_access_token(request)
		token.app = app
		token.save()
		login = self.get_social_login(
			adapter,
			app,
			token,
			response=Response)
		complete_social_login(request, login)
		return Response({'token': token.token})
