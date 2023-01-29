import { Component } from "react";
import "./login.css";
import * as environment from "../../environments/environment";
export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    console.log(event.target.id);
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    fetch(environment.API_URL + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((res) => {
        // console.log(res);
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        window.location.href = "/home";
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="login-container">
          <h1 className="d-block text-center mb-4">Login</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email Address"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Your Password"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-auto">
              <button
                id="submit"
                type="submit"
                className="btn btn-success btn-block "
              >
                Login
              </button>
              <hr />
              <div className="col-auto">
                <a
                  href={environment.API_URL + "/api/auth/facebook-login"}
                  className="btn btn-primary btn-block mb-3"
                >
                  Login With Facebook
                </a>
              </div>
              <div className="col-auto">
                <a
                  href="/api/auth/google-login"
                  className="btn btn-secondary btn-block"
                >
                  Login With Google
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
