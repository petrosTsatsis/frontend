import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/authService";
import UserService from "../services/userService";
import { BsFilePerson } from "react-icons/bs";
import Button from "react-bootstrap/Button";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "", email: "", fname: "", lname: "", description: "",roles: [] },
      editing: false,
      tempUser: {},

    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, tempUser: { ...currentUser }, userReady: true });
  }

  handleEditClick = () => {
    this.setState({
      editing: true,
      tempUser: { ...this.state.currentUser },
    });
  };

  handleCancelClick = () => {
    this.setState({
      editing: false,
    });
  };

  handleSaveClick = () => {
    const { tempUser } = this.state;
  
    // Create a user object to match the backend expectations
    const userToUpdate = {
      username: tempUser.username,
      email: tempUser.email,
      fname: tempUser.fname,
      lname: tempUser.lname,
      description: tempUser.description,
      // Add other fields if needed
    };
  
    // Call your update method in UserService
    UserService.updateUser(userToUpdate)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        this.setState({
          editing: false,
          currentUser: { ...this.state.tempUser },
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
  
        // Display a user-friendly error message
        alert("Failed to update profile. Please try again.");
      });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      tempUser: {
        ...prevState.tempUser,
        [name]: value.slice(0, 120), // Limit to 120 characters
      },
    }));
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser, editing, tempUser } = this.state;

    return (
      <section className="profile">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem", position: 'relative', boxShadow: "0px 1px 5px 5px rgba(119, 53, 136, 0.459)", background:" rgba(73, 24, 85, 0.200)"}}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}
                  >
                    <div style={{ color: "rgba(119, 53, 136, 0.459)",fontSize: "160px" }}>
                    <BsFilePerson />
                    </div>
                    <h5>{currentUser.username}</h5>
                    {!editing && (
                      <div className="col-12 mb-3" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '500px' }}>
                        <h5 style={{ marginLeft: '10px', textAlign: 'left' }}>Description</h5>
                        <p style={{textAlign:'left',marginLeft: '10px'}} >{currentUser.description}</p>
                      </div>
                    )}
                    {editing && (
                    <div className="col-12 mb-3" style={{ position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%)', width: '500px' }}>
                      <h5 style={{ marginLeft: '10px', textAlign: 'left' }}>Description</h5>
                      <textarea
                        className="form-control"
                        name="description"
                        value={tempUser.description}
                        onChange={this.handleInputChange}
                        maxLength={120}
                        style={{ resize: 'none', height: '100px', width: '100%' }}
                        textAlign="left"
                      />
                    </div>
                  )}
                    {!editing && (
                      <Button className="fork-btn-inner" onClick={this.handleEditClick} style={{ backgroundColor: '#623686' ,
                      borderColor:' #9c3deb', width: '100px', marginTop:'20px'}}>
                        Edit
                      </Button>
                      
                    )}
                    {editing && (
                      <div>                     
                        <button className="btn btn-outline-success mt-3 me-2" onClick={this.handleSaveClick}>
                          Save
                        </button>
                        <button className="btn btn-outline-danger mt-3 me-2" onClick={this.handleCancelClick}>
                          Cancel
                        </button>
                        <p style={{ color: '#c770f0', textAlign: 'center', marginTop: '10px' }}>
                          The changes will apply the next time you log in the app!
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h4>Profile</h4>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h5>Email</h5>
                          {editing ? (
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              value={tempUser.email}
                              onChange={this.handleInputChange}
                            />
                          ) : (
                            <p className="text-muted">{currentUser.email}</p>
                          )}
                        </div>
                        <div className="col-7 mb-3">
                          <h5>First name</h5>
                          {editing ? (
                            <input
                              type="text"
                              className="form-control"
                              name="fname"
                              value={tempUser.fname}
                              onChange={this.handleInputChange}
                            />
                          ) : (
                            <p className="text-muted">{currentUser.fname}</p>
                          )}
                        </div>
                        <div className="col-7 mb-3">
                          <h5>Last Name</h5>
                          {editing ? (
                            <input
                              type="text"
                              className="form-control"
                              name="lname"
                              value={tempUser.lname}
                              onChange={this.handleInputChange}
                            />
                          ) : (
                            <p className="text-muted">{currentUser.lname}</p>
                          )}
                        </div>
                        <div className="col-7 mb-3">
                          <h5>Roles</h5>
                            <p className="text-muted">{currentUser.roles && currentUser.roles.join(", ")}</p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}