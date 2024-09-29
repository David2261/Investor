import React, { useState, useContext } from 'react';
import { animated, useSpring } from '@react-spring/web';
// Entities
import AuthContext from '../../entities/context/AuthContext';
// Assets
import IH from '../../assets/logo/IH.webp';
// Styles
import '../../styles/components/ModalForms/ForgotPassword.css';

type ForgotPasswordProps = {
	setIsOpen: () => void;
	setIsForgotPassword: () => void;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
	// const { forgot } = useContext(AuthContext);
	const [form, setForm] = useState({ email: "" });
	
	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value, name },
		} = event;
		setForm(prevForm => ({ ...prevForm, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// loginUser(e)
		props.setIsOpen()
	};

	const styles = useSpring({
		from: {
			opacity: 0,
			delay: 50,
		},
		to: {
			opacity: 1,
			delay: 50,
		},
	});
    return <>
    <div className="fixed z-10 w-full h-full backdrop-blur-sm bg-white/30 h-12">
		<animated.div className='screen' style={styles}>
			<form onSubmit={handleSubmit}>
			<div className="screen-1">
			<img className='logo' alt="logo" src={IH} />
				<button onClick={props.setIsOpen} className="fixed top-16 right-8">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-32 h-32">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<div className="email">
					<label htmlFor="email-input">Email адрес</label>
					<div className="sec-2">
						<input
							id='email-input'
							type="email"
							name="email"
							placeholder="Example@gmail.com"
							autoComplete="email"
							value={form.email}
							onChange={onInputChange} />
					</div>
				</div>
				<button className="forgot-password" type='submit'>Сбросить пароль</button>
				<div className="footer">
                    У вас уже есть аккаунт? 
					<span onClick={() => {props.setIsForgotPassword(); props.setIsOpen()}}>Вход</span>
				</div>
			</div>
			</form>
		</animated.div>
	</div>
    </>
}

export default ForgotPassword;