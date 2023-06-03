import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import Anime, { anime } from 'react-anime';

function HomeDownBox() {
    const [isShown, setIsShown] = useState(false);
    return (
        <>
            <div className="nav-item mx-3"
            onMouseLeave={() => setIsShown(false)}>
            <NavLink
            onMouseEnter={() => setIsShown(true)}
            className="rounded-md nav-link text-uppercase" to="/">
                <span>О нас</span>
                <span><i className="bi bi-chevron-down"></i></span>
            </NavLink>
            {isShown && (
            <Anime easing='easeInOutQuad'
                    duration={500}
                    delay={anime.stagger(100)}
                    loop={false}
                    scale={[ 0.1, 0.9 ]}>
            <ul className="position-fixed text-bg-light list-group list-group-flush">
                <li className="list-group-item"><NavLink className="nav-link" to="/about">
                    <span className="text-dark text-uppercase">О проекте</span>
                </NavLink></li>
                <li className="list-group-item"><NavLink className="nav-link" to="/contact">
                    <span className="text-dark text-uppercase">Контакты</span>
                </NavLink></li>
                <li className="list-group-item"><NavLink className="nav-link" to="/subscription">
                    <span className="text-dark text-uppercase">Поддержка проекта</span>
                </NavLink></li>
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
            <ul className="position-fixed text-bg-light list-group list-group-flush">
                <li className="list-group-item"><NavLink className="nav-link" to="/corpcalendar">
                    <span className="text-dark text-uppercase">Календарь отчетность</span>
                </NavLink></li>
                <li className="list-group-item"><NavLink className="nav-link" to="/dividendcalendar">
                    <span className="text-dark text-uppercase">Календарь дивидендов</span>
                </NavLink></li>
            </ul>
            </Anime>
            )}
            </div>
        </>
    )
}

export {HomeDownBox, ToolsDownBox};