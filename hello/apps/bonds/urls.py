from django.urls import path

from .views import (
	BondDetail,
	BondsList,
	BondsListOld,
	GenerateCSV,
	UploadCSV)


app_name = 'bonds'
urlpatterns = [
	path('bond/all/', BondsList.as_view(), name='bond-list'),
	path('bond/all/old', BondsListOld.as_view(), name='bond-list-old'),
	path(
		'bond/<slug:bond_slug>/',
		BondDetail.as_view(),
		name='bond-detail'
	),
	path('generate/csv/', GenerateCSV.as_view(), name='db-list'),
	path('upload_csv/', UploadCSV.as_view(), name='upload_csv'),
]
