import React, { useState, useContext } from 'react';
import { animated, useSpring } from '@react-spring/web';
// Entities
import AuthContext from '../../entities/context/AuthContext';
// Assets
import IH from '../../assets/logo/IH.webp';
// Styles
import '../../styles/components/ModalForms/SignUp.css';

interface SignUpProps {
	setIsOpen: () => void,
	setIsLogin: () => void
}

const SignUp: React.FC<SignUpProps> = (props) => {
	const { registrationUser } = useContext(AuthContext);
	const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value, name },
		} = event;
		setForm(prevForm => ({ ...prevForm, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		registrationUser(e)
		props.setIsOpen()
	}

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
				<form onSubmit={handleSubmit} onKeyDown={handleSubmit}>
				<div className="screen-1">
					<img className='logo' alt="logo" src={IH} />
					<button onClick={props.setIsOpen} className="fixed top-16 right-8">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-32 h-32">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<div className="username">
						<label htmlFor="username-input">Username</label>
						<div className="sec-2">
							<input
								id="username-input"
								type="text"
								name="username"
								placeholder="Mark"
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
								autoComplete='current-password'
								value={form.password}
								onChange={onInputChange} />
						</div>
					</div>
					<div className="password">
						<label htmlFor="password2-input">Password</label>
						<div className="sec-2">
							<input
								id="password2-input"
								className="pas"
								type="password"
								name="password2"
								placeholder="············"
								autoComplete='current-password2'
								value={form.password2}
								onChange={onInputChange} />
						</div>
					</div>
					<button className="signup" type='submit'>Зарегистрироваться</button>
					<div className="footer" onClick={() => {props.setIsOpen(); props.setIsLogin()}}><span>Вход</span></div>
				</div>
				</form>
			</animated.div>
		</div>
		</>;
}

export default SignUp;