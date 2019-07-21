import React, { Component } from "react";
import "./App.css";

import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Paper,
  Box,
  Button
} from "@material-ui/core";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      image: "",
      user: null
    };

    this.fileRef = React.createRef();
  }

  componentDidMount() {
    const load = fetch("http://localhost:3000", {
      method: "GET"
    })
      .then(res => res.json())

      .then(data => {
        this.setState({ user: data.data });
      });

    this.catcher(load);
  }

  handleSubmit = e => {
    e.preventDefault();

    const form = this.state;

    if (form.name != "" && form.image != "") {
      const fromDetails = new FormData();

      fromDetails.append("name", form.name);
      fromDetails.append("image", this.fileRef.current.files[0]);

      const submitReq = fetch("http://localhost:3000/save", {
        method: "POST",
        body: fromDetails
      })
        .then(res => res.json())

        .then(data => {
          this.setState({ user: data.data });
        });

      this.catcher(submitReq);
    }
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  catcher = promised => {
    return promised.catch(e => {
      this.setState({ user: null });

      console.log(e);
    });
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Ruby App
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          {this.state.user ? (
            <Paper
              style={{
                maxWidth: "400px",
                margin: "auto",
                padding: "1rem",
                marginTop: "1rem"
              }}
            >
              <Typography
                style={{ marginBottom: "1rem" }}
                variant="h6"
                component="h6"
              >
                Profile
              </Typography>
              <Typography
                style={{ marginBottom: "1rem" }}
                variant="body2"
                component="div"
              >
                Name:
                {this.state.user.name ? (
                  <Typography variant="subtitle2" component="span">
                    {this.state.user.name}
                  </Typography>
                ) : (
                  ""
                )}
              </Typography>
              {this.state.user.image ? (
                <img
                  style={{ maxWidth: "100%" }}
                  alt="Profile Image"
                  src={this.state.user.image}
                />
              ) : (
                ""
              )}
            </Paper>
          ) : (
            ""
          )}

          <Paper
            style={{
              maxWidth: "400px",
              margin: "auto",
              padding: "1rem",
              marginTop: "1rem"
            }}
          >
            <Typography
              style={{ marginBottom: "1rem" }}
              variant="h6"
              component="h6"
            >
              Profile Details
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="name"
                required
                onChange={this.handleChange("name")}
                fullWidth
                label={"Name"}
                variant="outlined"
              />
              <input
                name="image"
                required
                onChange={this.handleChange("image")}
                ref={this.fileRef}
                type="file"
                className="file-input"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ marginTop: "1rem" }}
                color="primary"
              >
                Save
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default App;
