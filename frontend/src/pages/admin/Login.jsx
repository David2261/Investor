import React from 'react'
import {NavLink} from 'react-router-dom'
import '../../assets/sass/admin/login.scss'


export const LoginAdmin = () => (
    <section>
        <div className="form-box">
            <div className="form-value">
                <form action="">
                    <h2>Login</h2>
                    <div className="inputBox">
                        <i className="bi bi-envelope"></i>
                        <input type="email" required />
                        <label htmlFor="">Email</label>
                    </div>
                    <div className="inputBox">
                        <i className="bi bi-lock"></i>
                        <input type="password" required />
                        <label htmlFor="">Password</label>
                    </div>
                    <div className="forget">
                        <label htmlFor="">
                            <input type="checkbox" />Remember me
                            <NavLink to="#">Forget Password</NavLink>
                        </label>
                    </div>
                    <button>Log in</button>
                    <div className="register">
                        <p>Don't have a account <NavLink to="/admin/register">Register</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
)
