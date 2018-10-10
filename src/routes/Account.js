// Youssef Selkani
// 2018

import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Icon,
	Card,
	Loader,
	Container,
	Divider,
	Label,
	Feed,
} from 'semantic-ui-react';
import React, { Component } from 'react';
import fire from '../Fire';
import '../App.css';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: true,
			error: null,
			loggedIn: true,
			showArticle: false,
			showSetting: false,
			showEdit: false,
			list: [],
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
			.signInWithEmailAndPassword(
				this.state.email,
				this.state.password
			)
			.then(u => {
				this.setState({ loading: false });
			})
			.catch(error => {
				console.log(error);
			});
	};

	showArticle = () => {
		this.setState({ showArticle: !this.state.showArticle });
	};

	showSetting = () => {
		this.setState({
			showSetting: !this.state.showSetting,
			loading: true,
		});
		this.account();
	};

	signup = e => {
		this.setState({ loading: true });
		e.preventDefault();
		fire
			.auth()
			.createUserWithEmailAndPassword(
				this.state.email,
				this.state.password
			)
			.then(u => {})
			.then(u => {
				this.setState({ loading: false });
			})
			.catch(error => {
				console.log(error);
			});
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
			.push({
				title,
				description,
				picture,
				user: currentUser.email,
			})
			.then(() => {
				this.setState({
					loading: false,
					showArticle: false,
				});
			});
	};

	componentWillMount = () => {
		fire.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ loading: false, loggedIn: true });
			} else {
				this.setState({ loading: false, loggedIn: false });
			}
		});
	};

	account = () => {
		const { currentUser } = fire.auth();
		fire
			.database()
			.ref(`feed/${currentUser.uid}/`)
			.on('value', snapshot => {
				var obj = snapshot.val();
				var list = [];
				var keys = [];
				for (let a in obj) {
					list.push(obj[a]);
					keys.push(a);
				}
				console.log(list);
				this.setState({
					list: list,
					keys: keys,
					loading: false,
				});
			});
	};

	delete = index => {
		const { currentUser } = fire.auth();
		fire
			.database()
			.ref(
				`feed/${currentUser.uid}/${this.state.keys[index]}`
			)
			.remove();
	};

	edit = index => {
		this.setState({ showEdit: !this.state.showEdit });
	};

	update = index => {
		const { currentUser } = fire.auth();

		this.setState({ loading: true });
		fire
			.database()
			.ref(
				`feed/${currentUser.uid}/${this.state.keys[index]}`
			)
			.update({
				title: this.state.updateTitle,
				description: this.state.updateDescription,
				picture: this.state.updatePicture,
			})
			.then(() => {
				this.setState({
					loading: false,
				});
			});
	};

	render() {
		const listItems = this.state.list.map((item, index) => (
			<div class="column fluid">
				<Divider hidden />

				<Card fluid>
					<Card.Content>
						<Card.Header>{item.title}</Card.Header>
					</Card.Content>
					<Card.Content>
						<Image
							rounded
							src={item.picture}
							size="tiny"
							verticalAlign="middle"
						/>
						<Feed>
							<Feed.Event>
								<Feed.Content>
									<Feed.Date content="few seconds ago" />
									<Feed.Summary>
										{item.description}
									</Feed.Summary>
									<Divider hidden />
									<a
										onClick={() => this.delete(index)}
										class="ui white label"
									>
										DELETE <i class="icon close" />
									</a>
								</Feed.Content>
							</Feed.Event>
						</Feed>
						{this.state.showEdit ? (
							<Form>
								<br />
								<Form.Group widths="equal">
									<Form.Input
										onChange={this.handleChange}
										name="updateTitle"
										label="A cool title"
										placeholder={item.title}
										required
									/>
									<Form.Input
										fluid
										onChange={this.handleChange}
										name="updatePicture"
										label="Picture URL"
										placeholder={item.picture}
										required
									/>
								</Form.Group>
								<Form.TextArea
									autoHeight
									rows={4}
									onChange={this.handleChange}
									name="updateDescription"
									label="What's on your mind?"
									placeholder={item.description}
									required
								/>

								<Button
									as="div"
									labelPosition="left"
									size="small"
									onClick={() => this.update(index)}
								>
									<Label as="span" color="black">
										UPDATE
									</Label>
									<Button color="green" icon>
										<Icon name="pencil" color="white" />
									</Button>
								</Button>
							</Form>
						) : null}
					</Card.Content>
				</Card>
			</div>
		));

		return (
			<Grid>
				<Grid.Column id="headerContainer">
					{!this.state.loggedIn ? (
						<Form
							id="loginForm"
							style={{
								maxWidth: 450,
								paddingTop: 50,
							}}
						>
							<br />
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								type="text"
								onChange={this.handleChange}
								placeholder="Email"
								name="email"
								autoComplete="username"
							/>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								onChange={this.handleChange}
								placeholder="Password"
								name="password"
								autoComplete="current-password"
								type="password"
							/>

							<div class="ui buttons fluid">
								<button
									onClick={this.login}
									class="ui button black"
									role="button"
								>
									Login
								</button>
								<div class="or" />
								<button
									onClick={this.signup}
									class="ui positive button"
									role="button"
								>
									Signup
								</button>
							</div>
						</Form>
					) : null}

					{this.state.loggedIn ? (
						<div>
							<br />
							{!this.state.showArticle ? (
								<Button
									color="black"
									onClick={this.showArticle}
									size="small"
								>
									CREATE LUMEN
								</Button>
							) : null}
						</div>
					) : null}
					{this.state.showArticle ? (
						<Container fluid>
							<h1>Create Lumen</h1>
							<Form>
								<Form.Group widths="equal">
									<Form.Input
										fluid
										value={this.state.title}
										onChange={this.handleChange}
										name="title"
										label="A cool title"
										required
									/>
									<Form.Input
										fluid
										value={this.state.picture}
										onChange={this.handleChange}
										name="picture"
										label="Picture URL"
										required
									/>
								</Form.Group>
								<Form.TextArea
									autoHeight
									rows={4}
									value={this.state.description}
									onChange={this.handleChange}
									name="description"
									label="What's on your mind?"
									required
								/>
								<Button
									animated="vertical"
									color="black"
									size="small"
									onClick={this.new}
								>
									<Button.Content visible>
										SUBMIT
									</Button.Content>
									<Button.Content hidden>
										<Icon name="plus" />
									</Button.Content>
								</Button>

								<Button
									id="formBTN"
									animated="vertical"
									color="white"
									size="small"
									onClick={this.showArticle}
								>
									<Button.Content visible>
										CANCEL
									</Button.Content>
									<Button.Content hidden>
										<Icon name="cancel" />
									</Button.Content>
								</Button>

								<Divider hidden clearing />
							</Form>
						</Container>
					) : null}

					{this.state.loggedIn ? (
						<div>
							<Divider hidden />
							<Header as="h2">
								<Icon name="user circle outline" />
								<Header.Content>Profile</Header.Content>
							</Header>

							<Divider />

							{this.state.showSetting ? (
								<Button
									color={
										this.state.showEdit ? 'white' : 'green'
									}
									size="small"
									onClick={() => this.edit()}
								>
									<Button.Content visible>
										{this.state.showEdit
											? 'DISABLE EDIT MODE'
											: 'ENABLE EDIT MODE'}
									</Button.Content>
								</Button>
							) : null}

							{this.state.showSetting ? (
								<Grid>
									<Grid.Row columns={2}>
										{listItems}
									</Grid.Row>
								</Grid>
							) : null}

							{!this.state.showSetting ? (
								<div>
									<Button
										onClick={this.showSetting}
										color="blue"
										size="small"
									>
										MANAGE ACCOUNT
									</Button>
									<br />
								</div>
							) : null}
						</div>
					) : null}

					<Divider hidden />
					{this.state.loading ? (
						<Loader active inline="centered" />
					) : null}
				</Grid.Column>
			</Grid>
		);
	}
}

export default Account;
