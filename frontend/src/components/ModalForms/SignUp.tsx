import React, { useState, useContext, useEffect, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';
// Entities
import AuthContext from '@/entities/context/AuthContext';
// Assets
import IH from '@/assets/logo/IH.webp';
// Styles
import '@/styles/components/ModalForms/SignUp.css';

interface SignUpProps {
	setIsOpen: () => void;
	setIsLogin: () => void;
}


const SignUp: React.FC<SignUpProps> = (props) => {
	const { registrationUser } = useContext(AuthContext);
	const [ form, setForm ] = useState({ username: "", email: "", password: "", password2: "" });
	const [ error, setError ] = useState<string | null>(null);

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { value, name } } = event;
		setForm(prevForm => ({ ...prevForm, [name]: value }));
	};

	const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		if (!usernamePattern.test(form.username)) {
			setError("Invalid username format.");
			return;
		}
	
		if (!emailPattern.test(form.email)) {
			setError("Invalid email format.");
			return;
		}
	
		try {
			await registrationUser(form);
			props.setIsOpen();
		} catch (err: any) {
			setError("Произошла ошибка при регистрации. Пожалуйста, проверьте данные.\n" + err);
		}
	}, [form, registrationUser, props]);

	const handleLoginClick = () => {
		props.setIsOpen();
		props.setIsLogin();
	};

	const styles = useSpring({
		from: { opacity: 0, delay: 50 },
		to: { opacity: 1, delay: 50 },
	});

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				handleSubmit(e as any);
			}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [handleSubmit]);

	return (
		<div className="fixed z-10 w-full h-full backdrop-blur-sm bg-white/30">
			<animated.div className='screen' style={styles}>
				<form onSubmit={handleSubmit}>
					<div className="screen-1">
						<img className='logo' alt="logo" src={IH} />
						<button onClick={props.setIsOpen} className="fixed top-16 right-8" type="button">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-32 h-32">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>

						{error && <div className="error">{error}</div>} {/* Display error message */}

						<div className="username">
							<label htmlFor="username-input">Username</label>
							<div className="sec-2">
								<input
									id="username-input"
									type="text"
									name="username"
									placeholder="Ник нейм"
									autoComplete='username'
									value={form.username}
									onChange={onInputChange} />
							</div>
						</div>

						<div className="email">
							<label htmlFor="email-input">Email Address</label>
							<div className="sec-2">
								<input
									id="email-input"
									type="email"
									name="email"
									placeholder="Username@gmail.com"
									autoComplete='email'
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
									autoComplete='new-password'
									value={form.password}
									onChange={onInputChange} />
							</div>
						</div>

						<div className="password">
							<label htmlFor="password2-input">Confirm Password</label>
							<div className="sec-2">
								<input
									id="password2-input"
									className="pas"
									type="password"
									name="password2"
									placeholder="············"
									autoComplete='new-password'
									value={form.password2}
									onChange={onInputChange} />
							</div>
						</div>

						<button className="signup" type='submit'>Зарегистрироваться</button>
						<div className="footer">
							<span onClick={handleLoginClick}>Вход</span>
						</div>
					</div>
				</form>
			</animated.div>
		</div>
	);
}

export default SignUp;
