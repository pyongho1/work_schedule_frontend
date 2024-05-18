import React, { useEffect, useState } from "react";
import axios from "axios";

const Employee = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:5001/get-schedules");
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <div>
      <h1>Employee Page</h1>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            {schedule.employeeName}: {schedule.schedule}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;
