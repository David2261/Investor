import React, { useContext } from 'react';
import AuthContext from '../../entities/context/AuthContext';
import IH from '../../assets/logo/IH.webp';
import '../../styles/components/ModalForms/Login.css';

type LoginProps = {
	setIsOpen: () => void;
	setIsSignUp: () => void;
};

const Login: React.FC<LoginProps> = (props) => {
	const { loginUser } = useContext(AuthContext);
    return <>
    <div className="fixed z-10 w-full h-full backdrop-blur-sm bg-white/30 h-12">
			<div className='screen'>
				<form onSubmit={loginUser}>
				<div className="screen-1">
				<img className='logo' alt="logo" src={IH} />
					<button onClick={props.setIsOpen} className="fixed top-16 right-8">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-32 h-32">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					<div className="email">
						<label htmlFor="email-input">Email Address</label>
						<div className="sec-2">
							<input id='email-input' type="email" name="email" placeholder="Example@gmail.com" autoComplete="email"/>
						</div>
					</div>
					<div className="password">
						<label htmlFor="password-input">Password</label>
						<div className="sec-2">
							<input id="password-input" className="pas" type="password" name="password" placeholder="············" autoComplete="current-password"/>
						</div>
					</div>
					<button className="signup" type='submit'>Login</button>
					<div className="footer"><span onClick={() => {props.setIsSignUp(); props.setIsOpen();}}>Sign-up</span><span>Forgot Password?</span></div>
				</div>
				</form>
			</div>
		</div>
    </>
}

export default Login;