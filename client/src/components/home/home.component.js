import { Component } from "react";
import "./home.css";
// import * as environment from "../../environments/environment";
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.getData();
  }

  getData = () => {};

  render() {
    return <h1>Home page</h1>;
  }
}
