
import { useState } from "react";
import { ArrowLeft, Compass, LoaderCircle } from "lucide-react";
import "./AuthForm.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AuthForm({ mode, onBack, onSuccess }) {
  const isSignup = mode === "user-signup";
  const isAdmin = mode === "admin-login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (isSignup && password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isSignup ? "signup" : "login";

      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isSignup ? { name: name.trim() } : {}),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed.");
      }

      if (isAdmin && data.user.role !== "ADMIN") {
        setMessage("This account is not an administrator account.");
        return;
      }

      if (!isAdmin && data.user.role !== "USER") {
        setMessage("Please use the administrator login option.");
        return;
      }

      // Store the token only after the role check succeeds.
      sessionStorage.setItem("travelToken", data.token);
      sessionStorage.setItem("travelUser", JSON.stringify(data.user));

      setMessage(data.message || "Success!");
      onSuccess(data.user);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <button className="auth-back" onClick={onBack} type="button">
        <ArrowLeft size={18} /> Back
      </button>

      <section className="auth-card">
        <div className="auth-logo">
          <Compass size={28} />
        </div>

        <span className="auth-eyebrow">
          {isAdmin ? "RESTRICTED ACCESS" : "WELCOME TO WANDERWISE"}
        </span>

        <h1>
          {isSignup
            ? "Create your account"
            : isAdmin
              ? "Administrator login"
              : "Welcome back"}
        </h1>

        <p className="auth-subtitle">
          {isSignup
            ? "Join us and start discovering amazing destinations."
            : isAdmin
              ? "Sign in with your authorized administrator account."
              : "Sign in to continue your journey."}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label className="auth-field">
              Full name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                maxLength={100}
              />
            </label>
          )}

          <label className="auth-field">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              maxLength={255}
            />
          </label>

          <label className="auth-field">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={isSignup ? "At least 8 characters" : "Enter password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={isSignup ? 8 : undefined}
              maxLength={72}
              required
            />
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}
          {message && <p className="auth-message" role="status">{message}</p>}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="auth-spinner" size={18} />
                Please wait...
              </>
            ) : isSignup ? (
              "Create account"
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {isAdmin && (
          <p className="auth-security">
            Admin accounts cannot be created from this page.
          </p>
        )}
      </section>
    </main>
  );
}
