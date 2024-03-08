import React from 'react';
import '../../styles/components/ModalForms/Login.css';

const Login = (props) => {
    return <>
    <div className="fixed z-10 w-full h-full backdrop-blur-sm bg-white/30 h-12">
        <div className="grid items-center justify-center rounded-lg">
            <div className="fixed px-4 md:px-0 md:inset-x-1/3 backdrop-blur-sm bg-white/30 rounded-md">
                <div className="fixed top-32 login-form">
                    <button onClick={props.setIsOpen} className="fixed top-16 right-8" data-name="Navbar logo">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className='wrapper-login'>
                        <form action="">
                            <h1 className="navbar-title-login">Login</h1>
                            <div className="input-sign-up">
                                <input type="text" className='table-login' placeholder="Username" required />
                            </div>
                            <div className="input-sign-up">
                                <input type="password" className='table-login' placeholder="Password" required />
                            </div>
                        <button type="submit" className="btn-login">Sign up</button>
                        <p className='text-login'>Forgot your password?<br />
                        <a href="#">Reset</a>
                        </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Login;