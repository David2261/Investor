import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import Anime, { anime } from 'react-anime';

function HomeDownBox() {
    const [isShown, setIsShown] = useState(false);
    return (
        <>
            <li className="nav-item"
            onMouseLeave={() => setIsShown(false)}>
            <NavLink
            onMouseEnter={() => setIsShown(true)}
            className="nav-link" to="/">
                <span>Home</span>
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
                    <span className="text-dark">About</span>
                </NavLink></li>
                <li className="list-group-item"><NavLink className="nav-link" to="/some...">
                    <span className="text-dark">Some...</span>
                </NavLink></li>
                <li className="list-group-item"><NavLink className="nav-link" to="/some...">
                    <span className="text-dark">Some...</span>
                </NavLink></li>
            </ul>
            </Anime>
            )}
            </li>
        </>
    )
}

function ToolsDownBox() {
    const [isShown, setIsShown] = useState(false);
    return (
        <>
            <li className="nav-item"
            onMouseLeave={() => setIsShown(false)}>
            <NavLink
            onMouseEnter={() => setIsShown(true)}
            className="nav-link" to="/tools">
                <span>Tools</span>
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
                    <span className="text-dark">Календарь отчетность</span>
                </NavLink></li>
                <li className="list-group-item"><NavLink className="nav-link" to="/dividendcalendar">
                    <span className="text-dark">Календарь дивидендов</span>
                </NavLink></li>
            </ul>
            </Anime>
            )}
            </li>
        </>
    )
}

export {HomeDownBox, ToolsDownBox};