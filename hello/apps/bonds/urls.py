from django.urls import path

from .views import BondDetail, BondsList, generate_csv


app_name = 'bonds'
urlpatterns = [
	path('bond/all/', BondsList.as_view(), name='bond-list'),
	path('bond/<slug:bond_slug>/', BondDetail, name='bond-detail'),
    path('generate/csv/', generate_csv, name='db-list'),
]
