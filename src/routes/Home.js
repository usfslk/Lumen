import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import fire from '../Fire';

class Block extends Component {
	render() {
		return (
			<Card>
				<CardImg top width="100%" src="http://placekitten.com/g/200/70" alt="Card image cap" />
				<CardBody>
					<CardText>
						Some quick example text to build on the card title and make up the bulk of the card's content.
					</CardText>
					<CardSubtitle>Posted by user@mail.com</CardSubtitle>
				</CardBody>
			</Card>
		);
	}
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			picture: '',
			list: [],
			keys: []
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	new = e => {
		this.setState({ loading: true });
		e.preventDefault();
		let title = this.state.title;
		let description = this.state.description;
		let picture = this.state.picture;
		const { currentUser } = fire.auth();
		fire
			.database()
			.ref(`feed/${currentUser.uid}/`)
			.push({ title, description, picture, user: currentUser.email })
			.then(() => {
				this.setState({ loading: false });
			});
	};

	componentDidMount = () => {
		this.setState({ loading: true });
		const { currentUser } = fire.auth();
		fire
			.database()
			.ref(`/feed/${currentUser.uid}/`)
			.on('value', snapshot => {
				var obj = snapshot.val();
				var list = [];
				var keys = [];
				for (let a in obj) {
					list.push(obj[a]);
					keys.push(a);
				}
				this.setState({
					list: list,
					keys: keys,
					loading: false
				});
			});
	};

	render() {
		return (
			<div>
				<input
					value={this.state.title}
					onChange={this.handleChange}
					name="title"
					class="form-control mb-2"
					placeholder="Title"
					required
				/>
				<input
					value={this.state.picture}
					onChange={this.handleChange}
					name="picture"
					class="form-control mb-2"
					placeholder="Picture URL"
					required
				/>
				<textarea
					row="9"
					value={this.state.description}
					onChange={this.handleChange}
					name="description"
					class="form-control mb-2"
					placeholder="Description"
					required
				/>
				<Button color="dark" onClick={this.new} className="mb-5" block>
					CREATE POST
				</Button>
				<div class="row">
					<div class="col-md-4 mb-3">
						<addNewButton />
						<Block />
					</div>
					<div class="col-md-4 mb-3">
						<Block />
					</div>
					<div class="col-md-4 mb-3">
						<Block />
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
