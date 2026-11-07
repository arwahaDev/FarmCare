import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../app/redux/actions/users";
import { login as loginAPI } from "../../app/redux/api/users";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginAPI(email, password);

      if (!result.success) {
        setError(result.message || "Login failed.");
        return;
      }

      dispatch(login(result.data));

      const destination =
        location.state?.from?.pathname || "/";

      navigate(destination, { replace: true });
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-form-section">
      <h2>Welcome Back</h2>
      <p>Sign in to your Farm Management account.</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email Address</label>

        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Password</label>

        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}