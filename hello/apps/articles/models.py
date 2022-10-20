from django.db import models
from django.urls import reverse


STATUS_CHOICES = (
   ('draft', 'Draft'),
   ('published', 'Published'),
)


class Category(models.Model):
	name = models.CharField(verbose_name = "Категория", max_length = 255)
	slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')

	def __str__(self):
		return self.name

	def get_absolute_url(self):
		return reverse("category", kwargs={'cat_slug': self.slug})

	class Meta:
		verbose_name = 'Категория'
		verbose_name_plural = 'Категории'
		ordering = ('id', 'name')


class Articles(models.Model):
	title = models.CharField(verbose_name = "Заголовок статьи", help_text = "Название статьи", max_length = 255, null = False, blank = False, primary_key = True)
	description = models.TextField(verbose_name = "Текст статьи", null = False, blank = False)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	img = models.ImageField(upload_to='Articles/% Y/% m/% d/', verbose_name="Изображение", height_field=None, width_field=None, max_length=100)
	time_create = models.DateTimeField(auto_now_add=True, verbose_name="Время создания")
	time_update = models.DateTimeField(auto_now=True, verbose_name="Время изменения")
	is_published = models.BooleanField(default=True, verbose_name="Публикация")
	slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')

	def get_absolute_url(self):
		return reverse("post", kwargs={'post_slug': self.slug})

	def __str__(self):
		return self.title

	class Meta:
		verbose_name = "Статья"
		verbose_name_plural= "Статьи"
		ordering = ('-time_update', '-time_create')
