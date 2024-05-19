import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const { currentUser, setRoleAndGroup } = useAuth();
  const [role, setRole] = useState("");
  const [groupCodeInput, setGroupCodeInput] = useState("");
  const navigate = useNavigate();

  const handleRoleSelection = async () => {
    if (role === "employee" && !groupCodeInput) {
      alert("Please enter a valid group code.");
      return;
    }
    await setRoleAndGroup(currentUser, role, groupCodeInput);
    navigate("/dashboard");
  };

  return (
    <Container className="text-center my-5">
      <h1>Welcome, {currentUser.displayName}!</h1>
      <p>Please select your role:</p>
      <Form>
        <Form.Check
          type="radio"
          label="Employer"
          name="role"
          value="employer"
          onChange={(e) => setRole(e.target.value)}
        />
        <Form.Check
          type="radio"
          label="Employee"
          name="role"
          value="employee"
          onChange={(e) => setRole(e.target.value)}
        />
        {role === "employee" && (
          <Form.Group className="my-3">
            <Form.Control
              type="text"
              placeholder="Enter group code"
              value={groupCodeInput}
              onChange={(e) => setGroupCodeInput(e.target.value)}
            />
          </Form.Group>
        )}
        <Button
          onClick={handleRoleSelection}
          variant="primary"
          className="mt-3"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default RoleSelection;
