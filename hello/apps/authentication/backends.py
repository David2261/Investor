from typing import Optional
from typing import Tuple
import jwt
from django.conf import settings
from rest_framework import authentication
from rest_framework import exceptions
from rest_framework.request import Request

from .models import User


class JWTAuthentication(authentication.BaseAuthentication):
	authentication_header_prefix: str = 'Bearer'

	def authenticate(self, request: Request) -> Optional[Tuple[User, str]]:
		"""
		Метод `authenticate` вызывается при каждом запросе независимо от
		того, требуется ли конечная точка аутентификации.

		`authenticate` имеет два возможных возвращаемых значения:

		1) `None` - мы возвращаем `None`, если не хотим проходить
		аутентификацию.
		Обычно это означает, что мы знаем, что аутентификация
		завершится неудачей.
		Примером этого является случай, когда запрос не включает токен в
		заголовки.

		2) `(пользователь, токен)` - мы возвращаем комбинацию
		пользователь/токен, когда аутентификация прошла успешно.

		Если ни один из вариантов не выполняется, это означает,
		что произошла ошибка и мы ничего не возвращаем.
		Мы просто поднимаем `Ошибка аутентификации`
		исключение и позвольте Django REST Framework
		справиться с остальным.
		"""
		request.user = None
		"""
		`auth_header` должен быть массивом с двумя элементами:
			1) имя заголовка аутентификации (в данном случае "Token")
			2) JWT по которому мы должны пройти аутентификацию.
		"""
		auth_header = authentication.get_authorization_header(request).split()
		auth_header_prefix = self.authentication_header_prefix.lower()

		if not auth_header:
			return None

		if len(auth_header) == 1:
			return None

		elif len(auth_header) > 2:
			return None
		"""
		Используемая нами библиотека JWT не может обрабатывать тип `byte`,
			который обычно используется стандартными библиотеками в Python 3.
		Чтобы обойти это, нам просто нужно декодировать `prefix` и `token`.
		Это не приводит к чистый код, но это хорошее решение,
			потому что мы получили бы ошибку,
			если бы мы не расшифровали эти значения.
		"""
		prefix = auth_header[0].decode('utf-8')
		token = auth_header[1].decode('utf-8')

		if prefix.lower() != auth_header_prefix:
			# Префикс заголовка auth - это не то, что мы ожидали.
			# Не пытайтесь выполнить аутентификацию.
			return None
		return self._authenticate_credentials(request, token)

	def _authenticate_credentials(
			self,
			request: Request,
			token: str) -> Tuple[User, str]:
		try:
			payload = jwt.decode(token, settings.SECRET_KEY)
		except jwt.ExpiredSignatureError:
			msg = 'Токен истек.'
			raise exceptions.AuthenticationFailed(msg)
		except jwt.InvalidTokenError:
			msg = 'Неверная аутентификация. \
				Не удалось расшифровать токен.'
			raise exceptions.AuthenticationFailed(msg)

		try:
			user = User.objects.get(pk=payload['id'])
		except User.DoesNotExist:
			msg = 'Пользователь, соответствующий этому токену, \
				найден не был.'
			raise exceptions.AuthenticationFailed(msg)

		if not user.is_active:
			msg = 'Этот пользователь был деактивирован.'
			raise exceptions.AuthenticationFailed(msg)

		return (user, token)
