import os
import environ

from django.conf import settings
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.utils.html import escape
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.yandex.views import YandexOAuth2Adapter
from allauth.socialaccount.providers.microsoft.views import (
	MicrosoftGraphOAuth2Adapter
)

from hello.settings import BASE_DIR

from .models import User
from .tokens import account_activation_token
from .csrf import enforce_csrf
from .csrf import set_jwt_cookies
from .social import SocialLoginViewMixin
from .serializers import RegistrationSerializer
from .serializers import MyTokenObtainPairSerializer
from .serializers import UserSerializer
from .serializers import ResetPasswordRequestSerializer
from .serializers import ResetPasswordConfirmSerializer
from .backends import CookieJWTAuthentication

env = environ.Env()
environ.Env.read_env(env_file=os.path.join(BASE_DIR, '.env'))


""" Для обычных пользователей """


class RegistrationAPIView(CreateAPIView):
	queryset = User.objects.all()
	permission_classes = [permissions.AllowAny]
	serializer_class = RegistrationSerializer

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		refresh = RefreshToken.for_user(user)
		access = str(refresh.access_token)
		return Response({
			'username': user.username,
			'email': user.email,
			'access': access,
			'refresh': str(refresh),
		}, status=status.HTTP_201_CREATED)


class UserLoginView(TokenObtainPairView):
	@enforce_csrf
	def post(self, request):
		email = request.data.get('email')
		password = request.data.get('password')
		user = authenticate(email=email, password=password)

		if user:
			refresh = RefreshToken.for_user(user)
			response = Response({
				'status': 'success',
				'user_id': user.id,
				'email': user.email,
			}, status=status.HTTP_200_OK)
			response.set_cookie(
				key='access_token',
				value=str(refresh.access_token),
				httponly=True,
				secure=False,
				samesite='Lax',
				max_age=5 * 60)
			response.set_cookie(
				key='refresh_token',
				value=str(refresh),
				httponly=True,
				secure=False,
				samesite='Lax',
				max_age=24 * 60 * 60)
			return response
		return Response(
			{'error': 'Invalid credentials'},
			status=status.HTTP_401_UNAUTHORIZED)


class CustomTokenRefreshView(TokenRefreshView):
	@enforce_csrf
	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		try:
			serializer.is_valid(raise_exception=True)
		except TokenError as e:
			raise InvalidToken(f'Invalid token {e}')

		tokens = serializer.validated_data
		print("Tokens generated:", tokens)
		response = Response({
			'access': tokens['access'],
			'refresh': tokens['refresh']
		}, status=status.HTTP_200_OK)
		response = set_jwt_cookies(response, tokens['access'], tokens['refresh'])
		return response


class CustomTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer
	permission_classes = ()

	@enforce_csrf
	def post(self, request, *args, **kwargs):
		try:
			print(f"Request data: {request.data}")  # Debug
			print(f"Request cookies: {request.COOKIES}")  # Debug
			serializer = self.get_serializer(data=request.data)
			serializer.is_valid(raise_exception=True)
			tokens = serializer.validated_data
			print("Tokens generated:", tokens)  # Debug
			response = Response({
				'access': tokens['access'],
				'refresh': tokens['refresh']
			}, status=status.HTTP_200_OK)
			response = set_jwt_cookies(response, tokens['access'], tokens['refresh'])
			print("Response cookies set")  # Debug
			return response
		except Exception as e:
			print(f"Error in CustomTokenObtainPairView: {str(e)}")  # Debug
			raise


class CurrentUserView(generics.RetrieveAPIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = UserSerializer

	def get(self, request, *args, **kwargs):
		serializer = self.get_serializer(self.request.user)
		return Response(serializer.data)


class PasswordResetRequestView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request, *args, **kwargs):
		serializer = ResetPasswordRequestSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		email = serializer.validated_data['email']

		# Санитизация и валидация email
		clean_email = escape(email)
		validator = EmailValidator()
		try:
			validator(clean_email)
		except ValidationError:
			return Response(
				{"error": "Неверный формат email."},
				status=status.HTTP_400_BAD_REQUEST
			)

		try:
			user = User.objects.get(email=clean_email)
			# Создание токена
			token = account_activation_token.make_token(user)
			uid = urlsafe_base64_encode(force_bytes(user.pk))
			# Формирование ссылки для сброса пароля
			reset_url = request.build_absolute_uri(
				reverse('password_reset_confirm', kwargs={'uidb64': uid, 'token': token})
			)
			# Отправка письма
			send_mail(
				subject="Сброс пароля",
				message=f"Перейдите по ссылке для сброса пароля: {reset_url}",
				from_email=settings.DEFAULT_FROM_EMAIL,
				recipient_list=[clean_email],
				fail_silently=False,
			)
			return Response(
				{"message": "Письмо для сброса пароля отправлено."},
				status=status.HTTP_200_OK
			)
		except User.DoesNotExist:
			# Не раскрываем, существует ли email, для безопасности
			return Response(
				{"message": "Письмо для сброса пароля отправлено, \
				если email зарегистрирован."},
				status=status.HTTP_200_OK
			)
		except Exception as e:
			return Response(
				{"error": f"Ошибка при отправке письма: {str(e)}"},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR
			)


# Эндпоинт для подтверждения сброса пароля
class PasswordResetConfirmView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request, uidb64, token, *args, **kwargs):
		serializer = ResetPasswordConfirmSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		new_password = serializer.validated_data['new_password']

		try:
			from django.utils.http import urlsafe_base64_decode
			uid = urlsafe_base64_decode(uidb64).decode()
			user = User.objects.get(pk=uid)
			if account_activation_token.check_token(user, token):
				user.set_password(new_password)
				user.save()
				return Response(
					{"message": "Пароль успешно изменён."},
					status=status.HTTP_200_OK
				)
			else:
				return Response(
					{"error": "Недействительный токен."},
					status=status.HTTP_400_BAD_REQUEST
				)
		except (User.DoesNotExist, ValueError):
			return Response(
				{"error": "Недействительная ссылка."},
				status=status.HTTP_400_BAD_REQUEST
			)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer

	@method_decorator(cache_page(60 * 15))
	def get(self, request, *args, **kwargs):
		return super().get(request, *args, **kwargs)


def get_csrf(request: Request) -> Response:
	response = JsonResponse({'detail': 'CSRF cookie set'})
	response['X-CSRFToken'] = get_token(request)
	return response


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
