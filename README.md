<p><a target="_blank" href="https://app.eraser.io/workspace/zRIHtZPvAIwJaddZIRaJ" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# InvestorSite
## Tools
- 📋 Languages:
    -  
- 📚 Frameworks, Platforms and Libraries:
    -     
- 💾 Data Base:
    -  
- 💻 IDEs/Editors:
    - 
## Description
_I have written a website where an investor and a trader can: read the latest news related to finance, share their impressions about the state of the market and see the comments of other market participants_

## Topics
```
- Investing
- Trading
- News
- Comments
```
## Getting Started
- Virtual environment
    - pip install virtualenv
- Activate
    - venv\Scripts\activate
- Install tools
    - pip install -r requirements
- Run django server
    1. python manage.py makemigrations
    2. python manage.py migrate
    3. python manage.py runserver
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
```




<!--- Eraser file: https://app.eraser.io/workspace/zRIHtZPvAIwJaddZIRaJ --->