from django.db import models



STATUS_CHOICES = (
   ('draft', 'Draft'),
   ('published', 'Published'),
)


class Category(models.Model):
	name = models.CharField(verbose_name = "Категория", max_length = 255)
	slug = models.SlugField(max_length = 255, null = True, blank = True)


class Articles(models.Model):
	title = models.CharField(
		verbose_name = "Заголовок статьи",
		help_text = "Название статьи",
		max_length = 255,
		null = False,
		blank = False,
		primary_key = True)
	description = models.TextField(verbose_name = "Текст статьи", null = False, blank = False)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	img = models.ImageField(upload_to='Articles/% Y/% m/% d/', verbose_name="Изображение", height_field=None, width_field=None, max_length=100)
	published_at = models.DateTimeField(verbose_name = "Публикация статьи", auto_now_add = True)
	updated = models.DateTimeField(verbose_name = "Обновление статьи", auto_now = True, editable = False)
	slug = models.SlugField(max_length = 255, null = True, blank = True)

	status = models.CharField(
		max_length = 10,
		choices = STATUS_CHOICES,
		default ='draft')

	class Meta:
		ordering = ('-published_at', )

	def __str__(self):
		return self.title



