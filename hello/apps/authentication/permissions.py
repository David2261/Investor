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
		return (
			request.user.is_authenticated
			and (
				getattr(request.member.user, 'is_admin', False)
				or getattr(request.member.user, 'is_creator', False)
			))
