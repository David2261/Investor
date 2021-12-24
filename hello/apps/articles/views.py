from . models  import *
from django.urls import reverse
from django.template import RequestContext
from django.shortcuts import render, redirect
from django.http import Http404, HttpResponseRedirect, HttpResponseNotFound

#  'exception/404.html'

def pageNotFound(request):
    return render(request, "exception/404.html")


def index(request):
	return HttpResponseRedirect("home")


def help(request):
	return render(request, "articles/help.html")


def setting(request):
	return render(request, "articles/setting.html")


def home(request):
	learn = Learn.objects.filter(id=1)
	return render(request, "articles/home.html", {'learn':learn})


def home_checklist(request, learn_id, idea_id, motiv_id):
	return HttpResponseRedirect("learn_checklist")


def idea(request):
	idea = Idea.objects.order_by('-idea_pub_date')
	return render(request, "post/idea.html", {'idea':idea})


# Открывает отдельную страницу статьи по id
def idea_checklist(request, idea_id):
	try:
		idea_cl = Idea.objects.get(id = idea_id)
		idea_cl.idea_views=idea_cl.idea_views+1
		idea_cl.idea_views.save()
		return render(request, 'list.html', {'idea':idea_cl})
	except:
		return redirect("pageNotFound")


def learn(request):
	learn = Learn.objects.order_by('-learn_pub_date')
	return render(request, "post/learn.html", {'learn':learn})


# Открывает отдельную страницу статьи по id
def learn_checklist(request, learn_id):
	try:
		learn_cl = Learn.objects.get(id = learn_id)
		learn_cl.learn_views=learn_cl.learn_views+1
		learn_cl.learn_views.save()
		return render(request, 'list.html', {'learn_cl':learn_cl})
	except:
		return redirect("pageNotFound")
	


def motiv(request):
	m = Motiv.objects.order_by('-motiv_pub_date')
	return render(request, "post/motiv.html", {'m':m})


# Открывает отдельную страницу статьи по id
def motiv_checklist(request, motiv_id):
	try:
		motiv_cl = Motiv.objects.get(id = motiv_id)
		motiv_cl.motiv_views=motiv_cl.motiv_views+1
		motiv_cl.motiv_views.save()
		return render(request, 'list.html', {'motiv':motiv_cl})
	except:
		return redirect("pageNotFound")
