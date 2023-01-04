import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = () => (
    <nav className='navbar navbar-dark navbar-expand-lg bg-primary'>
        <div className="navbar-brand">App</div>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink className="nav-link" to="/">
                    Home
                </NavLink>
                <NavLink className="nav-link" to="/community">
                    Community
                </NavLink>
                <NavLink className="nav-link" to="/blog">
                    Blog
                </NavLink>
                <NavLink className="nav-link" to="/login">
                    Login
                </NavLink>
            </li>
        </ul>
    </nav>
)
