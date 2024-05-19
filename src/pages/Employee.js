import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, ListGroup } from "react-bootstrap";
import { useAuth } from "../AuthContext";

const Employee = () => {
  const { currentUser, groupCode } = useAuth();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          // `https://work-schedule-backend-pyongho1-pyongho1s-projects.vercel.app/get-schedules?group=${groupCode}`
          `http://localhost:5001/get-schedules?group=${groupCode}`
        );
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [groupCode]);

  return (
    <>
      <Container>
        <h1 className="my-4">Employee Page</h1>
        <ListGroup>
          {schedules.map((schedule) => (
            <ListGroup.Item key={schedule.id}>
              {schedule.employeeName}: {schedule.schedule}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default Employee;
