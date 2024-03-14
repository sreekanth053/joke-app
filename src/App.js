import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage"; 
import Login from "./components/Login"; 
import './App.css';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={<Homepage handleLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

