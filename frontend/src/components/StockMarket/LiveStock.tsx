import { useState } from 'react';
import api from '/src/api/AVStockAPI.tsx';
import apiYF from '/src/api/YFStockAPI.tsx';


interface IndexMarketProps {
	ticker: string;
	percent: string; 
}

const IndexMarket: React.FC = ({ticker, percent}): IndexMarketProps => {

	const redBg = 'text-red-600';
	const greenBg = 'text-green-600';
	const graphUp = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /> </svg>;
	const graphDown = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" /> </svg>;
	return <div className="bg-white text-black hover:text-white hover:bg-zinc-950 rounded-md py-2">
		<div className="flex flex-row font-bold gap-2 text-sm">
			<p className={`${(0 < percent) ? greenBg : redBg}`}>{(0 < percent) ? graphUp : graphDown}</p>{ticker}<p className={`${(0 < percent) ? greenBg : redBg}`}>{percent}%</p>
		</div>
	</div>
};

export default function LiveStock() {
	let [responseData, setResponseData] = useState('')
	let [message, setMessage] = useState('')
    let [ticker, setTicker] = useState('')

    // const fetchData = (name: string) => {
    // 	setMessage('Loading...')
    // 	api.stockMarket(name)
    // 	.then((response) => {
    // 		setResponseData(response.data)
    // 		setMessage('')
    // 	})
    // 	.catch((error) => {
    // 		setMessage('None')
    // 		console.log(error)
    // 	})
    // }
    const fetchData = (name: string) => {
    	setMessage('Loading...')
    	apiYF.YFStockMarket(name)
    	.then((response) => {
    		setResponseData(response.data)
    		setMessage('')
    	})
    	.catch((error) => {
    		setMessage('None')
    		console.log(error)
    	})
    }

	return (
		<div className="relative flex-col w-full py-4 items-center border-b-2 border-stone-200 px-6">
			<div className="ml-4 flex flex-row items-center w-auto">
				<div className="px-2"><p className="uppercase text-gray-400 font-bold">us markets open in:</p></div>
				<div><p className="text-gray-400 font-bold">TIMER</p></div>
			</div>
			<div className="flex flex-nowrap h-12">
				{/*<IndexMarket ticker="Dow Jones" percent={`${fetchData('meta') ? responseData.refreshed : ''}`} />*/}
				<IndexMarket ticker="Dow Jones" percent="1.09" />
				<IndexMarket ticker="Nasdaq" percent="-0.12" />
				<IndexMarket ticker="S&P 500" percent="0.43" />
				<IndexMarket ticker="META" percent="-0.73" />
				<IndexMarket ticker="TSLA" percent="1.1" />
				<IndexMarket ticker="BABA" percent="1.5" />
			</div>
		</div>
	)
}
