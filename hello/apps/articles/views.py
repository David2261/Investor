from django.contrib.auth import authenticate, login
from django.views import View
from django.shortcuts import render, redirect

from user.forms import UserCreationForm


class Register(View):
	template_name = 'registration/register.html'

	def get(self, request):
		context = {
			'form'; UserCreationForm()
		}
		return render(request, self.template_name, context)

	def post(self, request):
		form = UserCreationForm(request.POST)

		if form.is_valid():
			form.save()
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			user = authenticate(username=username, password=password)
			login(request, user)
			return redirect('home')
		context = {
			'form': form
		}
		return render(request, self.template_name, context)


class LogoutView(View):
	pass


class PasswordChangeView(View):
	pass


class PasswordChangeDoneView(View):
	pass


class PasswordResetView(View):
	pass


class PasswordResetConfirmView(View):
	pass


class PasswordResetCompleteView(View):
	pass


class BlogView(ListView):
	model = Blog
	template_name = "blog.html"


def article(request):
	pass

def section(request):
	pass

def commumity(request):
	pass
