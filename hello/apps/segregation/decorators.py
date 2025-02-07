#!/usr/local/bin/python
# -*- coding: utf-8 -*-
from functools import wraps
from typing import Callable
from typing import Any
from django.db.models import F
from django.db import transaction

from articles.models import PageHit


def counted(f: Callable[[Any], Any]) -> Callable[[Any, Any], Any]:
	@wraps(f)
	def decorator(request: Any, *args: Any, **kwargs: Any) -> Any:
		with transaction.atomic():
			counter, created = PageHit.objects.get_or_create(url=request.path)
			counter.count = F('count') + 1
			counter.save()
		return f(request, *args, **kwargs)
	return decorator
