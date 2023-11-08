from rest_framework import serializers
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import authenticate

from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
	# Пароль должен быть подтвержден и не должен быть прочитан клиентом
	password = serializers.CharField(
		max_length=128,
		min_length=8,
		write_only=True,
	)

	# Клиент не должен иметь возможности отправлять токен вместе с регистрацией
	# запрос. Создание `токена`, доступного только для чтения, решает это за нас.
	token = serializers.CharField(max_length=255, read_only=True)

	class Meta:
		model = User
		fields = ('email', 'username', 'password', 'token',)

	def create(self, validated_data):
		return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
	email = serializers.EmailField(write_only=True)
	password = serializers.CharField(max_length=128, write_only=True)

	# Ignore these fields if they are included in the request.
	username = serializers.CharField(max_length=255, read_only=True)
	token = serializers.CharField(max_length=255, read_only=True)

	def validate(self, data):
		username = data.get('username', None)
		email = data.get('email', None)
		password = data.get('password', None)

		if email is None:
			raise serializers.ValidationError(
				'An email address is required to log in.'
			)

		if password is None:
			raise serializers.ValidationError(
				'A password is required to log in.'
			)

		user = authenticate(username=username, email=email, password=password)

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


class GroupSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Group
		fields = ['url', 'name']