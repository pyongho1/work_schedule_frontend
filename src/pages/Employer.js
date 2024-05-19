import React, { useState, useEffect } from "react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useAuth } from "../AuthContext";

const Employer = () => {
  const { currentUser, groupCode } = useAuth();
  const [employeeName, setEmployeeName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // const response = await axios.get(`https://work-schedule-backend-pyongho1-pyongho1s-projects.vercel.app/get-employees?group=${groupCode}`);
        const response = await axios.get(
          `http://localhost:5001/get-employees?group=${groupCode}`
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [groupCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        // "https://work-schedule-backend-pyongho1-pyongho1s-projects.vercel.app/add-schedule",
        "http://localhost:5001/add-schedule",
        {
          employeeName,
          schedule,
          group: groupCode,
        }
      );
      setEmployeeName("");
      setSchedule("");
      alert("Schedule added successfully");
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  return (
    <>
      <Container>
        <h1 className="my-4">Employer Page</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Employee Name
            </Form.Label>
            <Col sm={10}>
              <Form.Select
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Employee
                </option>
                {employees.map((employee) => (
                  <option key={employee.uid} value={employee.displayName}>
                    {employee.displayName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Schedule
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                required
              />
            </Col>
          </Form.Group>
          <Button type="submit">Add Schedule</Button>
        </Form>
      </Container>
    </>
  );
};

export default Employer;
