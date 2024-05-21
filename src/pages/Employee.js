import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, ListGroup, Card } from "react-bootstrap";
import { useAuth } from "../AuthContext";

const Employee = () => {
  // const { currentUser, groupCode } = useAuth();
  const { groupCode } = useAuth();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `https://work-schedule-backend-pyongho1-pyongho1s-projects.vercel.app/get-schedules?group=${groupCode}`
          // `http://localhost:5001/get-schedules?group=${groupCode}`
        );
        console.log("Fetched Schedules:", response.data);
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [groupCode]);

  // const groupedSchedules = schedules.reduce((acc, schedule) => {
  //   const { employeeName, date, time } = schedule;
  //   if (!acc[employeeName]) {
  //     acc[employeeName] = [];
  //   }
  //   acc[employeeName].push({ date, time });
  //   return acc;
  // }, {});

  return (
    <>
      <Container>
        <h1 className="my-4">Employee Page</h1>
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
      </Container>
    </>
  );
};

export default Employee;
