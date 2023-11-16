import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {PiHammerLight, PiUsersLight} from "react-icons/pi";
import {BiPurchaseTag} from "react-icons/bi";
import {RiUserSettingsLine} from "react-icons/ri";

function CountCards({ counts }) {
  // Define separate messages for each title
  const cardData = {
    Customers: "Contact with your customers, book appointments, and manage their data.",
    Software: "View data related to software.",
    Purchases: "Track purchase history for every customer.",
    Users: "View the users of the application.",
  };

  const icon = {
    Customers: <PiUsersLight />,
    Software: <PiHammerLight />,
    Purchases: <BiPurchaseTag />,
    Users: <RiUserSettingsLine />,
  };

  return (
    <div className="count-boxes">
      {Object.keys(counts).map((key) => (
        <Card className="count-box card" key={key} style={{ marginTop: '10px' }}>
          <h5 className="card-header" style={{ backgroundColor: ' rgb(46, 30, 82, 0.300)', borderRadius: '150px'}}>
            {key}: <span style={{ color: '#6d20c5d7' }}>{counts[key]}</span>
          </h5>
          <div className="card-body">
            <div className="card-title">{cardData[key]}</div>

            <Link to={`/${key.toLowerCase()}`}>
              <div className="mt-auto">
                <Button className="card-button" variant="primary" style={{ color: '#fff', backgroundColor: '#6d20c5d7', borderColor: '#6d20c5d7'}}>
                  {icon[key]} {key}
                </Button>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default CountCards