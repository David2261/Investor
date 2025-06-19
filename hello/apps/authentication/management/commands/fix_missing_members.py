from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from authentication.models import Member


class Command(BaseCommand):
	help = 'Создаёт недостающие объекты Member для всех пользователей'

	def handle(self, *args, **options):
		User = get_user_model()
		created_count = 0
		existing_count = 0

		for user in User.objects.all():
			member, created = Member.objects.get_or_create(user=user)
			if created:
				created_count += 1
				self.stdout.write(self.style.SUCCESS(f"Создан Member для: {user.email}"))
			else:
				existing_count += 1

		self.stdout.write(self.style.SUCCESS(
			f"Готово. Создано: {created_count}, уже существовало: {existing_count}"))
