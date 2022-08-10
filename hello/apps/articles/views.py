import logging
from . models  import *
from django.urls import reverse
from django.template import RequestContext
from django.shortcuts import render, redirect
from django.http import Http404, HttpResponseRedirect, HttpResponseNotFound, \
	JsonResponse

#  'exception/404.html'

logger = logging.getLogger(__name__)


def pageNotFound(request):
    return render(request, "exception/404.html")


def log_views(request):
	logger.warning('Hello, beta test!')
	return JsonResponse({'success': True})

def index(request):
	return HttpResponseRedirect("home")


def help(request):
	return render(request, "articles/help.html")


def setting(request):
	return render(request, "articles/setting.html")


def home(request):
	return render(request, "articels/home.html")


def home_checklist(request, learn_id, idea_id, motiv_id):
	pass


def idea_article(request):
	article = Article.objects.order_by('-pub_date')
	return render(request, "post/idea.html", {'idea':article})


# Открывает отдельную страницу статьи по id
def idea_checklist(request, article_id):
	try:
		idea_cl = Article.objects.get(id = article_id)
		idea_cl.idea_views=idea_cl.idea_views+1
		idea_cl.idea_views.save()
		return render(request, 'list.html', {'idea':idea_cl})
	except:
		return redirect("pageNotFound")


def learn(request):
	pass


# Открывает отдельную страницу статьи по id
def learn_checklist(request, learn_id):
	pass
	


def motiv(request):
	pass


# Открывает отдельную страницу статьи по id
def motiv_checklist(request, motiv_id):
	pass
