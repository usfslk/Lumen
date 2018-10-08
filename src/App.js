import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Login from './routes/Login';
import Home from './routes/Home';
import fire from './Fire';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			loggedIn: null
		};
	}
	componentDidMount = () => {
		this.setState({ loading: true });
		fire.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ loggedIn: true, loading: false });
			} else {
				this.setState({ loggedIn: false, loading: false });
			}
		});
	};

	render() {
		return (
			<div>
				<div class="container">
					<div class="row">
						<div class="col-xs-2" />
						<div class="col-xs-8">
							<h1 className="text-light pt-5 pb-5">Lumen</h1>
							{this.state.loggedIn ? <Home /> : null}
						</div>
						<div class="col-xs-2" />
					</div>
				</div>
				{!this.state.loggedIn ? <Login /> : null}
			</div>
		);
	}
}

export default App;
