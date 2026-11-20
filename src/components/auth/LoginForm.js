import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../app/redux/actions/users";

const API_URL = "http://localhost:5000/api/users";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Login failed.");
        return;
      }

      const user = result.data?.user || result.user || result.data;
      alert(
      "User Type: " + user?.userType +
      "\nRole: " + user?.role
         );
      console.log("Backend User Type:",user?.userType);
       console.log("Backend Role:",user?.role);
      if (!user?.token) {
        setError("Login response is missing authentication token.");
        return;
      }

     const session = {
  ...user,
  role:
    user.userType === "admin"
      ? "Admin"
      : user.userType === "manager"
      ? "Manager"
      : user.userType === "teamlead"
      ? "Team Lead"
      : "Employee"
};

      localStorage.setItem("agri_session", JSON.stringify(session));
      dispatch(login(session));

      const destination = location.state?.from?.pathname || "/";
      navigate(destination, { replace: true });

    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      console.log("LOGIN RESULT:",result);
      if (!response.ok) {
        setError(result.message || "Registration failed.");
        return;
      }

      setError(
        result.message ||
        "Registration submitted. Please wait for Admin approval."
      );

      setIsRegister(false);
      setPassword("");
      setConfirmPassword("");

    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-form-section">
      {!isRegister ? (
        <>
          <h2>Welcome Back</h2>
          <p>Sign in to your Farm Management account.</p>

          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            {error && <p className="login-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="register-link">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setError("");
              }}
            >
              Register here
            </button>
          </p>
        </>
      ) : (
        <>
          <h2>Create Account</h2>
          <p>Register for your Farm Management account.</p>

          <form className="login-form" onSubmit={handleRegister}>
            <label htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />

            <label htmlFor="register-email">Email Address</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              minLength={8}
              required
            />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />

            {error && <p className="login-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="register-link">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError("");
              }}
            >
              Login here
            </button>
          </p>
        </>
      )}
    </section>
  );
}