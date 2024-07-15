from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.yandex.views import YandexOAuth2Adapter
from allauth.socialaccount.providers.microsoft.provider import MicrosoftOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.serializers import SocialLoginSerializer

from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
	@classmethod
	def get_token(cls, user):
		token = super().get_token(user)

		# Add custom claims
		token['username'] = user.username

		return token


class RegistrationSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(
			required=True,
			validators=[UniqueValidator(queryset=User.objects.all())]
			)

	password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
	password2 = serializers.CharField(write_only=True, required=True)

	class Meta:
		model = User
		fields = ('username', 'password', 'password2', 'email')

	def validate(self, attrs):
		if attrs['password'] != attrs['password2']:
			raise serializers.ValidationError(
				{"password": "Password fields didn't match."}
			)
		
		if attrs['email'] is None:
			raise serializers.ValidationError(
				'An email address is required to log in.'
			)

		if attrs['password'] is None:
			raise serializers.ValidationError(
				'A password is required to log in.'
			)

		return attrs

	def create(self, validated_data):
		user = User.objects.create(
			username=validated_data['username'],
			email=validated_data['email']
		)

		
		user.set_password(validated_data['password'])
		user.save()

		return user


class SocialLoginBaseSerializer(SocialLoginSerializer):
	def validate(self, attrs):
		view = self.context.get('view')
		request = self._get_request()

		if not attrs.get('code'):
			raise serializers.ValidationError(
				'Authorization code is required.'
			)

		client_class = OAuth2Client
		adapter = self.adapter_class(request)
		app = adapter.get_provider().get_app(request)

		token = adapter.complete_login(request, attrs.get('code'))
		token.app = app
		login = self.get_login(token)

		if token.token_secret:
			login.token_secret = token.token_secret

		return login


class GoogleSocialLoginSerializer(SocialLoginBaseSerializer):
	adapter_class = GoogleOAuth2Adapter


class YandexSocialLoginSerializer(SocialLoginBaseSerializer):
	adapter_class = YandexOAuth2Adapter


class MicrosoftSocialLoginSerializer(SocialLoginBaseSerializer):
	adapter_class = MicrosoftOAuth2Adapter


class LoginSerializer(serializers.Serializer):
	email = serializers.EmailField(write_only=True)
	password = serializers.CharField(max_length=128, write_only=True)
	code = serializers.CharField(max_length=255, write_only=True)

	def validate(self, data):
		if 'code' in data:
			provider = data.get('provider')
			if provider == 'google':
				serializer = GoogleSocialLoginSerializer(data=data)
			elif provider == 'yandex':
				serializer = YandexSocialLoginSerializer(data=data)
			elif provider == 'microsoft':
				serializer = MicrosoftSocialLoginSerializer(data=data)
			else:
				raise serializers.ValidationError('Invalid provider')

			serializer.is_valid(raise_exception=True)
			login = serializer.get_login()
			token = login.token
			return {'token': token}

		# Handle traditional login
		email = data.get('email')
		password = data.get('password')

		if email is None:
			raise serializers.ValidationError(
				'An email address is required to log in.'
			)

		if password is None:
			raise serializers.ValidationError(
				'A password is required to log in.'
			)

		user = authenticate(username=email, password=password)

		if user is None:
			raise serializers.ValidationError(
				'A user with this email and password was not found.'
			)

		if not user.is_active:
			raise serializers.ValidationError(
				'This user has been deactivated.'
			)

		return {'token': user.token, }


class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ['url', 'username', 'email', 'groups']
