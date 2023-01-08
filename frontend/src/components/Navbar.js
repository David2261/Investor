import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import classnames from 'classnames'

export class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            windowHight: "",
            visible: true
        };
        this.handleScroll = this.handleScroll.bind(this)
    }

    getWindowHight(){
        let deviceWindow = document.getElementById('close-block');
        let deviceWindowHight = deviceWindow.clientHeight;

        this.setState({
            windowHight: deviceWindowHight
        });
    }

    // Открытие
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.getWindowHight();
    }

    // Закрытие
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    // Hide or show the menu.
    handleScroll = () => {
        let heightToHideFrom = 60;
        const { prevScrollpos } = this.state;
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > heightToHideFrom;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible
      });
    }

    render() {
        return (
            <>
            <div
            className={
                classnames("p-4 container", {
                    "d-none": this.state.visible
                })
            } id="close-block"
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
