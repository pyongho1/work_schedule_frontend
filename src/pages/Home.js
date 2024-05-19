import React from "react";
import { useAuth } from "../AuthContext";
import { Container } from "react-bootstrap";

const Home = () => {
  // const { currentUser, role, groupCode } = useAuth();
  const { role, groupCode } = useAuth();

  return (
    <>
      <Container>
        <h1 className="my-4">Dashboard</h1>
        {role === "employer" && (
          <div className="alert alert-info">
            <h4>Your Group Code: {groupCode}</h4>
            <p>
              Share this code with your employees to allow them to join your
              group.
            </p>
          </div>
        )}
        {/* Rest of your dashboard content */}
      </Container>
    </>
  );
};

export default Home;
