import React, { Component } from "react";
import UserService from "../services/userService";
import AuthService from "../services/authService";
import { Container, Row, Col } from "react-bootstrap";
import Type from "./Type";
import CountCards from "./countCards";
import UsersType from "./usersType";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counts: null,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      UserService.getCounts()
        .then((response) => {
          this.setState({
            counts: response.data,
            isLoggedIn: true,
          });
        })
        .catch((error) => {
          this.setState({
            counts: null,
            isLoggedIn: false,
          });
        });
    } else {
      this.setState({
        isLoggedIn: false,
      });
    }
  }

  render() {
    
    const { counts, isLoggedIn } = this.state;

    return (
      <div className="container">
        {isLoggedIn ? (
          <>
            <CountCards counts={counts} />
            {AuthService.getCurrentUser() && (
              <Container className="text-container">
                <Row>
                  <Col
                    md={12}
                    className="text-center"
                    style={{
                      fontSize: "1.5rem",
                      fontFamily: "Raleway, serif",
                      color: "#c770f0",
                    }}
                  >
                    <UsersType />
                  </Col>
                </Row>
              </Container>
            )}
          </>
        ) : (
          <Container fluid className="home-section" id="home">
            <Container className="home-content">
              <Row>
                <Col md={7} className="home-header">
                  <h1 className="heading-name">
                    Hello
                    <strong className="main-name"> There!</strong>
                  </h1>
                  <div style={{ padding: 50, textAlign: "left" }}>
                    <Type />
                  </div>
                </Col>
                <Col md={5} style={{ paddingBottom: 20 }}>
                  <img
                    src={process.env.PUBLIC_URL + "/testing.webp"}
                    alt="home pic"
                    className="img-fluid"
                    style={{ maxHeight: "450px" }}
                  />
                </Col>
              </Row>
            </Container>
          </Container>
        )}
      </div>
    );
  }
}