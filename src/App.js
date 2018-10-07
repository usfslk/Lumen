import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import Login from './routes/Login';
import Home from './routes/Home';
import fire from './Fire';

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
			<Container>
				<h1 className="text-center text-light pt-5 pb-5">Lumen</h1>
				{!this.state.loggedIn ? <Login /> : <Home />}
			</Container>
		);
	}
}

export default App;
