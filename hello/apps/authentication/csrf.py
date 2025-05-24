from functools import wraps
from django.middleware.csrf import get_token
from django.middleware.csrf import CsrfViewMiddleware
from django.http import HttpResponseForbidden
from rest_framework.response import Response


def set_jwt_cookies(
		response,
		access_token: str,
		refresh_token: str) -> Response:
	response.set_cookie(
		key="access_token",
		value=access_token,
		httponly=True,
		secure=False,
		samesite="Lax",
		max_age=3600,
	)
	response.set_cookie(
		key="refresh_token",
		value=refresh_token,
		httponly=True,
		secure=False,
		samesite="Lax",
		max_age=3600 * 24 * 7,
	)
	return response


def get_csrf(request):
	"""
	Устанавливает CSRF-токен в cookie с httponly=False
	и возвращает его в заголовке.
	"""
	token = get_token(request)
	response = Response({
		'detail': 'CSRF cookie set',
		'csrf_token': token})
	response.set_cookie(
		'csrftoken',
		token,
		httponly=False,
		secure=False,
		samesite='Lax'
	)
	response['X-CSRFToken'] = token
	return response


def enforce_csrf(func):
	@wraps(func)
	def wrapper(view_self, request, *args, **kwargs):
		if request.method not in ("GET", "HEAD", "OPTIONS", "TRACE"):
			csrf_middleware = CsrfViewMiddleware(get_response=lambda req: None)
			reason = csrf_middleware.process_view(request, None, (), {})
			if reason:
				return HttpResponseForbidden(
					f'CSRF validation failed: {reason.reason_phrase}')
		return func(view_self, request, *args, **kwargs)
	return wrapper
