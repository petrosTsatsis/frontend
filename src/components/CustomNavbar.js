import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown"; 
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineTeam,
  AiTwotoneMail,
} from "react-icons/ai";
import {MdNotifications, MdOutlineWorkOutline} from "react-icons/md";
import '../App.css';
import NotificationService from "../services/notificationsService"; 

const CustomNavbar = ({ isAuthenticated, logOut, userRole }) => {
  const navigate = useNavigate();
  const bellRef = useRef(null);
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const fetchNotificationCount = () => {
    NotificationService.MyNotifications()
      .then((response) => {
        console.log("Notification API response:", response.data);

        const notificationsWithStatusFalse = response.data.filter(
          (notification) => notification.status === false
        );

        const count = notificationsWithStatusFalse.length;
        setNotificationCount(count);
      })
      .catch((error) => {
        console.error("Error fetching notification count: " + error);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotificationCount();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logOut();
    navigate('/home');
  };

  const handleNotificationsClick = () => {
    if (bellRef.current) {
      bellRef.current.classList.add('bounce');
      setTimeout(() => {
        bellRef.current.classList.remove('bounce');
      }, 1000);
    }
    navigate('/notifications/myNotifications');
  };

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
        <h1 style={{ fontFamily: "Raleway, serif", color: "#c770f0" }}>myCRM</h1>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">

            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>
            {isAuthenticated && (
  <Nav.Item>
    <NavDropdown title={
      <>
        <MdOutlineWorkOutline style={{ marginBottom: "2px" }} />
        <span style={{ marginLeft: "5px" }}>Services</span>
      </>
    } id="basic-nav-dropdown" style={{ marginLeft: "0px"}}>
      <NavDropdown.Item as={Link} to="/Softwares">Software</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/Customers">Customers</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/Purchases">Purchases</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/SSLCertificates">SSL Certificates</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/SoftwareLicenses">Software Licenses</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/Dashboard">Dashboard</NavDropdown.Item>
      <NavDropdown.Divider />
    </NavDropdown>
  </Nav.Item>
  )}

            {isAuthenticated && (
              <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/profile"
                    onClick={() => updateExpanded(false)}
                  >
                    <AiOutlineUser style={{ marginBottom: "2px" }} /> Profile
                  </Nav.Link>
              </Nav.Item>
            )}

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineTeam style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/contact-us"
                onClick={() => updateExpanded(false)}
              >
                <AiTwotoneMail
                  style={{ marginBottom: "2px" }}
                />{" "}
                Contact us
              </Nav.Link>
            </Nav.Item>
            
            {userRole === 'Admin' && (
              <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/signup"
                    onClick={() => updateExpanded(false)}
                  >
                    Sign up
                  </Nav.Link>
              </Nav.Item>
            )}

            {isAuthenticated && (
            <Nav.Item>
              <a className="nav-link" onClick={handleNotificationsClick}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <MdNotifications style={{ marginBottom: "2px", fontSize: '28px' }} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill " style={{ fontSize: '14px',  backgroundColor: '#c770f0'}}> {/* Adjust the fontSize */}
                    {notificationCount}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </div>
              </a>
            </Nav.Item>
            )}
            
            <Nav.Item className="fork-btn">
              {isAuthenticated ? (
                      <Button
                      href="/signin"
                      className="fork-btn-inner"
                      onClick={handleLogout}
                      style={{ marginLeft: "20px",backgroundColor: '#623686' ,
                      borderColor:' #9c3deb'}}
                    >
                      <a> Sign out </a>
                    </Button>  
          
              ) : (
                  <Nav.Item className="fork-btn">
                    <Button
                      href="/signin"
                      className="fork-btn-inner"
                      style={{ marginLeft: "20px",backgroundColor: '#623686' ,
                      borderColor:' #9c3deb'}}
                    >
                      <a> Sign in </a>
                    </Button>
                </Nav.Item>
                )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;


