from django.urls import path

from .views import (
	BondDetail,
	BondsList,
	BondsListOld)


app_name = 'bonds'
urlpatterns = [
	path('bond/all/', BondsList.as_view(), name='bond-list'),
	path('bond/all/old', BondsListOld.as_view(), name='bond-list-old'),
	path(
		'bond/<slug:bond_slug>/',
		BondDetail.as_view(),
		name='bond-detail'
	)
]
