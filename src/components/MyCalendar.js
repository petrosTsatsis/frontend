import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import eventService from "../services/eventService";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    // Load event dates when the component mounts
    loadEventDates();
  }, []);

  const loadEventDates = async () => {
    try {
      const response = await eventService.getAllEvents();

      if (Array.isArray(response.data)) {
        const allEvents = response.data;
        setEventDates(allEvents); 
      } else {
        console.error("Invalid response format for event dates:", response);
      }
    } catch (error) {
      console.error("Error loading event dates:", error);
    }
  };

  const handleDateClick = date => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const eventsOnDate = eventDates.filter(event =>
        new Date(event.date).toDateString() === date.toDateString()
      );
  
      const hasUpdateTimeEvent = eventsOnDate.some(event =>
        event.title === 'Update time !'
      );
  
      return eventsOnDate.length > 0 ? (
        <>
          <div
            className={`event-marker${hasUpdateTimeEvent ? ' update-marker' : ''}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={generateTooltipContent(eventsOnDate)}
          ></div>
        </>
      ) : null;
    }
  };

  const generateTooltipContent = events => {
    const eventCount = events.length;
    const eventPlural = eventCount === 1 ? 'event' : 'events';
  
    return `<strong>${eventCount} ${eventPlural}</strong> on this date`;
  };

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl, {
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner" style="background-color: lightblue;"></div></div>',
        html: true, // Enable HTML content
      });
    });

    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, [eventDates]);

  return (
    <div className='calendar-container'>
      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
      />
      <div className="event-marker-container">
        <div className="event-marker-description"></div>
        <strong className="event-marker-text">Personal Event</strong>
        <div className="update-marker-description"></div>
        <strong className="event-marker-text">Software Update</strong>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Event Form"
        style={{
          content: {
            width: '300px',
            margin: 'auto',
          },
        }}
      >
        {/* Your event form goes here */}
        <h2>Add Event</h2>
        <p>Date: {selectedDate.toLocaleDateString()}</p>
        <label>Event Name:</label>
        <input type="text" />
        <br />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default MyCalendar;