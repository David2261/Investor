import datetime
from django.db import models
from django.core import serializers
from django.utils import timezone


"""
CATEGORY = {
	('1', 'Нужна помощь в финансовой грамотносте'),
	('2', 'Давай выпьем кофе'),
	('3', 'У меня есть личный вопрос'),
	('4', 'Есть ошибка на сайте')
}

class FeedBack(models.Model):
	name = models.CharField('Имя', max_length = 120)
	email = models.EmailField('Email', max_length = 120, blank=True, null=True)
	category = models.IntegerField(blank=True, null=True, choices=CATEGORY, default='0')
	description = models.CharField('Текст', max_length = 1500, blank=True, null=True)
	pub_date = models.DateTimeField('Время', auto_now_add = True)

	def __str__(self):
		return self.name

	class Meta(object):
		verbose_name = "Форма обратной связи"
		verbose_name_plural = "Формы обратной связи"
		ordering = ["-id"]
		
"""