from django.shortcuts import render

# Create your views here.

class BlogView(TemplateView):
	template_name = "about.html"

