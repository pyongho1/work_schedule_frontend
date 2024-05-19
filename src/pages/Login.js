import React from "react";
import { useAuth } from "../AuthContext";
import { Container, Button } from "react-bootstrap";

const Login = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <Container className="text-center my-5">
        <h1>Login</h1>
        <Button onClick={handleLogin} variant="primary">
          Login with Google
        </Button>
      </Container>
    </>
  );
};

export default Login;
