import React from "react";
import NavigationBar from "../components/NavBar";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Container>
        <h1 className="my-4">Schedules</h1>
        <h3>Today</h3>
        <Row>
          {["Front Desk", "Front Desk", "Front Desk", "Front Desk"].map(
            (role, index) => (
              <Col md={6} lg={4} key={index} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{role}</Card.Title>
                    <Card.Text>
                      <i className="bi bi-calendar"></i> 8:00 AM - 5:00 PM
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          )}
        </Row>
      </Container>
    </>
  );
};

export default Home;
