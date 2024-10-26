import os
from tokenize import TokenError
from jwt import InvalidTokenError
import environ

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
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

from hello.settings import BASE_DIR

from .models import User
from .social import SocialLoginViewMixin
from .serializers import RegistrationSerializer
from .serializers import UserSerializer
from .serializers import PasswordResetSerializer


env = environ.Env()
environ.Env.read_env(env_file=os.path.join(BASE_DIR, '.env'))


class RegistrationAPIView(CreateAPIView):
	queryset = User.objects.all()
	permission_classes = [permissions.AllowAny]
	serializer_class = RegistrationSerializer


class PasswordResetAPIView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = PasswordResetSerializer(data=request.data)
		if serializer.is_valid():
			email = serializer.validated_data['email']
			try:
				user = User.objects.get(email=email)
			except User.DoesNotExist:
				return Response(
						{"error": "Пользователь с таким email не найден."},
						status=status.HTTP_404_NOT_FOUND)

			token = default_token_generator.make_token(user)
			uid = urlsafe_base64_encode(force_bytes(user.pk))
			reset_url = f"{env('FRONTEND_HOST')}/reset-password/{uid}/{token}/"

			# Отправка email с ссылкой для сброса пароля
			send_mail(
				subject="Сброс пароля",
				message=f"Перейдите по ссылке для сброса пароля: {reset_url}",
				from_email="no-reply@example.com",
				recipient_list=[email],
				fail_silently=False,
			)
			return Response(
					{"message": "Ссылка для сброса пароля отправлена."},
					status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class GoogleLoginView(SocialLoginViewMixin):
	adapter_class = GoogleOAuth2Adapter
	client_class = OAuth2Client
	callback_url = '/api/v1/allauth/accounts/google/login/callback'


class YandexLoginView(SocialLoginViewMixin):
	adapter_class = YandexOAuth2Adapter
	client_class = OAuth2Client
	callback_url = '/api/v1/allauth/accounts/yandex/login/callback'


class MicrosoftLoginView(SocialLoginViewMixin):
	adapter_class = MicrosoftGraphOAuth2Adapter
	client_class = OAuth2Client
	callback_url = '/api/v1/allauth/accounts/microsoft/login/callback'
