import React, { Component } from 'react';
import { Container } from 'reactstrap';
import fire from '../Fire';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: false
		};
	}
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	login = e => {
		this.setState({ loading: true });
		e.preventDefault();
		fire
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(u => {
				this.setState({ loading: false });
			})
			.catch(error => {
				console.log(error);
			});
	};

	signup = e => {
		this.setState({ loading: true });
		e.preventDefault();
		fire
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(u => {})
			.then(u => {
				this.setState({ loading: false });
			})
			.catch(error => {
				console.log(error);
			});
	};
	render() {
		return (
			<div class="form">
				<input type="text" onChange={this.handleChange} placeholder="Email" name="email" autoComplete="username" />
				<input type="password" onChange={this.handleChange} placeholder="Password" name="password" autoComplete="current-password" />
				{this.state.loading ? <p>Loading ...</p> : null}
				<button onClick={this.login}>login</button>
				<div class="m-3" />
				<button onClick={this.signup}>signup</button>
				<p class="message">
					Your password must not contain spaces, special characters, or emojis. By continuing you agree to our <a href="#">terms of services</a>
				</p>
			</div>
		);
	}
}

export default Login;
