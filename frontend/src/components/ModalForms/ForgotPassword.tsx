import React, { useState, useContext } from 'react';
import { animated, useSpring } from '@react-spring/web';
// Entities
import AuthContext from '../../entities/context/AuthContext';
// Assets
import IH from '../../assets/logo/IH.webp';
// Styles
import '../../styles/components/ModalForms/ForgotPassword.css';

interface ForgotPasswordProps {
	setIsOpen: () => void,
	setIsForgotPassword: () => void
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setIsOpen, setIsForgotPassword }) => {
	const { resetPassword } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [error, setError] = useState<string | null>(null);

	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	
	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!emailPattern.test(email)) {
			setError("Пожалуйста, введите правильный адрес электронной почты.");
			return;
		}

		setError(null);
		await resetPassword(email);
		setIsOpen();
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
				<button onClick={setIsOpen} className="fixed top-16 right-8">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-32 h-32">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				{error && <div className="error">{error}</div>}
				<div className="email">
					<label htmlFor="email-input">Email адрес</label>
					<div className="sec-2">
						<input
							id='email-input'
							type="email"
							name="email"
							placeholder="Example@gmail.com"
							autoComplete="email"
							value={email}
							onChange={onInputChange} />
					</div>
				</div>
				<button className="forgot-password" type='submit'>Сбросить пароль</button>
				<div className="footer">
                    <span className='pr-2'>У вас уже есть аккаунт? 
					<span onClick={() => { setIsForgotPassword(); setIsOpen(); }}>Вход</span>
					</span>
				</div>
			</div>
			</form>
		</animated.div>
	</div>
    </>
}

export default ForgotPassword;