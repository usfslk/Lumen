// Youssef Selkani
// 2018

import {
  Form,
  Grid,
  Loader,
  Divider,
  Message,
} from "semantic-ui-react";
import React, { Component } from "react";
import fire from "../Fire";
import "../App.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: true,
      error: false,
      loggedIn: true
    };
  }

  // Form Handle
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Auth Change Listener
  componentDidMount = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loading: false, loggedIn: true });
      } else {
        this.setState({ loading: false, loggedIn: false });
      }
    });
  };

  signup = e => {
    this.setState({ loading: true, error: false });
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .then(u => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: true, loading: false });
      });
  };

  render() {
    return (
      <Grid style={{ backgroundColor: "#f9f9f9", marginTop: "0vh", minHeight: '95vh' }}>
        <Grid.Column id="headerContainer">

          {!this.state.loggedIn ?
          <div>
          <h2 style={{ marginTop: "20vh", textAlign: "center" }}>
            Join Lumen
          </h2>
          <p style={{  textAlign: "center" }}>
            The best way to discover trends and express yourself.
          </p>
          </div>
          : null }

          {!this.state.loggedIn ? (
            <Form
              id="loginForm"
              style={{
                maxWidth: 450
              }}
            >
              <br />

              {this.state.error ? (
                  <Message negative>
                    <Message.Header>
                      The email you entered is already in use
                    </Message.Header>
                    <p>
                      Please choose another one or <a href="/login">login</a> to
                      your account.
                    </p>
                  </Message>
              ) : null}
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
                <button onClick={this.signup} class="ui button green">
                  Sign up for Lumen
                </button>
              </div>

              <Divider hidden clearing />
              <p>
                Your password must not contain spaces, special characters, or
                emojis. By continuing you agree to our{" "}
                <a href="#">terms of services</a>.
              </p>
            </Form>
          ) : null}

          {this.state.loggedIn ? (
            <p style={{ marginTop: "2%" }}>What are you looking for?</p>
          ) : null}

          {this.state.loading ? (
            <Loader style={{ marginTop: "5%" }} active inline="centered" />
          ) : null}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Signup;
