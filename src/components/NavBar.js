import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Shift</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/scheduling">Scheduling</Nav.Link>
            <Nav.Link href="/time-clock">Time Clock</Nav.Link>
            <Nav.Link href="/reports">Reports</Nav.Link>
            <Nav.Link href="/team">Team</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/create-schedule">Create Schedule</Nav.Link>
            <Nav.Link href="/profile">
              <img
                src="https://via.placeholder.com/30"
                alt="Profile"
                className="rounded-circle"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
