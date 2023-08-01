import { useState } from 'react';
import api from '/src/api/AVStockAPI.tsx';


export default function LiveStock() {
	let [responseData, setResponseData] = useState('');
	let [ticker, setTicker] = useState('');
    let [message, setMessage] = useState('');

	const fetchData = (e) => {
        e.preventDefault()

        setMessage('Loading...')

        api.stockMarket(ticker)
        .then((response)=>{
            setResponseData(response.data)
            setMessage('')
            console.log(response)
        })
        .catch((error) => {
            setMessage('Error')
            console.log(error)
        })
    }

	return (
		<div className="flex w-full">
			<form onSubmit={fetchData}>
                <fieldset>
                    <legend>Search Stock Market</legend>
                    <label htmlFor="ticker">Enter stock ticker
                        <input
                            required
                            name="ticker"
                            id="ticker"
                            type='text'
                            placeholder='SPY'
                            value={ticker}
                            onChange={(e) => setTicker(e.target.value)}
                        />
                    </label>
                    <button type='submit'>Submit</button>
                </fieldset>
            </form>
            <p>{message}</p>
            <h3>Symbol: {responseData ? responseData.symbol : ''}</h3>
            <p>Daily Time Series with Splits and Dividend Events</p>
            <small>Last Refresh: {responseData ? responseData.refreshed : ''}</small>
		</div>
	)
}
