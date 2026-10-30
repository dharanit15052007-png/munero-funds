
import { useState, type FormEvent } from "react";
import "./Login.css";
import Dashboard, { type Customer } from "./Dashboard";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwh5TVnh7NPtNPX5gd9aB_pzpda4RZsvdPyY-4NGwhs-NPM--JjZz2pjhsu7QtiniOsBg/exec";

type LoginResponse = {
  success: boolean;
  message?: string;
  customer?: Customer;
};

function Login() {
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          action: "login",
          customerId: customerId.trim(),
          password,
        }),
      });

      const responseText = await response.text();
      const result: LoginResponse = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error("Server connection failed.");
      }

      if (result.success && result.customer) {
        setCustomer(result.customer);
        setPassword("");
      } else {
        setError(result.message || "Invalid login details.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "Unable to connect."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setCustomer(null);
    setCustomerId("");
    setPassword("");
    setError("");
  };

  if (customer) {
    return (
      <Dashboard
        customer={customer}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="login-page">
      <header className="header">
        <a className="logo" href="/#home">
          MUNERO<span> FUNDS</span>
        </a>

        <nav>
          <a href="/#home">Home</a>
          <a href="/#about">About</a>
          <a href="/#announcements">Announcements</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      <div className="login-card">
        <a href="/" className="login-logo">
          MUNERO <span>FUNDS</span>
        </a>

        <p className="login-label">CUSTOMER PORTAL</p>
        <h1>Welcome Back.</h1>

        <p className="login-description">
          Sign in to access your savings information.
        </p>

        <form onSubmit={handleLogin}>
          <label htmlFor="customerId">Customer ID</label>
          <input
            id="customerId"
            type="text"
            placeholder="Enter your Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Sign In →"}
          </button>

          <button
            type="button"
            className="forgot-password"
            onClick={() =>
              alert("Please contact Munero Funds support.")
            }
          >
            Forgot Password?
          </button>
        </form>

        <p className="login-footer">
          Secure access to your information.
        </p>

        <a href="/" className="back-home">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

export default Login;
