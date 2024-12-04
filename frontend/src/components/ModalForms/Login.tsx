import React, { useState, useContext, useEffect, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';
// Components
import ForgotPassword from './ForgotPassword';
// Entities
import AuthContext from '../../entities/context/AuthContext';
// Assets
import IH from '../../assets/logo/IH.webp';
// Styles
import '../../styles/components/ModalForms/Login.css';

interface LoginProps {
	setIsOpen: () => void,
	setIsSignUp: () => void
}

const Login: React.FC<LoginProps> = (props) => {
	const { loginUser } = useContext(AuthContext);
	const [form, setForm] = useState({ email: "", password: "" });
	const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { value, name } } = event;
		setForm(prevForm => ({ ...prevForm, [name]: value }));
	};

	const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!emailPattern.test(form.email)) {
			setError("Please enter a valid email address.");
			return;
		}

		if (form.password.length < 6) {
			setError("Password must be at least 6 characters long.");
			return;
		}

		setError(null);
		loginUser({ 
			email: form.email,
			password: form.password 
		});
		props.setIsOpen();
	}, [form, loginUser, props]);

	const closeForgotPassword = () => setIsForgotPassword(false);
	const openForgotPassword = () => setIsForgotPassword(true);

	const handleSignUpClick = () => {
		props.setIsOpen();
		props.setIsSignUp();
	};
	const handleForgotPasswordClick = () => {
		openForgotPassword();
	};

	const styles = useSpring({
		from: { opacity: 0, delay: 50 },
		to: { opacity: 1, delay: 50 },
	});

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if(e.key === 'Enter') {
				e.preventDefault();
				handleSubmit(e as any);
			}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [handleSubmit]);

	return <>
	{isForgotPassword ? (
		<ForgotPassword setIsOpen={closeForgotPassword} setIsForgotPassword={openForgotPassword} />
	) : (
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
				{error && <div className="error">{error}</div>}
				<div className="email">
					<label htmlFor="email-input">Email Address</label>
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
				<div className="password">
					<label htmlFor="password-input">Password</label>
					<div className="sec-2">
						<input
							id="password-input"
							className="pas"
							type="password"
							name="password"
							placeholder="············"
							autoComplete="current-password"
							value={form.password}
							onChange={onInputChange} />
					</div>
				</div>
				<button className="signup" type='submit'>Вход</button>
				<div className="footer">
					<span onClick={handleSignUpClick}>Регистрация</span>
					<span onClick={handleForgotPasswordClick}>Забыли пароль?</span>
				</div>
			</div>
			</form>
		</animated.div>
	</div>
	)}
	</>
}

export default Login;