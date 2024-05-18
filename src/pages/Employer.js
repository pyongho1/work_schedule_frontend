import React, { useState, useEffect } from "react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Employer = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const employeeList = querySnapshot.docs.map((doc) => doc.data());
      setEmployees(employeeList);
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://work-schedule-backend-pyongho1-pyongho1s-projects.vercel.app/add-schedule",
        {
          employeeName,
          schedule,
        }
      );
      setEmployeeName("");
      setSchedule("");
      alert("Schedule added successfully");
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  return (
    <div>
      <h1>Employer Page</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Employee
          </option>
          {employees.map((employee) => (
            <option key={employee.uid} value={employee.displayName}>
              {employee.displayName}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          required
        />
        <button type="submit">Add Schedule</button>
      </form>
    </div>
  );
};

export default Employer;
