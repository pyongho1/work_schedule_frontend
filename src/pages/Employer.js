import React, { useState, useEffect } from "react";
import axios from "axios";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
import CalendarComponent from "../components/CalendarComponent";
import {
  Container,
  Form,
  // Button,
  Row,
  Col,
  // Card,
  // ListGroup,
} from "react-bootstrap";
import { useAuth } from "../AuthContext";

const Employer = () => {
  // const { currentUser, groupCode } = useAuth();
  const { groupCode } = useAuth();
  const [employeeName, setEmployeeName] = useState("");
  const [employees, setEmployees] = useState([]);
  // const [schedules, setSchedules] = useState([]);
  const [setSchedules] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `https://work-schedule-backend-pyongho1-pyongho1s-projects.vercel.app/get-employees?group=${groupCode}`
        );
        // const response = await axios.get(
        //   `http://localhost:5001/get-employees?group=${groupCode}`
        // );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [groupCode]);

  const handleSaveSchedule = async (schedule) => {
    try {
      await axios.post(
        "https://work-schedule-backend-pyongho1-pyongho1s-projects.vercel.app/add-schedule",
        {
          employeeName,
          schedule,
          group: groupCode,
        }
        // "http://localhost:5001/add-schedule",
        // {
        //   employeeName,
        //   schedule,
        //   group: groupCode,
        // }
      );
      setEmployeeName("");
      alert("Schedule added successfully");
      const response = await axios.get(
        `https://work-schedule-backend-pyongho1-pyongho1s-projects.vercel.app/get-schedules?group=${groupCode}`
        // `https://localhost:5001/get-schedules?group=${groupCode}`
      );
      setSchedules(response.data); // Update schedules after adding new one
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(
  //       // "https://work-schedule-backend-pyongho1-pyongho1s-projects.vercel.app/add-schedule",
  //       "http://localhost:5001/add-schedule",
  //       {
  //         employeeName,
  //         schedule,
  //         group: groupCode,
  //       }
  //     );
  //     setEmployeeName("");
  //     setSchedule("");
  //     alert("Schedule added successfully");
  //   } catch (error) {
  //     console.error("Error adding schedule:", error);
  //   }
  // };

  return (
    <>
      <Container>
        <h1 className="my-4">Employer Page</h1>
        <Form>
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
        </Form>
        <CalendarComponent onSave={handleSaveSchedule} />
        {/* <Container>
          {schedules.map((scheduleItem, index) => (
            <Card key={index} className="mb-3">
              <Card.Header>{scheduleItem.employeeName}</Card.Header>
              <Card.Body>
                <ListGroup>
                  {scheduleItem.schedule.map((schedule, idx) => (
                    <ListGroup.Item key={idx}>
                      {schedule.date} - {schedule.time}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </Container> */}
      </Container>
    </>
  );
};

export default Employer;
