import { Component } from "react";
import "./home.css";
import { AuthInterceptor } from "../../interceptors/authInterceptor";
// import * as environment from "../../environments/environment";
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  componentDidMount() {
    AuthInterceptor();
  }

  render() {
    return <h1>Home page</h1>;
  }
}
