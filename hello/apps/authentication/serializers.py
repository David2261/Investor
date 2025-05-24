from django.contrib.auth.password_validation import validate_password
from django.core.validators import EmailValidator
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.tokens import Token

from .models import User
from .models import Member


class ResetPasswordRequestSerializer(serializers.Serializer):
	email = serializers.EmailField()

	def validate_email(self, value):
		validator = EmailValidator()
		try:
			validator(value)
		except:
			raise serializers.ValidationError("Неверный формат email.")
		return value


class ResetPasswordConfirmSerializer(serializers.Serializer):
	new_password = serializers.CharField(min_length=8, write_only=True)

	def validate_new_password(self, value):
		# Проверка сложности пароля
		if not any(c.isupper() for c in value) or \
		   not any(c.islower() for c in value) or \
		   not any(c.isdigit() for c in value):
			raise serializers.ValidationError(
				"Пароль должен содержать буквы разного регистра и цифры."
			)
		return value


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
	@classmethod
	def get_token(cls, user: User) -> Token:
		token = super().get_token(user)
		token['username'] = user.username
		print(f"Generated token payload: {token}")

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

	def validate(self, attrs: dict) -> dict:
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

	def create(self, validated_data: dict) -> User:
		user = User.objects.create(
			username=validated_data['username'],
			email=validated_data['email']
		)

		user.set_password(validated_data['password'])
		user.save()

		return user


class MemberSerializer(serializers.ModelSerializer):
	class Meta:
		model = Member
		fields = ['is_admin', 'is_creator']


class UserSerializer(serializers.HyperlinkedModelSerializer):
	url = serializers.HyperlinkedIdentityField(view_name='authentication:user-detail', lookup_field='pk')
	member = MemberSerializer(read_only=True)

	class Meta:
		model = User
		fields = ['url', 'username', 'email', 'is_active', 'is_staff', 'member']
