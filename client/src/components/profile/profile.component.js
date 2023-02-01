import { Component } from "react";
import "./profile.css";
import { AuthInterceptor } from "../../interceptors/authInterceptor";
import * as environment from "../../environments/environment";
export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.getData();
  }
  componentDidMount() {
    AuthInterceptor();
    this.getUser();
  }

  getUser = () => {
    fetch(environment.API_URL + "/api/user/get-detail", {
      method: "GET",
      headers: {
        authorization: `Beare ${localStorage.getItem("access_token")}`,
      },
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
        console.log(res);
        localStorage.setItem("curr_user", JSON.stringify(res));
        this.setState({
          id: res.id,
          name: res.name,
          picture: res.picture,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getData = () => {};

  render() {
    return (
      <div className="container">
        <div className=" row">
          <div className="col-md-12">
            <h1>Profile page</h1>
          </div>

          <div className="col-md-12">
            <div className="row form-group mb-3">
              <div className="col-md-3">Name</div>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Full Name"
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-3">Picture</div>
              <div className="col-md-9">
                <input
                  type="file"
                  className="form-control-file float-left"
                  id="exampleFormControlFile1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
