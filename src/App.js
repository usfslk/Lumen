// Youssef Selkani
// 2018

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Menu,
  Dropdown,
  Container,
  Image,
  Segment,
  Grid,
  List,
  Header
} from "semantic-ui-react";
import "./App.css";

import Home from "./routes/Home";
import Account from "./routes/Account";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import fire from "./Fire.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }

  // Auth Change Listener
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

  logout(event) {
    fire.auth().signOut();
    this.setState({ loading: true });
  }

  render() {
    return (
      <Router>
        <div>
          <Menu
            borderless
            style={{
              border: "none",
              borderRadius: 0,
              boxShadow: "none",
              marginBottom: "0em"
            }}
          >
            <Container text>
              {/* LOGO   */}
              <Menu.Item>
                <Image
                  size="mini"
                  src="https://image.flaticon.com/icons/svg/888/888868.svg"
                />
              </Menu.Item>
              {/* NAVBAR TITLE   */}
              <Menu.Item header>Lumen</Menu.Item>
              {/* HOME BUTTON   */}
              <Menu.Item as="a" href="/" icon="home">
                Home
              </Menu.Item>
              {/* DOCS LINK   */}
              <Menu.Item
                as="a"
                target="blank"
                href="https://github.com/usfslk/Lumen"
              >
                Docs
              </Menu.Item>

              <Menu.Menu position="right">
                <Dropdown text="Account" pointing className="link item">
                  {/* ACCOUNT LINK   */}
                  <Dropdown.Menu>
                    {!this.state.loading &&
                      this.state.loggedIn && (
                        <Dropdown.Item href="/account">
                          Your Profile
                        </Dropdown.Item>
                      )}

                    {!this.state.loading &&
                      !this.state.loggedIn && (
                        <div>
                          {/* LOG IN BUTTON   */}
                          <Dropdown.Item href="/login">Log in</Dropdown.Item>
                          {/* SIGN UP BUTTON   */}
                          <Dropdown.Item href="/signup">Sign up</Dropdown.Item>
                        </div>
                      )}

                    {/* SIGN OUT BUTTON   */}
                    {!this.state.loading &&
                      this.state.loggedIn && (
                        <Dropdown.Item href="/" onClick={this.logout}>
                          Sign out
                        </Dropdown.Item>
                      )}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Container>
          </Menu>
          
          {/* Router Paths   */}
          <Route exact path="/" component={Home} />
          <Route path="/Account" component={Account} />
          <Route path="/Login" component={Login} />
          <Route path="/Signup" component={Signup} />

          <Segment vertical style={{ padding: "5em 0em" }}>
            <Container>
              <Grid divided stackable>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Header as="h4" content="Links" />
                    <List link>
                      <List.Item as="a">Sitemap</List.Item>
                      <List.Item as="a">Contact</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Header as="h4" content="Legal" />
                    <List link>
                      <List.Item as="a">Privacy Policy</List.Item>
                      <List.Item as="a">Terms of Service</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Header as="h4">Social</Header>
                    <List link>
                      <List.Item as="a">Twitter</List.Item>
                      <List.Item as="a">Instagram</List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </div>
      </Router>
    );
  }
}
export default App;
