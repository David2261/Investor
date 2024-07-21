from django.urls import path

from .views import (
	BondDetail,
	BondsList,
	GenerateCSV,
	UploadCSV,
	CategoryBondList,
    CategoryBondDetail)


app_name = 'bonds'
urlpatterns = [
	path('bond/all/', BondsList.as_view(), name='bond-list'),
	path('bond/<slug:categorybond_name>/<slug:bond_slug>/', BondDetail, name='bond-detail'),
	path('bond/category-bonds/', CategoryBondList.as_view()),
	path('bond/<slug:category_slug>/', CategoryBondDetail.as_view(), name='category-detail'),
	path('generate/csv/', GenerateCSV.as_view(), name='db-list'),
	path('upload_csv/', UploadCSV.as_view(), name='upload_csv'),
]
