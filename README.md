# InvestorSite
[![Twitter](https://img.shields.io/twitter/url?logo=Twitter&style=social&url=https%3A%2F%2Ftwitter.com%2Fad_ge_1)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FDavid2261%2FPython_Apps.git)
[![GitHub issues](https://img.shields.io/github/issues/David2261/Investor)](https://github.com/David2261/Investor/issues)
[![GitHub license](https://img.shields.io/github/license/David2261/Investor)](https://github.com/David2261/Investor/blob/main/LICENSE)

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&width=435&lines=The+investor+site)](https://git.io/typing-svg)

## Tools
* 📋 Languages:
	- ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* 📚 Frameworks, Platforms and Libraries:
	- ![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white) ![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* 💾 Data Base:
	- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
* 💻 IDEs/Editors:
	- ![Sublime Text](https://img.shields.io/badge/sublime_text-%23575757.svg?style=for-the-badge&logo=sublime-text&logoColor=important)



## Description

*I have written a website where an investor and a trader can: read the latest news related to finance, share their impressions about the state of the market and see the comments of other market participants*

## Topics
	- Investing
	- Trading
	- News
	- Comments

## Getting Started
- Virtual environment
	- pip install virtualenv
- Activate
	- venv\Scripts\activate
- Install tools
	- pip install -r requirements
- Run django server
	1) python manage.py makemigrations
	2) python manage.py migrate
	3) python manage.py runserver
- Run Node server
```bash
cd hello/apps/frontend
npm run dev
```

## Example

```python
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
				ordering = ["-id", "-pub_date"]```
