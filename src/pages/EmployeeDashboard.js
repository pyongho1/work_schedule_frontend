import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, ListGroup, Card } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const { currentUser, groupCode } = useAuth();
  const navigate = useNavigate();
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/get-availability",
          {
            params: { group: groupCode },
          }
        );
        const userAvailability = response.data.find(
          (avail) => avail.employeeId === currentUser.uid
        );
        setAvailability(userAvailability);
      } catch (error) {
        console.error("Error fetching availability", error);
      }
      setLoading(false);
    };

    fetchAvailability();
  }, [currentUser.uid, groupCode]);

  const handleUpdate = () => {
    navigate("/employee-availability");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Employee Dashboard</h1>
      {availability ? (
        <Card className="mb-3">
          <Card.Header>Your Availability</Card.Header>
          <Card.Body>
            <ListGroup>
              {Object.entries(availability.availability).map(
                ([day, times], idx) => (
                  <ListGroup.Item key={idx}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}: {times.start}{" "}
                    - {times.end}
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        <p>No availability data found.</p>
      )}
      <Button onClick={handleUpdate}>Update Availability</Button>
    </Container>
  );
};

export default EmployeeDashboard;
