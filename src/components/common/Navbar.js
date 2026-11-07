import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "./SearchBar";

import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../app/redux/selectors";

import { logout as logoutAction } from "../../app/redux/actions/users";
import { logout as logoutAPI } from "../../app/redux/api/users";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const isLoggedIn = useSelector(selectIsAuthenticated);

  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  function toggleDarkMode() {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    document.body.classList.toggle("dark-mode", nextMode);
  }

  async function handleLogout() {
    try {
      await logoutAPI();
      dispatch(logoutAction());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const today = new Date().toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="top-navbar">
      <div className="navbar-title">
        <span className="navbar-eyebrow">
          AGRICULTURE MANAGEMENT
        </span>

        <h2>Farm Overview</h2>

        <p>Welcome back! Here is your farm's latest overview.</p>
      </div>

      <SearchBar />

      <div className="navbar-actions">
        <div className="today-date">
          <span>📅</span>
          <span>{today}</span>
        </div>

        <button
          type="button"
          className="icon-button"
          onClick={toggleDarkMode}
          title="Toggle dark mode"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {isLoggedIn && currentUser ? (
          <>
            <div className="navbar-user">
              <span>{currentUser.name}</span>
              <small>{currentUser.role}</small>
            </div>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            type="button"
            className="login-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}