import React from 'react'
import {NavLink} from 'react-router-dom'
import "../assets/sass/Footer.scss"
import PatreonIcon from '../assets/img/patreon.svg'

function Year() {
    let today = new Date();
    return <p>{today.getFullYear()}</p>
};

export const Footer = () => (
    <footer className='container'>
        <div className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top subFooter'>
            <div className='col-md-4 mb-0 text-decoration-none'>
                <p className='text-muted'>Проект Investor Home создан трейдером и инвестором Булатом Насыровым для написания аналитических материалов и создания общего блога по финансовым рынкам.</p>
                <div className="row row-cols-1 row-cols-md-5">
                   <a href='https://developers.facebook.com/'><i className="col mb-3 bi bi-messenger"></i></a>
                   <a href='https://github.com/David2261/Investor'><i className="col text-dark mb-3 bi bi-github"></i></a>
                   <a href='https://www.instagram.com/'><i className="col text-danger mb-3 bi bi-instagram"></i></a>
                   <a href='https://web.telegram.org/'><i className="col mb-3 bi bi-telegram"></i></a>
                   <a href='https://twitter.com/'><i className="col mb-3 bi bi-twitter"></i></a>
                </div>
            </div>
            <div className='col-md-4 d-flex align-items-center justify-content-center mb-0 mb-md-0 me-md-auto'>
                <div>
                    <div className="row"><h3 className="textFooter">Мы принимаем к оплате</h3></div>
                    <div className="row">
                        <NavLink to='#'>
                            <img
                                className="patreonIcon"
                                src={PatreonIcon}
                                decoding="async"
                                loading="lazy" 
                                alt="" />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className='col mb-3'>
                <ul className="nav flex-column justify-content-end">
                    <li className="nav-item"><NavLink to="/" className="nav-link px-2 text-muted">Home</NavLink></li>
                    <li className="nav-item"><NavLink to="/community" className="nav-link px-2 text-muted">Community</NavLink></li>
                    <li className="nav-item"><NavLink to="/blog" className="nav-link px-2 text-muted">Blog</NavLink></li>
                    <li className="nav-item"><NavLink to="/login" className="nav-link px-2 text-muted">Login</NavLink></li>
                    <li className="nav-item"><NavLink to="/about" className="nav-link px-2 text-muted">About</NavLink></li>
                    <li className="nav-item"><NavLink to="/faq" className="nav-link px-2 text-muted">FAQS</NavLink></li>
                </ul>
            </div>
        </div>
        <div className='align-items-center border-top footerBottom'>
            <div className='mb-3align-items-center'>
                <ul className="nav justify-content-between">
                    <li className="nav-item"><NavLink to="/agreement" className="nav-link px-2 text-muted">Agreement</NavLink></li>
                    <li className="nav-item"><NavLink to="/emailagreement" className="nav-link px-2 text-muted">Email Agreement</NavLink></li>
                    <li className="nav-item"><NavLink to="/payanddelivery" className="nav-link px-2 text-muted">Pay & Delivery</NavLink></li>
                    <li className="nav-item"><NavLink to="/confidentiality" className="nav-link px-2 text-muted">Confidentiality</NavLink></li>
                    <li className="nav-item"><NavLink to="/responsibility" className="nav-link px-2 text-muted">Resposibility</NavLink></li>
                </ul>
            </div>
            <p>Investor Home 2020 – <Year /> год Копирование и распространение информации с этого сайта разрешено только с письменного согласия владельца сайта. Запросы отправляйте на bulatnasirov2003@gmail.com</p>
            <p>Обзоры на этом сайте – это лишь мнение автора относительно финансовых показателей того или иного актива. Обзоры не должны рассматриваться как побуждение к покупке или продаже ценных бумаг. Помните, что торговля на финансовых рынках связана с риском как частично, так и полной потере денег. Перед тем, как самостоятельно инвестировать денежные средства рекомендуем получить достаточные знания и опыт.</p>
        </div>
    </footer>
)
