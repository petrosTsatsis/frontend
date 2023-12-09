import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/authService";
import {BsPerson} from "react-icons/bs"
import { withRouter } from '../common/with-router';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();
  
    this.setState({
      message: "",
      loading: true
    });
  
    this.form.validateAll();
  
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password)
        .then(() => {
          this.props.router.navigate("/home");
          window.location.reload();
        })
        .catch((error) => {
          console.log("Login Error:", error); 
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          this.setState({
            loading: false,
            message: resMessage
          });
        });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12" id="login">
        <div className="card card-container" style={{boxShadow: "0px 1px 5px 5px rgba(119, 53, 136, 0.459)", background:" rgba(73, 24, 85, 0.200)"}}>

        <div style={{ color: "rgba(119, 53, 136, 0.459)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "100px", paddingBottom: 10 }}>
          <BsPerson />
        </div>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            
            <div class="form-floating mb-3">
              <input 
                type="text"
                class="form-control" 
                id="floatingInput" 
                placeholder="Username" 
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}/>
              <label for="floatingInput" style={{textAlign: 'center', marginTop: '0px'}}>Username</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                class="form-control" 
                id="floatingPassword" 
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
              <label for="floatingPassword" style={{textAlign: 'center', marginTop: '0px'}}>Password</label>
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
                style={{marginTop: '20px'}}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      // </div>
    );
  }
}

export default withRouter(Login);