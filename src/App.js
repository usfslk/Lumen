import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import Login from './routes/Login';
import Home from './routes/Home';

class App extends Component {
	render() {
		return (
			<Container>
				<h1 className="text-center text-light pt-5 pb-5">Lumen</h1>
				<Login />
				<Home />
			</Container>
		);
	}
}

export default App;
