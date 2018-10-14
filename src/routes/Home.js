// Youssef Selkani
// 2018

import React, { Component } from "react";
import moment from "moment";
import fire from "../Fire";
import {
  Button,
  Container,
  Card,
  Icon,
  Image,
  Grid,
  Loader,
  Divider,
  Label,
  Form
} from "semantic-ui-react";
import "../App.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      title: "",
      description: "",
      picture: "",
      list: [],
      keys: [],
      show: false,
      showArticle: false
    };
  }

  // Form Handle
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // API Call
  componentDidMount = () => {
    this.setState({ loading: true });
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({
          loggedIn: false,
          showArticle: false
        });
      }
    });
    fire
      .database()
      .ref(`/feed/`)
      .on("value", snapshot => {
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

  // Toogle
  showArticle = () => {
    this.setState({ showArticle: !this.state.showArticle });
  };

  // POST Function
  new = e => {
    this.setState({ loading: true, showArticle: false });
    e.preventDefault();
    let title = this.state.title;
    let description = this.state.description;
    let picture = this.state.picture;
    let score = 1;
    let timestamp = moment().format("LLL");
    const { currentUser } = fire.auth();
    fire
      .database()
      .ref(`feed/${currentUser.uid}/`)
      .push({
        title,
        description,
        picture,
        score,
        timestamp,
        user: currentUser.email
      })
      .then(() => {
        this.setState({
          loading: false
        });
      });
  };

  upvote = (index, nestedIndex) => {
    fire
      .database()
      .ref(
        `/feed/${this.state.keys[nestedIndex]}/${
          Object.keys(this.state.list[nestedIndex])[index]
        }`
      )
      .once("value", snapshot => {
        var obj = snapshot.val().score;
        this.setState({ score: obj }, () => this.up(index, nestedIndex));
      });
  };

  up = (index, nestedIndex) => {
    fire
      .database()
      .ref(
        `/feed/${this.state.keys[nestedIndex]}/${
          Object.keys(this.state.list[nestedIndex])[index]
        }`
      )
      .update({
        score: this.state.score + 1
      });
  };

  downvote = (index, nestedIndex) => {
    fire
      .database()
      .ref(
        `/feed/${this.state.keys[nestedIndex]}/${
          Object.keys(this.state.list[nestedIndex])[index]
        }`
      )
      .once("value", snapshot => {
        var obj = snapshot.val().score;
        this.setState({ score: obj }, () => this.down(index, nestedIndex));
      });
  };

  down = (index, nestedIndex) => {
    fire
      .database()
      .ref(
        `/feed/${this.state.keys[nestedIndex]}/${
          Object.keys(this.state.list[nestedIndex])[index]
        }`
      )
      .update({
        score: this.state.score - 1
      });
  };

  render() {
    const listItems = this.state.list.map((item, index) =>
      Object.values(item).map((nestedItem, nestedIndex) => (
        <div>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Card>
              <Image id="mainIMG" src={nestedItem.picture} />

              <Card.Content>
                <Label as="p" color="white" size="large" ribbon>
                  LUMENS : {nestedItem.score}
                </Label>
                <Card.Header style={{ paddingTop: "2vh" }}>
                  {nestedItem.title}
                </Card.Header>
                <Card.Description>{nestedItem.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <p>
                  <Icon name="user" style={{ marginRight: "5%" }} />
                  by {nestedItem.user}
                </p>
                <Divider />
                <p>
                  <Icon name="clock" style={{ marginRight: "5%" }} />
                  {nestedItem.timestamp}
                </p>
                {this.state.loggedIn ? (
                  <div>
                    <Divider />
                    <div class="ui buttons fluid">
                      <button
                        icon
                        onClick={() => this.upvote(nestedIndex, index)}
                        class="ui button compact green"
                        style={{ paddingTop: "1vh", paddingBottom: "1vh" }}
                      >
                        <Icon name="angle up" />
                      </button>
                      <button
                        icon
                        onClick={() => this.downvote(nestedIndex, index)}
                        class="ui compact button black"
                        style={{ paddingTop: "1vh", paddingBottom: "1vh" }}
                      >
                        <Icon name="angle down" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </Card.Content>
            </Card>
            <br />
          </Grid.Column>
        </div>
      ))
    );

    return (
      <div style={{ backgroundColor: "#f9f9f9", marginTop: "0vh" }}>
        <Grid style={{ marginTop: "0vh", minHeight: "100vh" }}>
          <Grid.Column id="headerContainer">

            {/* NEW BUTTON */}
            {this.state.loggedIn ? (
              <div style={{paddingTop: '2vh', paddingBottom: '2vh'}}>
                {!this.state.showArticle ? (
                  <Button
                    color="green"
                    fluid
                    onClick={this.showArticle}
                    size="compact"
                  >
                    CREATE LUMEN
                  </Button>
                ) : null}
              </div>
            ) : null}

            {/* NEW POST CONTAINER */}
            {this.state.showArticle ? (
              <Container fluid style={{paddingBottom: '4vh'}}>
                <h1>Be original</h1>
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
                    <Button.Content visible>SUBMIT</Button.Content>
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
                    <Button.Content visible>CANCEL</Button.Content>
                    <Button.Content hidden>
                      <Icon name="cancel" />
                    </Button.Content>
                  </Button>
                </Form>
              </Container>
            ) : null}

            {/* SPINNER */}
            {this.state.loading ? (
              <div>
                <Loader style={{ marginTop: "25%" }} active inline="centered" />
              </div>
            ) : null}

            {/* FEED */}
            <Grid textAlign="center" style={{ marginTop: "2%" }}>
              {listItems}
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Home;
