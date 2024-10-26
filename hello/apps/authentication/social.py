from allauth.socialaccount.models import SocialLogin
from rest_framework.views import APIView


class SocialLoginViewMixin(APIView):
	adapter_class = None
	client_class = None
	callback_url = None

	def get_social_login(self, adapter, app, token, response):
		"""Формирует объект SocialLogin для завершения логина"""
		login = SocialLogin(token=token)
		login.state = SocialLogin.get_login_state(request=self.request)
		login.state['process'] = 'login'
		login.state['next'] = self.request.GET.get('next', '/')
		login.state['redirect_uri'] = self.callback_url
