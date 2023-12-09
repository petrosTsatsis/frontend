import React, { Component } from "react";
import softwareService from "../services/softwareService";
import authService from "../services/authService";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";

class ListSoftwareComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      software: [],
      showAdminBoard: false,
      showManagerBoard: false,
      currentPage: 1,
      rowsPerPage: 5, 
    };
  }

  componentDidMount() {
    this.getAllSoftware();

    const user = authService.getCurrentUser();
    if (user) {
      this.setState({
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showManagerBoard: user.roles.includes("ROLE_MANAGER"),
      });
    }
  }

  getAllSoftware() {
    softwareService
      .getAllSoftware()
      .then((response) => {
        const sortedSoftware = response.data.sort((a, b) => a.id - b.id);
        this.setState({ software: sortedSoftware });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePageChange = (newPage) => {
    this.setState((prevState) => {
      const { software, rowsPerPage} = prevState;
      const totalPages = Math.ceil(software.length / rowsPerPage);
      const updatedPage = Math.min(Math.max(newPage, 1), totalPages);
  
      return { currentPage: updatedPage };
    });
  };
  

  handleRowsPerPageChange = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value), currentPage: 1 });
  };

  sortByName = () => {
    const { software } = this.state;
    const sortedSoftware = [...software].sort((a, b) => a.name.localeCompare(b.name));
    this.setState({ software: sortedSoftware });
  };
e
  sortByPrice = () => {
    const { software } = this.state;
    const sortedSoftware = [...software].sort((b, a) => a.price - b.price);
    this.setState({ software: sortedSoftware });
  };

  sortByCategory = () => {
    const { software } = this.state;

    // Calculate category counts
    const categoryCounts = software.reduce((acc, softwareItem) => {
      const category = softwareItem.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Sort software by category counts
    const sortedSoftware = software.sort((b,a) => categoryCounts[b.category] - categoryCounts[a.category]);

    this.setState({ software: sortedSoftware });
  };

  render() {
    const { software, currentPage, rowsPerPage } = this.state;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = software.slice(indexOfFirstRow, indexOfLastRow);

    return (
      <div className="software-table">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Version</th>
              <th>Category</th>
              <th>Price USD</th>
              <th>Release Date</th>
              <th>Developer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((software) => (
              <tr key={software.id}>
                <td>{software.name}</td>
                <td>{software.version}</td>
                <td>{software.category}</td>
                <td>{software.price} $</td>
                <td>{software.releaseDate}</td>
                <td>{software.developer}</td>
                <td>
                <Link
                  className="btn btn-outline-warning"
                  style={{
                    border: '2px solid #c770f0',
                    borderRadius: '50%',
                    padding: '5px',
                    background: 'transparent',
                    
                  }}

                  to={`/Software/${software.id}`}
                >
                  <BsThreeDots style={{ fontSize: '20px' }}/>
                </Link>
                </td>
              </tr>
            ))}
            
            <tr className="table-task-management">
              <td colSpan="7">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', paddingLeft: '40px'}}>
                  <button
                    className="carousel-button" 
                    disabled={currentPage === 1}
                    onClick={(e) => {
                      e.preventDefault();
                      this.handlePageChange(currentPage - 1);
                    }} 
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  </button>
                    <button
                      className="carousel-button" 
                      disabled={indexOfLastRow >= software.length}
                      onClick={(e) => {
                        e.preventDefault();
                        this.handlePageChange(currentPage + 1);
                      }}
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                    <span style={{ marginLeft: '10px', color: "#c770f0"}}>Page {currentPage}</span>
                  </div>
                  <div style={{ textAlign: "right", display: "flex", alignItems: "center"}}>
                    <span style={{ marginLeft: '10px', color: "#c770f0" }}>Rows per page:</span>
                    <select
                      className="form-select custom-select"
                      style={{ width: '70px', marginLeft: '10px', backgroundColor: 'rgba(124, 94, 204, 0.1)' }}
                      aria-label="Default select example"
                      value={rowsPerPage}
                      onChange={this.handleRowsPerPageChange}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                    </select>
                  </div>
                  <div>
                  <Link
                  className="btn btn-outline-warning table-add"
                  style={{
                    border: '2px solid #c770f0',
                    padding: '5px',
                    background: 'transparent',
                    margin: 0
                    
                  }}

                  to={`/Software/add-software`}
                >
                  <MdAddCircleOutline style={{ fontSize: '25px' }}/> Add Software
                </Link>
                  </div>
                  <div style={{ textAlign: "right", display: "flex", alignItems: "center", paddingRight: 40 }}>
                    <select
                      className="form-select custom-select"
                      style={{ marginLeft: '10px', backgroundColor: 'rgba(124, 94, 204, 0.1)' }}
                      onChange={(e) => {
                        const selectedOption = e.target.value;
                        if (selectedOption === "name") {
                          this.sortByName();
                        } else if (selectedOption === "price") {
                          this.sortByPrice();
                        } else if (selectedOption === "category") {
                          this.sortByCategory();
                        }
                      }}
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price">Sort by Price</option>
                      <option value="category">Sort by Category</option>
                    </select>
              </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListSoftwareComponent;