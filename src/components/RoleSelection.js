import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Container, Button, Form, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const { currentUser, setRoleAndGroup } = useAuth();
  const [role, setRole] = useState("");
  // const [groupCodeInput, setGroupCodeInput] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await setRoleAndGroup(currentUser, role, groupCode);
      // Navigate to the dashboard or appropriate page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <h1>Select Role</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="employer">Employer</option>
            <option value="employee">Employee</option>
          </Form.Control>
        </Form.Group>
        {role === "employee" && (
          <Form.Group>
            <Form.Label>Group Code</Form.Label>
            <Form.Control
              type="text"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              required
            />
          </Form.Group>
        )}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};
export default RoleSelection;
