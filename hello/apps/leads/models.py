from django.db import models

class Lead(models.Model):
    name = models.CharField('Имя клиента', max_length=100)
    email = models.EmailField('Email клиента')
    message = models.CharField('Текст комментария', max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)