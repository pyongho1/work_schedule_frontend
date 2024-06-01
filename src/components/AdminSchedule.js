import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Button, ListGroup, Card } from "react-bootstrap";
import { useAuth } from "../AuthContext";

const AdminSchedule = () => {
  const { groupCode } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5001/get-availability",
        {
          params: { group: groupCode },
        }
      );
      const availability = response.data;
      console.log("Fetched Availability:", availability); // Debug log
      setAvailabilityData(availability); // Save the availability data

      const aiResponse = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: generatePrompt(availability),
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your actual API key
          },
        }
      );

      setRecommendations(
        aiResponse.data.choices[0].text.split("\n").filter(Boolean)
      );
    } catch (error) {
      console.error("Error fetching recommendations", error);
    }
    setLoading(false);
  }, [groupCode]);

  const generatePrompt = (availability) => {
    return `
      Based on the following employee availability:
      ${availability
        .map((a) => `${a.employeeName}: ${JSON.stringify(a.availability)}`)
        .join("\n")}
      Recommend the best schedule for the following shifts:
      Monday to Friday: Morning (6:30-12:00), Mid Shift (8:00-3:00), Closing Shift (12:00-5:00)
      Saturday and Sunday: Morning (7:30-12:00), Mid Shift (8:00-4:00), Closing Shift (12:00-5:00)
      Ensure to fill in 3 workers for Morning, 2 for Closing, no Mid Shift on weekdays and 2 for Morning, 1 for Mid Shift, and 2 for Closing on weekends.
    `;
  };

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <Container>
      <h1>Schedule Recommendations</h1>
      <Button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Fetching..." : "Get Recommendations"}
      </Button>

      <h2 className="mt-4">Employee Availability</h2>
      <ListGroup className="mb-4">
        {availabilityData.length > 0 ? (
          availabilityData.map((employee, index) => (
            <Card key={index} className="mb-3">
              <Card.Header>{employee.employeeName}</Card.Header>{" "}
              {/* Display employee name */}
              <Card.Body>
                {Object.entries(employee.availability).map(
                  ([day, times], idx) => (
                    <ListGroup.Item key={idx}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                      {times.start} - {times.end}
                    </ListGroup.Item>
                  )
                )}
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No availability data found.</p>
        )}
      </ListGroup>

      <h2>Schedule Recommendations</h2>
      <ListGroup className="mt-3">
        {recommendations.map((rec, index) => (
          <ListGroup.Item key={index}>{rec}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AdminSchedule;
