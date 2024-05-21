import React from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { useAuth } from "../AuthContext";

const NavigationBar = () => {
  const { currentUser, login, logout, role } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Shift</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            {/* <Nav.Link href="/scheduling">Scheduling</Nav.Link> */}
            {/* <Nav.Link href="/time-clock">Time Clock</Nav.Link> */}
            {/* <Nav.Link href="/reports">Reports</Nav.Link> */}
            {/* <Nav.Link href="/team">Team</Nav.Link> */}
            {role === "employee" && (
              <Nav.Link href="/employee">Schedules</Nav.Link>
            )}
            {role === "employer" && (
              <Nav.Link href="/employer">Create Schedule</Nav.Link>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                <NavDropdown
                  title={currentUser.displayName}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/profile">
                  <img
                    src={
                      currentUser.photoURL || "https://via.placeholder.com/30"
                    }
                    alt="Profile"
                    className="rounded-circle ml-2"
                    style={{ width: "30px", height: "30px" }} // Add inline styles here
                  />
                </Nav.Link>
              </>
            ) : (
              <Button variant="outline-primary" onClick={login}>
                Log In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
