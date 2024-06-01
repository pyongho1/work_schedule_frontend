import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const EmployeeAvailability = () => {
  const { currentUser, groupCode } = useAuth();
  const navigate = useNavigate();
  const [availability, setAvailability] = useState({
    monday: { start: "", end: "" },
    tuesday: { start: "", end: "" },
    wednesday: { start: "", end: "" },
    thursday: { start: "", end: "" },
    friday: { start: "", end: "" },
    saturday: { start: "", end: "" },
    sunday: { start: "", end: "" },
  });

  const handleChange = (day, type, value) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        [type]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/submit-availability", {
        employeeId: currentUser.uid,
        employeeName: currentUser.displayName, // Include employee name
        availability,
        group: groupCode,
      });
      alert("Availability submitted successfully");
      navigate("/employee-dashboard"); // Redirect to employee dashboard
    } catch (error) {
      console.error("Error submitting availability", error);
    }
  };

  return (
    <Container>
      <h1>Submit Availability</h1>
      <Form onSubmit={handleSubmit}>
        {Object.keys(availability).map((day) => (
          <Form.Group as={Row} key={day} className="mb-3">
            <Form.Label column sm={2}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="time"
                value={availability[day].start}
                onChange={(e) => handleChange(day, "start", e.target.value)}
              />
            </Col>
            <Col sm={4}>
              <Form.Control
                type="time"
                value={availability[day].end}
                onChange={(e) => handleChange(day, "end", e.target.value)}
              />
            </Col>
          </Form.Group>
        ))}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default EmployeeAvailability;
