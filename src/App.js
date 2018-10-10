// Youssef Selkani
// 2018

import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
} from 'react-router-dom';
import { Button, Container, Icon } from 'semantic-ui-react';
import './App.css';

import Home from './routes/Home';
import Account from './routes/Account';
import fire from './Fire.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: null,
		};
	}
	logout = () => {
		fire.auth().signOut();
	};
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
			<Router>
				<div>
					<div id="mainHeader">
						<div id="headerContainer">
							<Button
								id="headerBTN"
								compact
								color="black"
								href="/"
							>
								Home
							</Button>
							<Button
								compact
								id="headerBTN"
								color="black"
								href="https://github.com/usfslk/Lumen"
								target="blank"
							>
								Tutorial
							</Button>
							<Button
								id="headerBTN"
								compact
								color="green"
								href="/account"
							>
								{this.state.loggedIn ? 'Account' : 'Log in'}
							</Button>

							{!this.state.loggedIn ? (
								<Button
									icon
									id="headerBTN"
									href="/account"
									compact
									color="green"
								>
									Sign up
								</Button>
							) : null}

							{this.state.loggedIn ? (
								<Button
									icon
									id="headerBTN"
									onClick={this.logout}
									compact
									color="red"
								>
									<Icon name="logout" />
								</Button>
							) : null}
						</div>
					</div>
					<Route exact path="/" component={Home} />
					<Route path="/Account" component={Account} />
				</div>
			</Router>
		);
	}
}

export default App;
