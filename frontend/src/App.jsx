import { useState } from "react";
import AuthForm from "./AuthForm";
import AdminDashboard from "./AdminDashboard";
import Destinations from "./Destinations";
import SubmitDestination from "./SubmitDestination";
import IndiaDestinations from "./IndiaDestinations";
import DestinationDetails from "./DestinationDetails";

import {
  Compass,
  MapPin,
  UserRound,
  ShieldCheck,
  ArrowRight,
  Globe2,
} from "lucide-react";

import "./App.css";

export default function App() {
  const [page, setPage] = useState("welcome");

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem("travelUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [selectedDestination, setSelectedDestination] = useState(null);

  const goTo = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHome = () => {
    setSelectedDestination(null);
    goTo("welcome");
  };

  const handleGuestExplore = () => {
    setSelectedDestination(null);
    setLoggedInUser(null);
    goTo("india-destinations");
  };

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    goTo(user?.role === "ADMIN" ? "admin-dashboard" : "india-destinations");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("travelToken");
    sessionStorage.removeItem("travelUser");
    setLoggedInUser(null);
    setSelectedDestination(null);
    goTo("welcome");
  };

  // Map page
  if (page === "destinations") {
    return (
      <Destinations
        onBack={() => goTo("india-destinations")}
        onHome={handleHome}
      />
    );
  }

  // Login, signup and administrator login
  if (
    page === "user-login" ||
    page === "user-signup" ||
    page === "admin-login"
  ) {
    return (
      <div className="app-shell">
        <nav className="navbar">
          <button className="brand" type="button" onClick={handleHome}>
            <Compass size={27} />
            <span>Roam India</span>
          </button>

          <button
            className="nav-back-button"
            type="button"
            onClick={handleHome}
          >
            Home
          </button>
        </nav>

        <AuthForm
          mode={page}
          onBack={handleHome}
          onSuccess={handleLoginSuccess}
        />

        <footer className="app-footer">
          Discover places worth visiting.
        </footer>
      </div>
    );
  }

  // Destination collection
  if (page === "india-destinations") {
    return (
      <IndiaDestinations
        user={loggedInUser}
        onGoHome={handleHome}
        onExploreMap={() => goTo("destinations")}
        onSubmitDestination={() => {
          if (loggedInUser?.role === "USER") {
            goTo("submit-destination");
          } else {
            goTo("user-login");
          }
        }}
        onLogout={loggedInUser ? handleLogout : undefined}
        onExploreDestination={(destination) => {
          setSelectedDestination(destination);
          goTo("destination-details");
        }}
      />
    );
  }

  // Individual tourist guide
  if (page === "destination-details") {
    return (
      <DestinationDetails
        destination={selectedDestination}
        onBack={() => goTo("india-destinations")}
        onExploreMap={() => goTo("destinations")}
      />
    );
  }

  // Submit a destination
  if (page === "submit-destination") {
    if (loggedInUser?.role !== "USER") {
      return (
        <div className="app-shell">
          <nav className="navbar">
            <button className="brand" type="button" onClick={handleHome}>
              <Compass size={27} />
              <span>Roam India</span>
            </button>
          </nav>

          <main className="welcome-container">
            <h2>Login required</h2>
            <p>Log in as a traveller to submit a destination.</p>
            <button
              className="primary-button"
              type="button"
              onClick={() => goTo("user-login")}
            >
              User Login <ArrowRight size={17} />
            </button>
          </main>
        </div>
      );
    }

    return (
      <SubmitDestination
        onBack={() => goTo("india-destinations")}
      />
    );
  }

  // Admin dashboard
  if (page === "admin-dashboard") {
    if (loggedInUser?.role !== "ADMIN") {
      return (
        <div className="app-shell">
          <main className="welcome-container">
            <h2>Administrator login required</h2>
            <button
              className="primary-button"
              type="button"
              onClick={() => goTo("admin-login")}
            >
              Admin Login <ArrowRight size={17} />
            </button>
          </main>
        </div>
      );
    }

    return <AdminDashboard onBack={handleHome} />;
  }

  // Main welcome / index page
  return (
    <div className="app-shell">
      <nav className="navbar">
        <button className="brand" type="button" onClick={handleHome}>
          <Compass size={28} />
          <span>Roam India</span>
        </button>

        <button
          className="nav-map-button"
          type="button"
          onClick={handleGuestExplore}
        >
          <MapPin size={17} />
          Explore India
        </button>
      </nav>

      <main className="welcome-container">
        <section className="welcome-hero">
          <div className="welcome-copy">
            <span className="welcome-eyebrow">
              <Globe2 size={16} />
              YOUR NEXT ADVENTURE STARTS HERE
            </span>

            <h1>
              Discover places.
              <br />
              <span>Collect experiences.</span>
            </h1>

            <p>
              Explore India's beautiful destinations, discover famous
              tourist attractions, and find their locations on an
              interactive map. Your next adventure starts here.
            </p>

            <button
              className="primary-button"
              type="button"
              onClick={handleGuestExplore}
            >
              Explore destinations <ArrowRight size={18} />
            </button>
          </div>

          <div className="welcome-visual">
            <div className="welcome-image-card">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=85"
                alt="Scenic travel landscape"
              />

              <div className="welcome-image-caption">
                <MapPin size={17} />
                <div>
                  <strong>Discover Incredible India</strong>
                  <span>Find your next adventure</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="entry-section">
          <div className="section-heading">
            <span className="welcome-eyebrow">GET STARTED</span>
            <h2>How would you like to explore?</h2>
            <p>
              Sign in to access traveller features, or browse destinations
              as a guest.
            </p>
          </div>

          <div className="entry-cards">
            <article className="entry-card">
              <div className="entry-icon user-icon">
                <UserRound size={27} />
              </div>
              <h3>Traveller</h3>
              <p>
                Log in or create an account to explore destinations and
                submit places for review.
              </p>
              <div className="entry-actions">
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => goTo("user-login")}
                >
                  User Login <ArrowRight size={17} />
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => goTo("user-signup")}
                >
                  Create Account
                </button>
              </div>
            </article>

            <article className="entry-card">
              <div className="entry-icon admin-icon">
                <ShieldCheck size={27} />
              </div>
              <h3>Administrator</h3>
              <p>
                Manage destinations and review submitted places with an
                authorised administrator account.
              </p>
              <div className="entry-actions">
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => goTo("admin-login")}
                >
                  Admin Login <ArrowRight size={17} />
                </button>
              </div>
            </article>

            <article className="entry-card guest-card">
              <div className="entry-icon guest-icon">
                <Compass size={27} />
              </div>
              <h3>Continue as Guest</h3>
              <p>
                Browse famous Indian destinations and open their locations
                in Google Maps without signing in.
              </p>
              <div className="entry-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={handleGuestExplore}
                >
                  Browse India <ArrowRight size={17} />
                </button>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <Compass size={17} />
        Roam India · Discover places worth visiting
      </footer>
    </div>
  );
}
