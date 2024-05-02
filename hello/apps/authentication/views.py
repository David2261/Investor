from tokenize import TokenError
from jwt import InvalidTokenError
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView

from .serializers import RegistrationSerializer
from .serializers import UserSerializer


class RegistrationAPIView(APIView):
	permission_classes = [permissions.AllowAny]
	serializer_class = RegistrationSerializer

	def post(self, request):
		serializer = self.serializer_class(data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()

		return Response(
			{
				'token': serializer.data.get('token', None),
			},
			status=status.HTTP_201_CREATED,
		)


class CustomTokenRefreshView(TokenRefreshView):
	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)

		try:
			serializer.is_valid(raise_exception=True)
		except TokenError as e:
			raise InvalidTokenError(f'Invalid token {e}')

		tokens = serializer.validated_data
		response = Response(tokens, status=status.HTTP_200_OK)
		response.set_cookie(
				key='refresh_token',
				value=tokens['refresh'],
				httponly=True)
		return response


class CurrentUserView(generics.RetrieveAPIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = UserSerializer

	def get_object(self):
		user = self.request.user
		return user
