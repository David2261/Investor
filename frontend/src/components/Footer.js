import React from 'react'
import {NavLink} from 'react-router-dom'

export const Footer = () => (
    <footer className='container'>
        <div className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
            <div className='col-md-4 mb-0 text-decoration-none'>
                <p className='text-muted'>Проект Investor Home создан трейдером и инвестором Булатом Насыровым для написания аналитических материалов и создания общего блога по финансовым рынкам.</p>
                <div className="row row-cols-1 row-cols-md-5">
                   <NavLink to='https://developers.facebook.com/'><i className="col mb-3 bi bi-messenger"></i></NavLink>
                   <NavLink to='https://github.com/David2261/Investor'><i className="col mb-3 bi bi-github"></i></NavLink>
                   <NavLink to='https://www.instagram.com/'><i className="col mb-3 bi bi-instagram"></i></NavLink>
                   <NavLink to='https://web.telegram.org/'><i className="col mb-3 bi bi-telegram"></i></NavLink>
                   <NavLink to='https://twitter.com/'><i className="col mb-3 bi bi-twitter"></i></NavLink>
                </div>
            </div>
            <div className='col-md-4 d-flex align-items-center justify-content-center mb-0 mb-md-0 me-md-auto'>
                <p>Мы принимаем к оплате</p>
                <NavLink to='#'><i className="col mb-3 bi bi-paypal"></i></NavLink>
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
        <div className='align-items-center border-top'>
            <div className='mb-3align-items-center'>
                <ul className="nav justify-content-between">
                    <li className="nav-item"><NavLink to="/agreement" className="nav-link px-2 text-muted">Agreement</NavLink></li>
                    <li className="nav-item"><NavLink to="/emailagreement" className="nav-link px-2 text-muted">Email Agreement</NavLink></li>
                    <li className="nav-item"><NavLink to="/payanddelivery" className="nav-link px-2 text-muted">Pay & Delivery</NavLink></li>
                    <li className="nav-item"><NavLink to="/confidrntiality" className="nav-link px-2 text-muted">Confidentiality</NavLink></li>
                    <li className="nav-item"><NavLink to="/responsibility" className="nav-link px-2 text-muted">Resposibility</NavLink></li>
                </ul>
            </div>
            <p>Investor Home 2020 – наст. Год. Копирование и распространение информации с этого сайта разрешено только с письменного согласия владельца сайта. Запросы отправляйте на bulatnasirov2003@gmail.com</p>
            <p>Обзоры на этом сайте – это лишь мнение автора относительно финансовых показателей того или иного актива. Обзоры не должны рассматриваться как побуждение к покупке или продаже ценных бумаг. Помните, что торговля на финансовых рынках связана с риском как частично, так и полной потере денег. Перед тем, как самостоятельно инвестировать денежные средства рекомендуем получить достаточные знания и опыт.</p>
        </div>
    </footer>
)
