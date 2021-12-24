from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .forms import FeedBackForm

def contact(request):
    if request.method == 'GET':
        form = FeedBackForm()
    else:
        form = FeedBackForm(request.POST)
        if form.is_valid():
            from_email = form.cleaned_data['email']
            category = form.cleaned_data['category']
            body = {
                'subject': form.cleaned_data['name'], 
                'email': from_email, 
                'message': form.cleaned_data['description'], 
            }
            message = "\n".join(body.values())
            try:
                send_mail(category, message, from_email,
                    ['admiralgeneral2003@gmail.com'], fail_silently=False,)
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return redirect('/home/comment/success/')
    return render(request, "chat/comment.html", {'form': form})


def success(request):
    return render(request, 'chat/success.html')