import React from 'react'
import {NavLink} from 'react-router-dom'
import '../../assets/sass/admin/register.scss'


export const RegisterAdmin = () => (
    <section>
        <div className="form-box">
            <div className="form-value">
                <form action="">
                    <h2>Register</h2>
                    <div className="inputBox">
                        <i className="bi bi-person-circle"></i>
                        <input type="text" required />
                        <label htmlFor="">Username</label>
                    </div>
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
                            <input type="checkbox" />I agree to the terms & conditions
                        </label>
                    </div>
                    <button>Log in</button>
                    <div className="register">
                        <p>Already have an account? <NavLink to="/admin/login">Login</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
)