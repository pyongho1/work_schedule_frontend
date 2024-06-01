// import React, { useEffect, useState } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Employer from "./pages/Employer";
import Employee from "./pages/Employee";
import Login from "./pages/Login";
import RoleSelection from "./components/RoleSelection";
import { useAuth } from "./AuthContext";
import NavigationBar from "./components/NavBar";
import EmployeeAvailability from "./components/EmployeeAvailability";
import AdminSchedule from "./components/AdminSchedule";

const App = () => {
  const { currentUser, role, loading } = useAuth();

  console.log("App.js - currentUser:", currentUser);
  console.log("App.js - role:", role);
  console.log("App.js - loading:", loading);

  // if (loading || (currentUser && role === null)) {
  //   return <div>Loading...</div>; // Display loading indicator while fetching user data
  // }

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching user data
  }
  return (
    <>
      <NavigationBar />
      <Router>
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={
              !currentUser ? (
                <Navigate to="/" />
              ) : role ? (
                <Home />
              ) : (
                <RoleSelection />
              )
            }
          />
          <Route
            path="/employer"
            element={
              !currentUser ? (
                <Navigate to="/" />
              ) : role === "employer" ? (
                <Employer />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/employee"
            element={
              !currentUser ? (
                <Navigate to="/" />
              ) : role === "employee" ? (
                <Employee />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/employee-availability"
            element={<EmployeeAvailability />}
          />
          <Route path="/admin-schedule" element={<AdminSchedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />{" "}
          {/* Catch-all route */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
