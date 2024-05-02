from django.contrib.auth import authenticate
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

