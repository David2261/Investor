from django import forms


CATEGORY = {
	('1', 'Нужна помощь в финансовой грамотносте'),
	('2', 'Давай выпьем кофе'),
	('3', 'У меня есть личный вопрос'),
	('4', 'Есть ошибка на сайте')
}


class FeedBackForm(forms.Form):
	name = forms.CharField(label="Имя пользователя", max_length=150, required=True)
	email = forms.EmailField(label="email", required=True)
	description = forms.CharField(label="Текст", widget=forms.Textarea, required=True)
	category = forms.ChoiceField(label="Категория", choices=CATEGORY, required=True)

# Нужно сделать блок для отправки писем на почту