import React, { Component } from 'react'

export class Contact extends Component {
	render() {
		return (
		<>
			<div className="p-4 row">
				<div className="col-5">
					<div className="row text-align-center text-dark">
						<h3>Социальные сети</h3>
					</div>
					<div className="row text-dark">
						<a className="col" href='https://developers.facebook.com/'><i className="bi bi-messenger"></i></a>
						<a className="col" href='https://github.com/David2261/Investor'><i className="text-dark bi bi-github"></i></a>
						<a className="col" href='https://www.instagram.com/'><i className="text-danger bi bi-instagram"></i></a>
					</div>
					<div className="row text-align-center text-dark p-3">
						<h3>Контакты</h3>
					</div>
					<div className="row text-dark">
						<div className="row">
							<div className="col-md-auto fs-1"><i className="bi bi-geo-alt"></i></div>
							<div className="col fs-4 shadow">Россия, Казань</div>
						</div>
						<div className="row">
							<div className="col-md-auto fs-1"><i className="bi bi-envelope-at"></i></div>
							<div className="col fs-4 shadow">bulatnasirov2003@gmail.com</div>
						</div>
						<div className="row">
							<div className="col-md-auto fs-1"><i className="bi bi-telegram"></i></div>
							<div className="col fs-4"><a className="link-info text-decoration-none shadow-sm" href='https://web.telegram.org/'>Telegram</a></div>
						</div>
					</div>
				</div>
				<div className="col-6">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d143170.13795714674!2d48.933221251629654!3d55.79542188650163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415ead2b7caccd99%3A0x7fcb77b9b5ad8c65!2z0JrQsNC30LDQvdGMLCDQoNC10YHQvy4g0KLQsNGC0LDRgNGB0YLQsNC9!5e1!3m2!1sru!2sru!4v1673554940341!5m2!1sru!2sru"
				title="MyLocation"
				width="600"
				height="450"
				style={{border:0}}
				allowfullscreen=""
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>
			</>
		)
	}
}

