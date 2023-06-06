import React, { useState, useEffect, useRef } from 'react'
import {NavLink} from 'react-router-dom'
import Anime, { anime } from 'react-anime';


function DropdownItem(props) {
    return (
        <li className="list-group-item">
            {props.class_icon}
            <NavLink
            className="nav-link"
            to={`${props.url}`}>
            <span className="text-dark text-uppercase">{props.text}</span></NavLink>
        </li>
    )
}


function HomeDownBox() {
    const [isShown, setIsShown] = useState(false);
    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)){
                setIsShown(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }
    });
    return (
        <>
            <div className="nav-item mx-3"
            ref={menuRef}
            onMouseLeave={() => setIsShown(false)}>
            <div
                onMouseEnter={() => setIsShown(true)}>
                <NavLink
                className="nav-link text-uppercase"
                to="/">
                    <span>О нас</span>
                    <span><i className="bi bi-chevron-down"></i></span>
                </NavLink>
            </div>
            {isShown && (
            <Anime easing='easeInOutQuad'
                    duration={500}
                    delay={anime.stagger(100)}
                    loop={false}
                    scale={[ 0.1, 0.9 ]}>
            <ul className="position-absolute list-group">
                <DropdownItem url="/about" text="О проекте" />
                <DropdownItem url="/contact" text="Контакты" />
                <DropdownItem url="/subscription" text="Поддержка проекта" />
            </ul>
            </Anime>
            )}
            </div>
        </>
    )
}

function ToolsDownBox() {
    const [isShown, setIsShown] = useState(false);
    return (
        <>
            <div className="nav-item mx-3"
            onMouseLeave={() => setIsShown(false)}>
            <NavLink
            onMouseEnter={() => setIsShown(true)}
            className="nav-link" to="/tools">
                <span>Инструменты</span>
                <span><i className="bi bi-chevron-down"></i></span>
            </NavLink>
            {isShown && (
            <Anime easing='easeInOutQuad'
                    duration={500}
                    delay={anime.stagger(100)}
                    loop={false}
                    scale={[ 0.1, 0.9 ]}>
            <ul className="position-absolute list-group">
                <DropdownItem url="/corpcalendar" text="Календарь отчетность" />
                <DropdownItem url="/dividendcalendar" text="Календарь дивидендов" />
            </ul>
            </Anime>
            )}
            </div>
        </>
    )
}

export {HomeDownBox, ToolsDownBox};