import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";
// import Home from "./Home";
import Home from "./pages/Home";
// import Employer from "./Employer";
import Employer from "./pages/Employer";
// import Employee from "./Employee";
import Employee from "./pages/Employee";
// import Login from "./Login";
import Login from "./pages/Login";
import NavigationBar from "./components/NavBar";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/employer" element={<Employer />} /> */}
          <Route
            path="/employer"
            element={currentUser ? <Employer /> : <Login />}
          />
          <Route
            path="/employee"
            element={currentUser ? <Employee /> : <Login />}
          />
          {/* <Route path="/employee" element={<Employee />} /> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
