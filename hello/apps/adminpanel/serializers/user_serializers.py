from rest_framework import serializers
from .base_serializers import ValidateTitleSlugMixin
from authentication.models import User
from authentication.models import Member


class MemberSerializer(serializers.ModelSerializer):
	class Meta:
		model = Member
		fields = ['is_admin', 'is_creator']


class AdminAllUsersSerializer(serializers.ModelSerializer):
	member = serializers.SerializerMethodField()

	class Meta:
		model = User
		fields = ['id', 'username', 'email', 'is_staff', 'is_active', 'member']

	def get_member(self, obj):
		if hasattr(obj, 'member'):
			return MemberSerializer(obj.member).data
		return None


class MemberUpdateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Member
		fields = ['is_creator']


class AdminUserSerializerEdit(
		serializers.ModelSerializer,
		ValidateTitleSlugMixin):
	member = MemberUpdateSerializer()
	is_active = serializers.BooleanField(required=False)

	class Meta:
		model = User
		fields = ['id', 'username', 'email', 'is_staff', 'is_active', 'member']
		read_only_fields = ['id', 'username', 'email', 'is_staff']

	def update(self, instance, validated_data):
		member_data = validated_data.pop('member', None)

		# Обновляем поля пользователя, если вдруг есть (но они только для чтения)
		for attr, value in validated_data.items():
			setattr(instance, attr, value)
		instance.save()

		# Обновляем поле is_creator у member
		if member_data:
			member = getattr(instance, 'member', None)
			if member:
				member.is_creator = member_data.get('is_creator', member.is_creator)
				member.save()

		return instance


class AdminUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username']
