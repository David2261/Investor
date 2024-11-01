from celery import shared_task
from .models import Bonds


@shared_task
def update_expired_bonds_task():
	Bonds.update_expired_bonds()
