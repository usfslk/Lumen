// Youssef Selkani
// 2018

import React, { Component } from 'react';
import fire from '../Fire';
import {
	Button,
	Container,
	Header,
	Card,
	Icon,
	Image,
	Grid,
	Segment,
	Loader,
} from 'semantic-ui-react';
import '../App.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			title: '',
			description: '',
			picture: '',
			list: [],
			keys: [],
			show: false,
		};
	}

	componentDidMount = () => {
		this.setState({ loading: true });
		const { currentUser } = fire.auth();
		fire
			.database()
			.ref(`/feed/`)
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
					loading: false,
				});
			});
	};

	render() {
		const listItems = this.state.list.map((item, index) =>
			Object.values(item).map(nestedItem => (
				<div>
					<Grid.Column mobile={16} tablet={4} computer={4}>
						<Card>
							<Image
								id="mainIMG"
								src={nestedItem.picture}
							/>
							<Card.Content>
								<Card.Header>
									{nestedItem.title}
								</Card.Header>
								<Card.Description>
									{nestedItem.description}
								</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<a>
									<Icon name="user" />
									by {nestedItem.user}
								</a>
							</Card.Content>
						</Card>
						<br />
					</Grid.Column>
				</div>
			))
		);

		return (
			<div>
				<Grid>
					<Grid.Column id="headerContainer">
						<br />
						<br />
						{this.state.loading ? (
							<Loader active inline="centered" />
						) : null}
						<Grid textAlign="center">{listItems}</Grid>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default Home;
