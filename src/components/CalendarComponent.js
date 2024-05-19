import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const CalendarComponent = ({ onSave }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [times, setTimes] = useState({});

  const handleDateChange = (date) => {
    if (date) {
      const dateString = date.toLocaleDateString();
      if (!selectedDates.find((d) => d === dateString)) {
        setSelectedDates((prevDates) => [...prevDates, dateString]);
      }
    }
  };

  const handleTimeChange = (date, time) => {
    const dateString = date.toLocaleDateString();
    setTimes((prevTimes) => ({
      ...prevTimes,
      [dateString]: time,
    }));
  };

  const handleSave = () => {
    const schedule = selectedDates.map((date) => ({
      date,
      time: times[date] || "",
    }));
    onSave(schedule);
  };

  return (
    <Container>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Select Dates
          </Form.Label>
          <Col sm={10}>
            <DatePicker
              selected={null}
              onChange={handleDateChange}
              inline
              multiple
            />
          </Col>
        </Form.Group>
        {selectedDates.map((date) => (
          <Form.Group as={Row} className="mb-3" key={date}>
            <Form.Label column sm={2}>
              {date}
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="time"
                value={times[date] || ""}
                onChange={(e) =>
                  handleTimeChange(new Date(date), e.target.value)
                }
              />
            </Col>
          </Form.Group>
        ))}
        <Button variant="primary" onClick={handleSave}>
          Save Schedule
        </Button>
      </Form>
    </Container>
  );
};

export default CalendarComponent;
