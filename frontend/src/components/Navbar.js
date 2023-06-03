import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Anime, { anime } from 'react-anime';
import {HomeDownBox, ToolsDownBox} from './dropbox/HomeDown';
// import { ReactComponent as Logo } from '../assets/img/logo/logo.svg'
// import { LogoSvg } from './svg/LogoSvg'



class ToggleBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: true,
            value: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            position: !prevState.position
        }));
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        alert("Имя: " + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <>
                <div className="col-auto">
                {this.state.position ?
                    <button onClick={this.handleClick} type="button" className="btn btn-lg btn-outline-dark"><i className="bi bi-search"></i></button>
                    :
                    <Anime easing='easeInOutQuad'
                        duration={1000}
                        delay={anime.stagger(100)}
                        loop={false}
                        scale={[ 0.1, 0.9 ]}
                    >
                        <form className="navbar-form" onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <span className="input-group-btn">
                                    <button
                                    type="button"
                                    className="btn btn-lg"
                                    onClick={this.handleClick}>
                                        <i className="bi bi-x-circle"></i>
                                    </button>
                                </span>
                                <input type="text" className="form-control" placeholder="Поиск..." value={this.state.value} onChange={this.handleChange} />
                                <span className="input-group-btn">
                                <button className="btn btn-outline-secondary" type="button">
                                    <i className="bi bi-search" aria-hidden="true"></i>
                                </button>
                                </span>
                            </div>
                        </form>
                    </Anime>
                }
                </div>
                <div className="col-auto">
                        <NavLink to="/login">
                    <button type="button" className="btn btn-lg btn-primary text-white text-uppercase">
                            Вход <i className="bi bi-box-arrow-in-right"></i>
                    </button>
                        </NavLink>
                </div>
            </>
        )
    }
}


export default class Navbar extends Component {
    render() {
        return (
            <>
                <div className="container justify-content-evenly text-align-center row">
                    <div className="navbar-brand logo col-3">
                        <img src={require('../assets/img/logo/logo.webp')} alt="" width={150}/>
                    </div>
                    <div className="navbar-nav flex-row justify-center col-auto">
                        <HomeDownBox />
                        <div className="nav-item mx-3">
                            <NavLink className="nav-link text-uppercase" to="/community">
                                Сообщество
                            </NavLink>
                        </div>
                        <div className="nav-item mx-3">
                            <NavLink className="nav-link text-uppercase" to="/blog">
                                Блог
                            </NavLink>
                        </div>
                        <ToolsDownBox />
                    </div>
                    <div className="navbar-nav flex-row justify-between col-auto">
                        <ToggleBtn />
                    </div>
                </div>
            </>
        )
    }
}