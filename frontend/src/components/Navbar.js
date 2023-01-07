import React, { Component, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import classnames from 'classnames'

export class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
          prevScrollpos: window.pageYOffset,
          visible: true
        };
    }
    // Adds an event listener when the component is mount.
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    // Remove the event listener when the component is unmount.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    // Hide or show the menu.
    /*handleScroll = () => {
        const { prevScrollpos } = this.state;

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible
      });
    }*/
    // listenToScroll = () => {
    //     let heightToHideFrom = 40;
    //     const winScroll = document.documentElement.scrollTop;
    //     setHeight(winScroll);
    //     if (winScroll > heightToHideFrom) {
    //         is
    //     }
    // }
/*`container${!this.state.visible ? "" : " p-4" }`*/
    render() {
        return (
            <>
            <div
            className={
                classnames("p-4 container", {
                    "d-none": !this.state.visible
                })
            }
            >
                <div className='border px-4'></div>
            </div>
            <nav className='navbar navbar-dark navbar-expand-lg bg-primary'>
                <div className="navbar-brand">App</div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/community">
                            Community
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/blog">
                            Blog
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
            </>
        )
    }
}
