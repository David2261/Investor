from django.urls import path
from . import views

app_name = 'leads'
urlpatterns = [
    path('api/lead/', views.LeadListCreate.as_view() ),
]