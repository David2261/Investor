import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import classnames from 'classnames'
import Anime, { anime } from 'react-anime';
import {HomeDownBox, ToolsDownBox} from './dropbox/HomeDown'


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
            <form className="input-group" onSubmit={this.handleSubmit}>
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
            onMouseLeave={() => this.handleClick()}
            className="col-md-auto d-flex justify-content-center">
                {this.state.position ?
                    <button onClick={this.handleClick} type="button" className="btn btn-outline-light"><i className="bi bi-search"></i></button>
                    :
                    <Anime easing='easeInOutQuad'
                        duration={1000}
                        delay={anime.stagger(100)}
                        loop={false}
                        scale={[ 0.1, 0.9 ]}
                    >
                        <SearchBtn />
                    </Anime>
                }
                <button type="button" className="px-3 btn btn-primary">
                    <NavLink className="nav-link text-uppercase" to="/login">
                        Login <i className="bi bi-box-arrow-in-right"></i>
                    </NavLink>
                </button>
                </div>
            
            </>
        )
    }
}


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
            <nav className='navbar px-4 fixed-top navbar-dark navbar-expand-lg bg-primary'>
                <div className="navbar-brand col d-flex justify-content-center">App</div>
                <ul className="navbar-nav col-5 d-flex justify-content-evenly">
                    <HomeDownBox />
                    <li className="nav-item">
                        <NavLink className="nav-link text-uppercase" to="/community">
                            Community
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-uppercase" to="/blog">
                            Blog
                        </NavLink>
                    </li>
                    <ToolsDownBox />
                </ul>
                <ToggleBtn />
            </nav>
            </>
        )
    }
}
