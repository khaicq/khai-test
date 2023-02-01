import { Component } from "react";
import "./header.css";
import * as environment from "../../environments/environment";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import { Link } from "react-router-dom";
import { AuthInterceptor } from "../../interceptors/authInterceptor";

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      picture: "",
    };
  }

  componentDidMount() {
    AuthInterceptor();
    this.getUser();
  }

  getUser = async () => {
    let curr_user = localStorage.getItem("curr_user");
    console.log({ curr_user });
    if (curr_user) {
      curr_user = JSON.parse(curr_user);
      this.setState({
        id: curr_user.id,
        name: curr_user.name,
        picture: curr_user.picture,
      });
      return;
    }

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

    return;
  };

  logout = () => {
    localStorage.clear();
    fetch(environment.API_URL + "/api/auth/logout", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.location.href = "/login";
      });
  };

  render() {
    return (
      <div className="navbar">
        <div className="navbar__container container">
          <div className="navbar__container-left">
            <span>Blog Blog</span>
          </div>
          <div className="navbar__container-right">
            {
              <span>
                <Dropdown as={NavItem}>
                  <Dropdown.Toggle as={NavLink}>
                    <img
                      src={
                        this.state.picture
                          ? this.state.picture
                          : "https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar-320x320.png"
                      }
                      className="avatar avatar--md rounded-circle"
                      alt="Profile"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as="li">
                      <NavLink as={Link} to="/profile">
                        User Detail
                      </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item as="li">
                      <NavLink onClick={this.logout}>Logout</NavLink>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            }
          </div>
        </div>
      </div>
    );
  }
}
