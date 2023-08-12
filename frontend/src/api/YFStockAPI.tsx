// Yahoo Finance API for stock market prices
import axios from 'axios';


const URL = axios.create({
	baseURL: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_X_RapidAPI_KeyAPI_YF,
		'X-RapidAPI-Host': import.meta.env.VITE_X_RapidAPI_Host_API_YF
	},
});


export default {
	YFStockMarket: (ticker) =>
	URL({
		'method': 'GET',
		'params': {
			'region': 'US',
			'symbols': ticker.toUpperCase()
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
