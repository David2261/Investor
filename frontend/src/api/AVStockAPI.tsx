// Alpha Vantage API for stock market prices
import axios from 'axios';


const URL = axios.create({
	baseURL: 'https://alpha-vantage.p.rapidapi.com',
	headers: {
		'content-type':'application/octet-stream',
		'x-rapidapi-host': import.meta.env.VITE_X_RapidAPI_Host_API_AV,
		'x-rapidapi-key': import.meta.env.VITE_X_RapidAPI_KeyAPI_AV,
	},
});


const Some = {
	stockMarket: (ticker: string) =>
	URL({
		'method': 'GET',
		'url': '/query',
		'params': {
			'outputsize':'compact',
			'datatype':'json',
			'function': 'TIME_SERIES_DAILY',
			'symbol': ticker.toUpperCase()
		},
		transformResponse: [function (data) {
			// Делайте все, что вы хотите, чтобы преобразовать данные
			console.log('Transforming data...')

			const json = JSON.parse(data)

			const dates = Object.keys(json['Time Series (Daily)']).reverse()

			// Создайте ответные данные для ввода диаграммы
			const closePrices = dates.map(date => date = {
				date,
				close: Number(json['Time Series (Daily)'][date]['4. close'])
			})

			const symbol = json['Meta Data']['2. Symbol']
			const refreshed = json['Meta Data']['3. Last Refreshed']

			data = {
				symbol,
				refreshed,
				closePrices
			}

			return data;
		}],
	}),
}

export default Some;