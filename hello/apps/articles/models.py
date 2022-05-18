import datetime
from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from django.core import serializers
from tinymce.models import HTMLField


# Блок по созданию Топиков для статей.
class Genre(models.Model):
    name = models.CharField(max_length=256, verbose_name='Категория', \
    	help_text="Enter a article genre (e.g. learn, idea, motivation, gallery)")

    def __str__(self):
        return self.name


# Блок для создания статей
class Article(models.Model):
	Idea = 'ID'
	Learn = 'LN'
	Motivation = 'mt'
	Blog = 'bl'

	# Переменная по созданию определенных категорий, т.е.
	# на каждой странице своя тема.
	CATEGORY = [
		(Idea, 'Idea'),
		(Learn, 'Learn'),
		(Motivation, 'Motivation'),
		(Blog, 'Blog'),
	]

	title = models.CharField('Название статьи', max_length = 120)
	text = HTMLField('Текст статьи')
	genre = models.ManyToManyField(
		Genre,
		help_text="Select a genre for this article"
	)
	category = models.CharField(
        max_length=2,
        choices=CATEGORY,
        default=Blog,
    )
	views = models.IntegerField('Просмотры', default=0)
	image = models.ImageField(
		null = True,
		blank=True,
		upload_to='Article',
		help_text='150x150px',
		verbose_name='Изображение'
	)
	pub_date = models.DateTimeField('Дата публикации', auto_now_add = True)
	content = HTMLField(null=True)

	def display_genre(self):
		return ', '.join([ genre.name for genre in self.genre.all()[:3] ])
		display_genre.short_description = 'Genre'

	def __str__(self):
		return self.title

	def was_published_recently(self):
		return self.pub_date >= (
			timezone.now() - datetime.timedelta(days = 7)
		)
	    
	class Meta:
				verbose_name = 'Статья'
				verbose_name_plural = 'Статьи'
				ordering = ["-id", "-pub_date"]


class ArticleComment(models.Model):
	article = models.ForeignKey(Article, on_delete = models.CASCADE)
	author_name = models.CharField('Имя автора', max_length = 50)
	comment_text = models.CharField('Текст комментария', max_length = 200)
	pub_date_comment = models.DateTimeField(
		'Дата написании',
		auto_now_add = True
	)

	class Meta:
			verbose_name = 'Комментарий'
			verbose_name_plural = 'Комментарии'
			ordering = ["-id", "-pub_date_comment"]

	def __str__(self):
		return self.author_name