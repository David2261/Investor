from rest_framework import serializers
from authentication.models import User


class AdminAllUsersSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username', 'email', 'is_staff', 'is_active']


class AdminUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username']
