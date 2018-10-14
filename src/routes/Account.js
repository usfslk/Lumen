// Youssef Selkani
// 2018

import {
  Button,
  Form,
  Header,
  Image,
  Icon,
  Loader,
  Divider,
  Label,
  Table,
  Transition
} from "semantic-ui-react";
import React, { Component } from "react";
import fire from "../Fire";
import "../App.css";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: true,
      error: false,
      loggedIn: true,
      showSetting: false,
      showEdit: false,
      list: [],
      score: "",
      modal: false
    };
  }

  // Auth Change Listener
  componentWillMount = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true, showSetting: true });
        this.account();
      } else {
        this.setState({ loading: false, loggedIn: false });
      }
    });
  };

  // Form Handler
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Fetch User Data
  account = () => {
    const { currentUser } = fire.auth();
    fire
      .database()
      .ref(`feed/${currentUser.uid}/`)
      .on("value", snapshot => {
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
          loading: false
        });
      });
  };

  delete = index => {
    this.setState({ modal: true });
    const { currentUser } = fire.auth();
    fire
      .database()
      .ref(`feed/${currentUser.uid}/${this.state.keys[index]}`)
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
      .ref(`feed/${currentUser.uid}/${this.state.keys[index]}`)
      .update({
        title: this.state.updateTitle,
        description: this.state.updateDescription,
        picture: this.state.updatePicture
      })
      .then(() => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const listItems = this.state.list.map((item, index) => (
      <div>
        {/* ITEM */}
        <Table
          fixed
          stackable
          style={{ marginTop: "4vh", marginBottom: "0vh" }}
        >
          <Table.Body>
            <Table.Cell width={2}>
              <Image
                rounded
                id="smallIMG"
                src={item.picture}
                verticalAlign="middle"
              />
            </Table.Cell>
            <Table.Cell width={3}>
              <h3>{item.title}</h3>
            </Table.Cell>
            <Table.Cell width={2}>
              <h5>Score : {item.score}</h5>
            </Table.Cell>
            <Table.Cell width={3}>{item.timestamp}</Table.Cell>
            <Table.Cell textAlign="right" width={2}>
              {" "}
              <Button
                size="tiny"
                basic
                color="red"
                onClick={() => this.delete(index)}
              >
                <i class="icon close" />
                DELETE
              </Button>
            </Table.Cell>
          </Table.Body>
        </Table>

        {/* EDIT FORM */}
        <Transition
          visible={this.state.showEdit}
          animation="fade"
          duration={400}
        >
          <Form
            style={{
              paddingBottom: "8vh",
              paddingTop: "2vh"
            }}
          >
            <Form.Group widths="equal">
              <Form.Input
                onChange={this.handleChange}
                name="updateTitle"
                placeholder={item.title}
                required
              />
              <Form.Input
                fluid
                onChange={this.handleChange}
                name="updatePicture"
                placeholder={item.picture}
                required
              />
            </Form.Group>
            <Form.TextArea
              rows={4}
              onChange={this.handleChange}
              name="updateDescription"
              placeholder={item.description}
              required
            />

            <Button
              as="div"
              compact
              labelPosition="left"
              size="small"
              onClick={() => this.update(index)}
            >
              <Label as="span" color="black">
                UPDATE
              </Label>
              <Button color="yellow" icon compact>
                <Icon name="pencil" color="black" />
              </Button>
            </Button>
          </Form>
        </Transition>
      </div>
    ));

    return (
      <div
        style={{
          backgroundColor: "#f9f9f9",
          marginTop: "0vh",
          minHeight: "100vh"
        }}
      >
        <div
          id="headerContainer"
          style={{ marginTop: "0vh", minHeight: "100vh" }}
        >
          {/* HEADER TEXT / ICON */}
          {this.state.loggedIn ? (
            <div>
              <Header as="h2" style={{ paddingTop: "3vh", marginTop: "0vh" }}>
                <Icon name="setting" />
                <Header.Content>Manage Account</Header.Content>
              </Header>
              <Divider />

              {/* EDIT MODE */}
              {this.state.showSetting ? (
                <Button
                  color={this.state.showEdit ? "white" : "green"}
                  size="small"
                  onClick={() => this.edit()}
                >
                  <Button.Content visible>
                    {this.state.showEdit
                      ? "DISABLE EDIT MODE"
                      : "ENABLE EDIT MODE"}
                  </Button.Content>
                </Button>
              ) : null}
            </div>
          ) : null}

          {/* CONTAINER */}
          {this.state.showSetting ? <div>{listItems}</div> : null}

          {/* SPINNER */}
          {this.state.loading ? (
            <Loader style={{ marginTop: "5%" }} active inline="centered" />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Account;
