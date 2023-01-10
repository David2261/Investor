import React, { Component } from 'react'


export class Login extends Component {
	render() {
		return (
			<>
				<div className="text-center form-signin" tabIndex={-1}>
					<form>
					    <img className="mb-4" src="https://bootstrap-4.ru/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
					    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

					    <div className="form-floating">
					      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
					      <label htmlFor="floatingInput">Email address</label>
					    </div>
					    <div className="form-floating">
					      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
					      <label htmlFor="floatingPassword">Password</label>
					    </div>

					    <div className="checkbox mb-3">
					      <label>
					        <input type="checkbox" value="remember-me" /> Remember me
					      </label>
					    </div>
					    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
					    <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
					</form>
				</div>
			</>
		)
	}
}
