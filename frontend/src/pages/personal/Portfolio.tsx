import React, {useState} from 'react';
import { useTransition, animated } from '@react-spring/web';

const Portfolio = () => {
	let [btnOption, setBtnOption] = useState(true);
	const changeBtnOn = () => setBtnOption(btnOption = false);
	const changeBtnOff = () => setBtnOption(btnOption = true);
	const stylesBtnOn = 'py-2 px-3 uppercase my-1 ml-1 font-bold text-lg bg-white rounded-lg';
	const stylesBtnOff = 'py-2 px-3 uppercase font-light text-lg';
	const transition = useTransition(btnOption, {
		from: {opacity: 0},
		enter: {opacity: 1},
	});
	return <>
		<div className="w-full h-full">
			<div className="flex w-full px-24 mt-10 mb-10">
				<div className='w-full flex flex-col border rounded-lg bg-slate-100 pt-10 pb-10 px-24'>
					<div className='flex flex-row justify-center mb-10'>
						<h1 className="font-bold text-3xl px-4">Аккаунт</h1>
						<p className='uppercase text-lg font-light bg-cyan-100 rounded-lg'>free</p>
					</div>
					{/* Options subscribe and settings for login */}
					<div className='flex justify-center'>
						<div className='flex flex-row bg-slate-300 rounded-lg'>
							{/* <button onClick={() => changeBtnOff()} className={btnOption ? stylesBtnOn : stylesBtnOff}>подписка</button>
							<button onClick={() => changeBtnOn()} className={!btnOption ? stylesBtnOn : stylesBtnOff}>данные для входа</button> */}
							{transition((style, item) => (
								<animated.button
								onClick={() => changeBtnOff()}
								className={btnOption? stylesBtnOn : stylesBtnOff}
								style={style}
								>
								{'подписка'}
								</animated.button>
							))}
							{transition((style, item) => (
								<animated.button
								onClick={() => changeBtnOn()}
								className={!btnOption? stylesBtnOn : stylesBtnOff}
								style={style}
								>
								{'данные для входа'}
								</animated.button>
							))}
						</div>
					</div>
					<div className="flex justify-center">
						<div className='flex flex-col'>
							<h1 className='text-3xl font-bold py-4'>Данные подписки</h1>
							<p className='text-xl font-bold pb-4'>У вас нет активной платной подписки</p>
							<div>
								<button className='py-2 px-3 uppercase font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition duration-300'>оформить подписки</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
}

export default Portfolio;