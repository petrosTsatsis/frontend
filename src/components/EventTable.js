import React, { useState } from "react";
import { Link } from "react-router-dom";

const EventTable = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(events.length / rowsPerPage);
    const updatedPage = Math.min(Math.max(newPage, 1), totalPages);
    setCurrentPage(updatedPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = events.slice(indexOfFirstRow, indexOfLastRow);

  return (
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
          {currentRows.map((event) => (
            <tr key={event.id}>
              <td className="event-table-cell">
                <Link
                  className="btn btn-outline-light timeline"
                  to={`/Events/${event.id}`}
                >
                  Details
                </Link>
              </td>
              <td className="event-table-cell">{event.title}</td>
              <td className="event-table-cell">{event.type}</td>
              <td className="event-table-cell">{event.startTime}</td>
            </tr>
          ))}

          <tr className="table-task-management" style={{backgroundColor: 'transparent'}}>
            <td className="event-table-cell" colSpan="4">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', paddingLeft: '40px' }}>
                  <button
                    className="carousel-button" 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  </button>
                  <button
                    className="carousel-button" 
                    disabled={indexOfLastRow >= events.length}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  </button>
                  <span style={{ marginLeft: '10px', color: "#ffc107"}}>Page {currentPage}</span>
                </div>
                <div style={{ textAlign: "right", display: "flex", alignItems: "center" }}>
                  <span style={{ marginLeft: '10px', color: "#ffc107" }}>Rows per page:</span>
                  <select
                    className="form-select custom-select"
                    style={{ width: '70px', marginLeft: '10px', backgroundColor: 'rgba(124, 94, 204, 0.1)' }}
                    aria-label="Default select example"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;