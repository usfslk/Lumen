import React, { Component } from "react";
import "./App.css";
import { Container } from "reactstrap";

class Form extends Component {
	render() {
		return (
			<div class="form">
				<form class="login-form">
					<input
						type="text"
						onChange={this.handleChange}
						placeholder="Email"
						name="email"
						autoComplete="username"
					/>
					<input
						type="password"
						onChange={this.handleChange}
						placeholder="Password"
						name="password"
						autoComplete="current-password"
					/>
					<button>login</button>
					<div class="m-3" />
					<button>signup</button>
					<p class="message">
						Your password must not contain spaces, special characters, or
						emojis. By continuing you agree to our{" "}
						<a href="#">terms of services</a>
					</p>
				</form>
			</div>
		);
	}
}

class App extends Component {
	render() {
		return (
			<Container>
				<h1 className="text-center text-light pt-5 pb-5">Lumen</h1>
				<Form />
			</Container>
		);
	}
}

export default App;
