import { Component, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import Swal from 'sweetalert2'
import axios from 'axios';


const SubrcibeContent = () => {
	return (
		<>
		<h1 className='text-3xl font-bold py-4'>Данные подписки</h1>
		<p className='text-xl font-bold pb-4'>У вас нет активной платной подписки</p>
		<div>
			<button className='py-2 px-3 uppercase font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition duration-300' onClick={() => Swal.fire({
					title: "Функция оформления подписки на данный момент не доступна, появиться в скором времени...",
					showClass: {
						popup: `
						animate__animated
						animate__fadeInUp
						animate__faster
						`
					},
					hideClass: {
						popup: `
						animate__animated
						animate__fadeOutDown
						animate__faster
						`
					}
					})
				}>оформить подписки</button>
		</div>
		</>
	);
};

const SettingsContent = () => {
	return (
		<>
		<h1 className='text-3xl font-bold py-4'>Данные для входа</h1>
		<p className='text-xl font-light pb-4'>Email: <UserAPI /></p>
		<div>
			<button className='py-2 px-3 uppercase font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition duration-300' onClick={() => Swal.fire({
					title: "Функция изменения пароля на данный момент не доступна, появиться в скором времени...",
					showClass: {
						popup: `
						animate__animated
						animate__fadeInUp
						animate__faster
						`
					},
					hideClass: {
						popup: `
						animate__animated
						animate__fadeOutDown
						animate__faster
						`
					}
					})
				}>Поменять пароль</button>
		</div>
		</>
	);
};

interface UserAPIType {
	data: {
		user: string,
		email: string
	}[]
}

interface State {
	data: [];
	loaded: boolean;
	placeholder: string;
}

class UserAPI extends Component<{}, State> {
	constructor(props: UserAPIType) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			placeholder: "Loading"
		}
	}
	
	async componentDidMount() {
		await axios.get("http://127.0.0.1:8000/api/v1/user/data/")
		.then(response => {
			if (response.status > 400) {
				return this.setState(() => {
					return { placeholder: "Something went wrong!" };
				});
			}
			return (response.data as any);
		})
		.then(data => {
			this.setState(() => {
				return {
					data,
					loaded: true
				};
			});
		});
	}

	render() {
		return <>{this.state.data}</>
	}
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
		from: { opacity: 0 },
		enter: { opacity: 1 },
	});

	return (
		<>
		<div className="w-full h-full">
			<div className="flex w-full px-4 md:px-24 mt-10 mb-10">
			<div className='w-full flex flex-col border rounded-lg bg-slate-100 pt-10 pb-10 px-4 md:px-24'>
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
						className={btnOption ? stylesBtnOn : stylesBtnOff}
						style={style}
					>
						{'подписка'}
					</animated.button>
					))}
					{transition((style) => (
					<animated.button
						onClick={() => setBtnOption(changeBtn)}
						className={!btnOption ? stylesBtnOn : stylesBtnOff}
						style={style}
					>
						{'данные для входа'}
					</animated.button>
					))}
				</div>
				</div>
				<div className="flex justify-center">
				<div className='flex flex-col'>
					{btnOption ? <SubrcibeContent /> : <SettingsContent />}
				</div>
				</div>
			</div>
			</div>
		</div>
		</>
	);
};

export default Portfolio;