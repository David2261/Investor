from django.contrib.auth import authenticate, login
from django.views import View
from django.shortcuts import render, redirect
from django.db.models import Count, F, Value

from .forms import UserCreationForm







