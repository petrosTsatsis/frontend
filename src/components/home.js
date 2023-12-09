import React, { Component } from "react";
import UserService from "../services/userService";
import AuthService from "../services/authService";
import { Container, Row, Col } from "react-bootstrap";
import Type from "./Type";
import CountCards from "./countCards";
import UsersType from "./usersType";
import MyCalendar from "./MyCalendar";
import Timeline from "./Timeline";
import eventService from "../services/eventService";
import EventTable from "./EventTable";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counts: null,
      isLoggedIn: false,
      currentDayEvents: null,
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
    this.loadCurrentDayEvents();
  }

  loadAllEvents = async () => {
    try {
      const response = await eventService.getAllEvents();
      return response.data;
    } catch (error) {
      console.error("Error fetching all events:", error);
      return [];
    }
  };

  loadCurrentDayEvents = async () => {
    try {
      const allEvents = await this.loadAllEvents();
      const currentDate = new Date().toLocaleDateString('en-GB');
      
      const currentDayEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date).toLocaleDateString('en-GB');
        return eventDate === currentDate;
      });

      this.setState({
        currentDayEvents,
      });
    } catch (error) {
      console.error("Error loading current day events:", error);
    }
  };

  render() {
    
    const { counts, isLoggedIn, currentDayEvents } = this.state;

    return (
      <div className="container">
      {isLoggedIn ? (
        <>
          <Row>
            <Col md={7} style={{ paddingRight: 30}}>
            <CountCards counts={counts} />

        {currentDayEvents !== null && (
          <>
            <h2 style={{textAlign: 'center', fontFamily: "Raleway, serif", color: "#c770f0", paddingTop: 30
            , paddingBottom: 30}}>Events for Today</h2>
            {currentDayEvents.length > 0 ? (
              <EventTable events={currentDayEvents} />
            ) : (
              <div className="event-table">
              <table className="table table-hover events">
                <thead>
                  <tr>
                  <th className="event-table-header" style={{ width: "100px" }}>Actions</th>
                  <th className="event-table-header" style={{ width: "100px" }}>Title</th>
                  <th className="event-table-header" style={{ width: "100px" }}>Type</th>
                  <th className="event-table-header" style={{ width: "100px" }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      <h4>No events for today yet.</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            )}
          </>
        )}
            </Col>

            <Col md={5}>
                <MyCalendar />
                <div style={{paddingTop: 30, color: 'red'}}>
                  <h2 style={{textAlign: 'center', fontFamily: "Raleway, serif", color: "#c770f0"}}>Latest Additions</h2>
                </div>
                <Timeline />
              </Col>
          </Row>

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
                <Col md={5} style={{ paddingBottom: 30 }}>
                  <img
                    src={process.env.PUBLIC_URL + "/testing.webp"}
                    alt="home pic"
                    className="img-fluid"
                    style={{ maxHeight: "450px", paddingBottom: 30 }}
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