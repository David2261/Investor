import React, { Component } from 'react'
import '../assets/sass/Contact.scss'

export class Contact extends Component {
	render() {
		return (
		<>
			<div className="p-4 row contact">
				<div className="col-5 contactInfo">
					<div className="row text-align-center text-dark">
						<h3>Социальные сети</h3>
					</div>
					<div className="row text-dark">
						<a className="col networkIcon" href='https://developers.facebook.com/'><i className="bi bi-messenger"></i></a>
						<a className="col networkIcon" href='https://github.com/David2261/Investor'><i className="text-dark bi bi-github"></i></a>
						<a className="col networkIcon" href='https://www.instagram.com/'><i className="bi bi-instagram insta"></i></a>
					</div>
					<div className="row text-align-center text-dark p-3">
						<h3>Контакты</h3>
					</div>
					<div className="row text-dark">
						<div className="row box">
							<div className="col-md-auto fs-1 icon"><i className="bi bi-geo-alt"></i></div>
							<div className="col fs-4 shadow text">Россия, Казань</div>
						</div>
						<div className="row box">
							<div className="col-md-auto fs-1 icon"><i className="bi bi-envelope-at"></i></div>
							<div className="col fs-4 shadow text">bulatnasirov2003@gmail.com</div>
						</div>
						<div className="row box">
							<div className="col-md-auto fs-1 icon"><i className="bi bi-telegram"></i></div>
							<div className="col fs-4 text"><a className="link-info text-decoration-none shadow-sm" href='https://web.telegram.org/'>Telegram</a></div>
						</div>
					</div>
				</div>
				<div className="col-6 contactForm">
				<form action="">
					<h2>Send Message</h2>
					<div className="inputBox">
						<input type="text" required="required"/>
						<span>Full Name</span>
					</div>
					<div className="inputBox">
						<input type="email" required="required"/>
						<span>Email</span>
					</div>
					<div className="inputBox">
						<textarea name="" id="" required="required"></textarea>
						<span>Full Name</span>
					</div>
					<div className="inputBox">
						<input type="submit" name="" value="Send" />
					</div>
				</form>
				</div>
			</div>
			</>
		)
	}
}

