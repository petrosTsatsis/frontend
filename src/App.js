
import React, { useState, useEffect, Component} from "react";
import Particle from "./components/particle";
import "./App.css";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home";
import AuthService from "./services/authService";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import ContactUs from "./components/contactUs";
import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavbar";
import Dashboard from "./components/dashboard";
import AboutUs from "./components/aboutUs";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showManagerBoard: user.roles?.includes("ROLE_MANAGER"),
        showAdminBoard: user.roles?.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render() {
    const { currentUser, showAdminBoard } = this.state;
    const isAuthenticated = !!currentUser;
  return (

    <Router>
      <CustomNavbar isAuthenticated={isAuthenticated} logOut={this.logOut} userRole={showAdminBoard ? 'Admin' : 'Manager'} />
      <Particle /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact-us" element={<ContactUs/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
      <Footer />
    </Router>
  );
  }
}

export default App;
