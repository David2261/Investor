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
            subject = form.cleaned_data['name']
            from_email = form.cleaned_data['email']
            message = form.cleaned_data['description']
            try:
                send_mail('testEmail', 'hi', 'bulatnasirov2003@gmail.com', ['admiralgeneral2003@gmail.com'])
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return redirect(SuccessView)
    return render(request, "chat/comment.html", {'form': form})

""" Письмо отправляется, но не приходит
Content-Type: text/plain; charset="utf-8"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Subject: Bulat
From: bulatnasirov2003@gmail.com
To: eagle2020eye@yahoo.com
Date: Thu, 03 Jun 2021 18:22:45 -0000
Message-ID: <162274456528.1324.2035203425276094278@Lenovo-PC>"""

# Выходит ошибка django.urls.exceptions.NoReverseMatch: Reverse for 'chat.views.SuccessView' not found.
#'chat.views.SuccessView' is not a valid view function or pattern name.
# "POST /home/comment/ HTTP/1.1" 500 89420

def SuccessView(request):
    return HttpResponseRedirect(contact)