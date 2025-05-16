
interface DateFormatInput {
	date: string;
}

function formatDate({date}: DateFormatInput): string {
	const dateObj = new Date(date);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
		timeZone: 'Europe/Moscow'
	};

	return dateObj.toLocaleString('ru-RU', options);
}

export default formatDate;