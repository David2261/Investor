#!/usr/local/bin/python
# -*- coding: utf-8 -*-
from functools import wraps
from django.db.models import F
from django.db import transaction

from articles.models import PageHit  # type: ignore


def counted(f):
	@wraps(f)
	def decorator(self, request, *args, **kwargs):
		with transaction.atomic():
			counter, created = PageHit.objects.get_or_create(url=request.path)
			counter.count = F('count') + 1
			counter.save()
		return f(self, request, *args, **kwargs)
	return decorator
