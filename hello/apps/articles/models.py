import datetime
from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from django.core import serializers
from tinymce.models import HTMLField

class Genre(models.Model):
    name = models.CharField(max_length=256, verbose_name='Категория', \
     help_text="Enter a article genre (e.g. learn, idea, motivation, gallery)")

    def __str__(self):
        return self.name

class Idea(models.Model):
	idea_title = models.CharField('Название идеи', max_length = 120)
	idea_text = HTMLField('Текст идеи')
	idea_genre = models.ManyToManyField(Genre, help_text="Select a genre for this article")
	idea_views = models.IntegerField('Просмотры', default=0)
	idea_image = models.ImageField(null = True, blank=True, upload_to='Idea', help_text='150x150px', verbose_name='Изображение')
	idea_pub_date = models.DateTimeField('Дата публикации', auto_now_add = True)
	content = HTMLField(null=True)

	def display_genre(self):
		return ', '.join([ idea_genre.name for idea_genre in self.idea_genre.all()[:3] ])
		display_genre.short_description = 'Genre'

	def __str__(self):
		return self.idea_title

	def was_published_recently(self):
		return self.idea_pub_date >= (timezone.now() - datetime.timedelta(days = 7))
	    
	class Meta:
				verbose_name = 'Идея'
				verbose_name_plural = 'Идеи'
				ordering = ["-id", "-idea_pub_date"]


class IdeaComment(models.Model):
	article_idea = models.ForeignKey(Idea, on_delete = models.CASCADE)
	author_name_idea = models.CharField('Имя автора', max_length = 50)
	comment_text_idea = models.CharField('Текст комментария', max_length = 200)
	pub_date_idea = models.DateTimeField('Дата написании', auto_now_add = True)

	class Meta:
			verbose_name = 'Комментарий'
			verbose_name_plural = 'Комментарии'
			ordering = ["-id", "-pub_date_idea"]

	def __str__(self):
		return self.author_name_idea


class Motiv(models.Model):
	motiv_title = models.CharField('Название идеи', max_length = 120)
	motiv_text = HTMLField('Текст идеи')
	motiv_genre = models.ManyToManyField(Genre, help_text="Select a genre for this article")
	motiv_views = models.IntegerField('Просмотры', default=0)
	motiv_image = models.ImageField(null = True, blank=True, upload_to='Motiv', help_text='150x150px', verbose_name='Изображение')
	motiv_pub_date = models.DateTimeField('Дата публикации', auto_now_add = True)

	def display_genre(self):
		return ', '.join([ motiv_genre.name for motiv_genre in self.motiv_genre.all()[:3] ])
		display_genre.short_description = 'Genre'

	def __str__(self):
		return self.motiv_title

	def was_published_recently(self):
		return self.motiv_pub_date >= (timezone.now() - datetime.timedelta(days = 7))
	    
	class Meta:
				verbose_name = 'Мотивация'
				verbose_name_plural = 'Мотивации'
				ordering = ["-id", "-motiv_pub_date"]


class MotivComment(models.Model):
	article_motiv = models.ForeignKey(Motiv, on_delete = models.CASCADE)
	author_name_motiv = models.CharField('Имя автора', max_length = 50)
	comment_text_motiv = models.CharField('Текст комментария', max_length = 200)
	pub_date_motiv = models.DateTimeField('Дата написании', auto_now_add = True)

	class Meta:
			verbose_name = 'Комментарий'
			verbose_name_plural = 'Комментарии'
			ordering = ["-id", "-pub_date_motiv"]

	def __str__(self):
		return self.author_name_motiv

class Learn(models.Model):
	learn_title = models.CharField('Название идеи', max_length = 120)
	learn_text = HTMLField('Текст идеи')
	learn_genre = models.ManyToManyField(Genre, help_text="Select a genre for this article")
	learn_views = models.IntegerField('Просмотры', default=0)
	learn_image = models.ImageField(null = True, blank=True, upload_to='Learn', help_text='150x150px', verbose_name='Изображение')
	learn_pub_date = models.DateTimeField('Дата публикации', auto_now_add = True)

	def display_genre(self):
		return ', '.join([ learn_genre.name for learn_genre in self.learn_genre.all()[:3] ])
		display_genre.short_description = 'Genre'

	def __str__(self):
		return self.learn_title

	def was_published_recently(self):
		return self.learn_pub_date >= (timezone.now() - datetime.timedelta(days = 7))
	    
	class Meta:
				verbose_name = 'Обучение'
				verbose_name_plural = 'Обучении'
				ordering = ["-id", "-learn_pub_date"]


class LearnComment(models.Model):
	article_learn = models.ForeignKey(Learn, on_delete = models.CASCADE)
	author_name_learn = models.CharField('Имя автора', max_length = 50)
	comment_text_learn = models.CharField('Текст комментария', max_length = 200)
	pub_date_learn = models.DateTimeField('Дата написании', auto_now_add = True)

	class Meta:
			verbose_name = 'Комментарий'
			verbose_name_plural = 'Комментарии'
			ordering = ["-id", "-pub_date_learn"]

	def __str__(self):
		return self.author_name_learn