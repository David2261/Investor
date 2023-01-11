import React from 'react'


export function Contact() {
	return (
		<>
			<div className="p-2 row">
				<div className="col-5">
					<div className="row text-align-center text-dark">
						<h3>Социальные сети</h3>
					</div>
					<div className="row text-dark">
						<a className="col" href='https://developers.facebook.com/'><i className="bi bi-messenger"></i></a>
						<a className="col" href='https://github.com/David2261/Investor'><i className="text-dark bi bi-github"></i></a>
						<a className="col" href='https://www.instagram.com/'><i className="text-danger bi bi-instagram"></i></a>
					</div>
					<div className="row text-align-center text-dark">
						<h3>Контакты</h3>
					</div>
					<div className="row text-dark">
						<div className="row">
							<div className="col-md-auto"><i className="bi bi-geo-alt"></i></div>
							<div className="col">Россия, Казань</div>
						</div>
						<div className="row">
							<div className="col-md-auto"><i class="bi bi-envelope-at"></i></div>
							<div className="col">bulatnasirov2003@gmail.com</div>
						</div>
						<div className="row">
							<div className="col-md-auto"><i className="bi bi-telegram"></i></div>
							<div className="col"><a href='https://web.telegram.org/'>https://web.telegram.org/</a></div>
						</div>
					</div>
				</div>
				<div className="col-6"></div>
			</div>
		</>
	)
}

