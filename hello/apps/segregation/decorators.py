#!/usr/local/bin/python
# -*- coding: utf-8 -*-
from functools import wraps
from typing import Callable
from typing import Any
from django.db.models import F
from django.db import transaction

from articles.models import PageHit


def counted(f: Callable[[Any], Any]) -> Callable[[Any, Any], Any]:
	"""
	Декоратор для подсчета количества посещений страницы.
	Этот декоратор увеличивает счетчик посещений для URL, 
	переданного в запросе, и сохраняет его в базе данных.
	"""
	@wraps(f)
	def decorator(self, request: Any, *args: Any, **kwargs: Any) -> Any:
		with transaction.atomic():
			counter, created = PageHit.objects.get_or_create(url=request.path)
			counter.count = F('count') + 1
			counter.save()
		return f(self, request, *args, **kwargs)
	return decorator
