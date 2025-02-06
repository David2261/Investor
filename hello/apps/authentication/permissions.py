from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView


class IsAdminUser(BasePermission):
	""" Разрешение для проверки, является ли пользователь
	администратором. """
	def has_permission(self, request: Request, view: APIView) -> bool:
		return (
			request.user.is_authenticated
			and getattr(request.user, 'is_staff', False))


class AdminCreatorOnly(BasePermission):
	""" Разрешение для проверки, является ли пользователь
	администратором или создателем. """
	def has_permission(self, request: Request, view: APIView) -> bool:
		# Проверяем, что пользователь аутентифицирован
		if not request.user.is_authenticated:
			return False

		# Проверяем наличие атрибута member
		member = getattr(request.user, 'member', None)
		if member is None:
			print("У пользователя нет объекта member.")
			return False

		return member.is_creator or member.is_admin
