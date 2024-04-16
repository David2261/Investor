import { useEffect, useRef, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import '../../styles/pages/personal/Portfolio.css';

const AlertSubscribe = () => {
	const toast = useRef(null);
	const closeIcon = useRef(null);
	const progress = useRef(null);
	const timer1, timer2;
	toast.classList.add("active");
	progress.classList.add("active");

	timer1 = setTimeout(() => {
		toast.classList.remove("active");
		}, 5000);
	timer2 = setTimeout(() => {
		progress.classList.remove("active");
		}, 5300);
	
	useEffect(() => {
		closeIcon.addEventListener("click", () => {
			toast.classList.remove("active");
		
			setTimeout(() => {
				progress.classList.remove("active");
			}, 300);
		
			clearTimeout(timer1);
			clearTimeout(timer2);
		});
	})
	return <>
	<div ref={toast} className="toast active">
		<div className="toast-content">
			<i className="fas fa-solid fa-check check"></i>

			<div className="message">
			<span className="text text-1">Success</span>
			<span className="text text-2">Your changes has been saved</span>
			</div>
		</div>
		<i ref={closeIcon} className="fa-solid fa-xmark close"></i>

		<div ref={progress} className="progress active"></div>
	</div>
	</>
}

const SubrcibeContent = () => {
	return <>
	<h1 className='text-3xl font-bold py-4'>Данные подписки</h1>
	<p className='text-xl font-bold pb-4'>У вас нет активной платной подписки</p>
	<div>
		<button className='py-2 px-3 uppercase font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition duration-300' onClick={()=>AlertSubscribe()}>оформить подписки</button>
	</div>
	</>
}

const SettingsContent = () => {
	return <>
	<h1 className='text-3xl font-bold py-4'>Данные для входа</h1>
	<p className='text-xl font-light pb-4'>Email: example@gmail.com</p>
	<div>
		<button className='py-2 px-3 uppercase font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition duration-300'>Поменять пароль</button>
	</div>
	</>
}

interface PortfolioState {
	btnOption: boolean;
}


const Portfolio = () => {
	const [btnOption, setBtnOption] = useState<PortfolioState['btnOption']>(true);
	const changeBtn = (prevOption: boolean) => !prevOption;
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
							{transition((style) => (
								<animated.button
								onClick={() => setBtnOption(changeBtn)}
								className={btnOption? stylesBtnOn : stylesBtnOff}
								style={style}
								>
								{'подписка'}
								</animated.button>
							))}
							{transition((style) => (
								<animated.button
								onClick={() => setBtnOption(changeBtn)}
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
							{btnOption? <SubrcibeContent /> : <SettingsContent />}
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
}

export default Portfolio;