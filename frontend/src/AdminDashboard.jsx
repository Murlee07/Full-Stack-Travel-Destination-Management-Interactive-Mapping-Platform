
import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCw,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import "./AdminDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminDashboard({ onBack }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadDestinations = useCallback(async () => {
    setLoading(true);
    setError("");

    const token = sessionStorage.getItem("travelToken");

    if (!token) {
      setError("Please log in with your administrator account.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/admin/destinations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load destinations."
        );
      }

      setDestinations(data.destinations || []);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDestinations();
  }, [loadDestinations]);

  async function changeStatus(id, status) {
    const token = sessionStorage.getItem("travelToken");

    setBusyId(id);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/admin/destinations/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed.");
      }

      setMessage(data.message || "Destination status updated.");
      await loadDestinations();
    } catch (err) {
      setError(err.message || "Status update failed.");
    } finally {
      setBusyId(null);
    }
  }

  async function deleteDestination(id) {
    if (!window.confirm("Delete this destination permanently?")) {
      return;
    }

    const token = sessionStorage.getItem("travelToken");

    setBusyId(id);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/admin/destinations/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed.");
      }

      setMessage(data.message || "Destination deleted.");
      await loadDestinations();
    } catch (err) {
      setError(err.message || "Delete failed.");
    } finally {
      setBusyId(null);
    }
  }

  const pendingCount = destinations.filter(
    (destination) => destination.status === "PENDING"
  ).length;

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div className="admin-brand">
          <span className="admin-brand-icon">
            <MapPin size={23} />
          </span>
          <div>
            <strong>WanderWise</strong>
            <small>Administration</small>
          </div>
        </div>

        <button
          className="admin-back-button"
          onClick={onBack}
        >
          <ArrowLeft size={17} />
          Back
        </button>
      </header>

      <section className="admin-content">
        <div className="admin-title-row">
          <div>
            <span className="admin-eyebrow">
              DESTINATION MANAGEMENT
            </span>
            <h1>Admin Dashboard</h1>
            <p>Review and manage destination listings.</p>
          </div>

          <button
            className="admin-refresh-button"
            onClick={loadDestinations}
            disabled={loading}
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <span>Total destinations</span>
            <strong>{destinations.length}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Pending review</span>
            <strong>{pendingCount}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Approved</span>
            <strong>
              {
                destinations.filter(
                  (destination) =>
                    destination.status === "APPROVED"
                ).length
              }
            </strong>
          </div>
        </div>

        {message && (
          <div className="admin-message" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="admin-error" role="alert">
            {error}
          </div>
        )}

        <section className="admin-table-section">
          <h2>All destinations</h2>

          {loading ? (
            <p>Loading destinations...</p>
          ) : destinations.length === 0 ? (
            <p>No destinations found.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Destination</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {destinations.map((destination) => (
                    <tr key={destination.id}>
                      <td>
                        <strong>{destination.name}</strong>
                        <small>
                          {destination.category_name ||
                            "Uncategorized"}
                        </small>
                      </td>

                      <td>
                        {destination.city}, {destination.country}
                      </td>

                      <td>
                        <span
                          className={`admin-status status-${String(
                            destination.status
                          ).toLowerCase()}`}
                        >
                          {destination.status}
                        </span>
                      </td>

                      <td>
                        <div className="admin-actions">
                          {destination.status !== "APPROVED" && (
                            <button
                              className="approve-button"
                              disabled={busyId !== null}
                              onClick={() =>
                                changeStatus(
                                  destination.id,
                                  "APPROVED"
                                )
                              }
                              title="Approve destination"
                            >
                              <CheckCircle size={16} />
                              Approve
                            </button>
                          )}

                          {destination.status !== "REJECTED" && (
                            <button
                              className="reject-button"
                              disabled={busyId !== null}
                              onClick={() =>
                                changeStatus(
                                  destination.id,
                                  "REJECTED"
                                )
                              }
                              title="Reject destination"
                            >
                              <XCircle size={16} />
                              Reject
                            </button>
                          )}

                          <button
                            className="delete-button"
                            disabled={busyId !== null}
                            onClick={() =>
                              deleteDestination(destination.id)
                            }
                            title="Delete destination"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
