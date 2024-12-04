from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator

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


class PasswordResetRequestSerializer(serializers.Serializer):
	email = serializers.EmailField(required=True)

	def validate_email(self, value):
		if not User.objects.filter(email=value).exists():
			raise serializers.ValidationError("User with this email does not exist.")
		return value


class PasswordResetSerializer(serializers.Serializer):
	new_password = serializers.CharField(write_only=True)
	confirm_password = serializers.CharField(write_only=True)

	def validate(self, data):
		if data['new_password'] != data['confirm_password']:
			raise serializers.ValidationError('Пароли не совпадают!')
		return data

	def save(self, uidb64, token):
		try:
			uid = urlsafe_base64_decode(uidb64).decode()
			user = User.objects.get(pk=uid)
		except (TypeError, ValueError, OverflowError, User.DoesNotExist):
			raise serializers.ValidationError("Невозможно найти пользователя.")

		if not default_token_generator.check_token(user, token):
			raise serializers.ValidationError("Неверный или истекший токен.")

		user.set_password(self.validated_data['new_password'])
		user.save()


class UserSerializer(serializers.HyperlinkedModelSerializer):
	url = serializers.HyperlinkedIdentityField(view_name='authentication:user-detail', lookup_field='pk')
	role = serializers.SerializerMethodField()

	class Meta:
		model = User
		fields = ['url', 'username', 'email', 'groups', 'role']
	
	def get_role(self, obj):
		return obj.get_role()
