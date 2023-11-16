import React from "react";

const Sidebar = ({ isAuthenticated, userRole }) => {
  return (
    <div className="sidebar">
      <nav className="custom navbar navbar-dark bg-dark" aria-label="Dark offcanvas navbar">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasNavbarDark" aria-labelledby="offcanvasNavbarDarkLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarDarkLabel">HUA</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {isAuthenticated ? (
            <ul className="navbar-nav flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/softwares">Software</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/customers">Customers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/purchases">Purchases</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="appointments">Appointments</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contacts">Contacts</a>
              </li>
              <li className="nav-item dropdown">
              </li>
            </ul>
          ) : (
            <div>
              <p>Sign in for more!</p>
              <a className="btn btn-dark" href="/signin">Sign In</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;