from django.shortcuts import render, redirect
from django.http import Http404, HttpResponseRedirect
from django.urls import reverse
from django.template import RequestContext
from . models  import *

def handler404(request, *args, **argt):
	return redirect(request, 'exception/404.html')

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

def idea_checklist(request, idea_id):
	idea_cl = Idea.objects.get(id = idea_id)
	Idea.objects.filter(pk=idea_cl.pk).update(idea_views=F('idea_views') + 1)
	idea_cl.idea_views += 1 # to show valid counter in the template
	return render(request, 'list.html', {'idea':idea_cl})

def gallery(request):
	g = Gallery.objects.order_by('-gallery_pub_date')
	return render(request, "post/gallery.html", {'gallery':g})

def gallery_checklist(request, gallery_id):
	try:
		gallery_cl = Gallery.objects.get(id = gallery_id)
		Gallery.objects.filter(pk=idea_cl.pk).update(gallery_views=F('gallery_views') + 1)
		idea_cl.gallery_views += 1 # to show valid counter in the template
	except:
		raise Http404("Статья не найдена!!!")
	return render(request, 'list.html', {'gallery':gallery_cl})

def learn(request):
	learn = Learn.objects.order_by('-learn_pub_date')
	return render(request, "post/learn.html", {'learn':learn})

def learn_checklist(request, learn_id):
	try:
		learn_cl = Learn.objects.get(id = learn_id)
	except:
		raise Http404("Статья не найдена!!!")
	return render(request, 'list.html', {'learn_cl':learn_cl})

def motiv(request):
	m = Motiv.objects.order_by('-motiv_pub_date')
	return render(request, "post/motiv.html", {'m':m})

def motiv_checklist(request, motiv_id):
	try:
		motiv_cl = Motiv.objects.get(id = motiv_id)
		Motiv.objects.filter(pk=motiv_cl.pk).update(motiv_views=F('motiv_views') + 1)
		motiv_cl.motiv_views += 1 # to show valid counter in the template
	except:
		raise Http404("Статья не найдена!!!")
	return render(request, 'list.html', {'motiv':motiv_cl})