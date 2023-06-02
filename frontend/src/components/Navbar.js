import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Anime, { anime } from 'react-anime';
import {HomeDownBox, ToolsDownBox} from './dropbox/HomeDown';
// import { ReactComponent as Logo } from '../assets/img/logo/logo.svg'
// import { LogoSvg } from './svg/LogoSvg'



class SearchBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            <form className="input-group px-6" onSubmit={this.handleSubmit}>
                <input type="text" className="form-control" placeholder="Search..." value={this.state.value} onChange={this.handleChange} />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Кнопка</button>
            </form>
            </>
        )
    }
}

class ToggleBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            position: !prevState.position
        }));
    }

    render() {
        return (
            <>
            <div
            // onClick={() => this.handleClick()}
            className="justify-content-center col-2">
                {this.state.position ?
                    <button onClick={this.handleClick} type="button" className="px-3 py-2 m-2 btn btn-outline-dark"><i className="bi bi-search"></i></button>
                    :
                    <Anime easing='easeInOutQuad'
                        duration={1000}
                        delay={anime.stagger(100)}
                        loop={false}
                        scale={[ 0.1, 0.9 ]}
                        className="m-2"
                    >
                        <button
                        type="button"
                        className="btn px-3"
                        onClick={this.handleClick}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                        <SearchBtn />
                    </Anime>
                }
                <button type="button" className="m-2 px-3 py-2 btn btn-primary">
                    <NavLink className="nav-link text-uppercase" to="/login">
                        Login <i className="bi bi-box-arrow-in-right"></i>
                    </NavLink>
                </button>
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
                    <div className="navbar-brand logo col-2">
                        <img src={require('../assets/img/logo/logo.webp')} alt="" width={150}/>
                    </div>
                    <div className="navbar-nav flex-row justify-between col-6">
                        <HomeDownBox />
                        <div className="nav-item mx-3">
                            <NavLink className="nav-link text-uppercase" to="/community">
                                Community
                            </NavLink>
                        </div>
                        <div className="nav-item mx-3">
                            <NavLink className="nav-link text-uppercase" to="/blog">
                                Blog
                            </NavLink>
                        </div>
                        <ToolsDownBox />
                    </div>
                    <ToggleBtn />
                </div>
            </>
        )
    }
}