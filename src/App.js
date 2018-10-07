import React, { Component } from "react";
import "./App.css";
import { Button } from "reactstrap";

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<p>
						Hello <code>Lumen.js</code>
						<Button color="danger">Danger!</Button>
					</p>
				</header>
			</div>
		);
	}
}

export default App;
