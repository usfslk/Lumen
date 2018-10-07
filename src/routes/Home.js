import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import fire from '../Fire';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
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
		const listItems = this.state.list.map((item, index) => (
			<div class="col-md-4 mb-3">
				<Card>
					<CardImg top width="100%" id="mainImage" src={item.picture} alt="Card image cap" />
					<CardBody>
						<CardTitle>{item.title}</CardTitle>
						<CardText>{item.description}</CardText>
						<small>Posted by {item.user}</small>
					</CardBody>
				</Card>
			</div>
		));

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
				{this.state.loading ? <h6 class="mb-5">Loading ...</h6> : null}
				<div class="row">
					<addNewButton />
					{listItems}
				</div>
			</div>
		);
	}
}

export default Home;
