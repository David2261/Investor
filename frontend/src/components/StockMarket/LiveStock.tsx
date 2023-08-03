import { useState } from 'react';
import api from '/src/api/AVStockAPI.tsx';


interface IndexMarketProps {
	ticker: string;
	percent: string; 
}

const IndexMarket: React.FC = ({ticker, percent}): IndexMarketProps => {
	return <div className="px-4 bg-white text-black hover:text-white hover:bg-zinc-950 rounded-md py-2">
		<p className=" font-bold">{ticker} {percent}%</p>
	</div>
};

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
		<div className="hiden md:flex w-full ml-4 py-4 items-center border-b-2 border-stone-200">
			<div className="flex flex-col justify-between items-center w-auto">
				<div><p className="uppercase text-gray-400 font-bold">us markets open in:</p></div>
				<div><p className="text-gray-400 font-bold">TIMER</p></div>
				<div><p className="text-gray-600 font-light">In the news</p></div>
			</div>
			<div className="flex flex-row">
				<IndexMarket ticker="Dow Jones" percent="2.23" />
				<IndexMarket ticker="Nasdaq" percent="0.12" />
				<IndexMarket ticker="S&P 500" percent="0.43" />
				<IndexMarket ticker="META" percent="0.73" />
				<IndexMarket ticker="TSLA" percent="1.1" />
				<IndexMarket ticker="BABA" percent="1.5" />
			</div>
		</div>
	)
}
