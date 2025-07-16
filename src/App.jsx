import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";

//import "./App.css";

function AppWrapper() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  return (
    <div
      className={
        darkMode && isDashboard
          ? "bg-dark text-white min-vh-100"
          : "bg-light text-dark min-vh-100"
      }
    >
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="/dashboard"
          element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme={darkMode && isDashboard ? "dark" : "light"}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />

      {/* <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
