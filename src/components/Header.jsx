import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <header className="shadow-lg">
      <nav
        className={`navbar navbar-expand-lg ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container">
          <NavLink to="/dashboard" className="navbar-brand text-primary ">
            <h1>Gemini Clone</h1>
          </NavLink>

          <div className="d-flex ms-auto">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn btn-outline-secondary me-2"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button onClick={handleLogout} className="btn btn-outline-danger">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
