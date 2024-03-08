import React from 'react';
import IH from '../../assets/logo/IH.webp';
import '../../styles/components/ModalForms/Login.css';

const Login = (props) => {
    return <>
    <div className="fixed z-10 w-full h-full backdrop-blur-sm bg-white/30 h-12">
			<div className='screen'>
				<div className="screen-1">
					<img className='logo' alt="logo" src={IH} />
					<button onClick={props.setIsOpen} className="fixed top-16 right-8">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<div className="email">
						<label htmlFor="email">Email Address</label>
						<div className="sec-2">
							<ion-icon name="mail-outline"></ion-icon>
							<input type="email" name="email" placeholder="Username@gmail.com"/>
						</div>
					</div>
					<div className="password">
						<label htmlFor="password">Password</label>
						<div className="sec-2">
							<ion-icon name="lock-closed-outline"></ion-icon>
							<input className="pas" type="password" name="password" placeholder="············"/>
							<ion-icon className="show-hide" name="eye-outline"></ion-icon>
						</div>
					</div>
					<button className="signup">Login</button>
					<div className="footer"><span>Sign-up</span><span>Forgot Password?</span></div>
				</div>
			</div>
		</div>
    </>
}

export default Login;