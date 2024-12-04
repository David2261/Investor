from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
	"""
	Разрешение для проверки, является ли пользователь администратором.
	"""
	def has_permission(self, request, view):
		return request.user.is_staff


class AdminCreatorOnly(BasePermission):
	def has_permission(self, request, view):
		return (
			request.user.is_authenticated
			and hasattr(request.user, "member")
			and (
				request.user.member.is_admin
				or request.user.member.is_creator
			)
		)
