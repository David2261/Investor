from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
	"""
	Разрешение для проверки, является ли пользователь администратором.
	"""
	def has_permission(self, request, view):
		return (
			request.user.is_authenticated
			and getattr(request.user, 'is_staff', False))


class AdminCreatorOnly(BasePermission):
	"""
	Разрешение для проверки, является ли пользователь администратором или создателем.
	"""
	def has_permission(self, request, view):
		return (
			request.user.is_authenticated
			and (
				getattr(request.user, 'is_admin', False)
				or getattr(request.user, 'is_creator', False)
			))
