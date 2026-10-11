
import { useEffect, useState } from "react";
import { ArrowLeft, Send, MapPin } from "lucide-react";
import "./SubmitDestination.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialForm = {
  name: "",
  country: "",
  city: "",
  description: "",
  category_id: "",
  latitude: "",
  longitude: "",
  image_url: "",
};

export default function SubmitDestination({ onBack }) {
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load categories.");
        }

        setCategories(data.categories || []);
      } catch (err) {
        setError(err.message || "Could not load categories.");
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const token = sessionStorage.getItem("travelToken");

    if (!token) {
      setError("Please log in with a regular user account first.");
      return;
    }

    const latitude = Number(form.latitude);
    const longitude = Number(form.longitude);

    if (
      form.latitude.trim() === "" ||
      form.longitude.trim() === "" ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      setError("Enter valid latitude and longitude coordinates.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/user/destinations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          category_id: form.category_id || null,
          latitude,
          longitude,
          image_url: form.image_url.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Destination submission failed.");
      }

      setMessage(
        data.message || "Destination submitted for admin approval."
      );
      setForm(initialForm);
    } catch (err) {
      setError(err.message || "Could not connect to the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="submit-page">
      <header className="submit-header">
        <div className="submit-brand">
          <MapPin size={25} />
          <span>WanderWise</span>
        </div>

        <button className="submit-back" onClick={onBack}>
          <ArrowLeft size={17} />
          Back
        </button>
      </header>

      <section className="submit-content">
        <span className="submit-eyebrow">SHARE A PLACE YOU LOVE</span>
        <h1>Submit a destination</h1>
        <p className="submit-intro">
          Recommend a place for other travellers to discover.
          Your submission will be reviewed by an administrator.
        </p>

        {message && (
          <div className="submit-success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="submit-error" role="alert">
            {error}
          </div>
        )}

        <form className="destination-form" onSubmit={handleSubmit}>
          <label>
            Destination name *
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Marina Beach"
              maxLength={150}
              required
            />
          </label>

          <div className="submit-two-columns">
            <label>
              Country *
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="e.g. India"
                maxLength={100}
                required
              />
            </label>

            <label>
              City *
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. Chennai"
                maxLength={100}
                required
              />
            </label>
          </div>

          <label>
            Description *
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What makes this destination special?"
              rows={4}
              maxLength={5000}
              required
            />
          </label>

          <label>
            Category
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              disabled={loadingCategories}
            >
              <option value="">
                {loadingCategories
                  ? "Loading categories..."
                  : "Select a category (optional)"}
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <div className="submit-two-columns">
            <label>
              Latitude *
              <input
                type="number"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="e.g. 13.0827"
                min="-90"
                max="90"
                step="any"
                required
              />
            </label>

            <label>
              Longitude *
              <input
                type="number"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="e.g. 80.2707"
                min="-180"
                max="180"
                step="any"
                required
              />
            </label>
          </div>

          <label>
            Image URL (optional)
            <input
              type="url"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </label>

          <button
            className="submit-button"
            type="submit"
            disabled={submitting || loadingCategories}
          >
            <Send size={17} />
            {submitting ? "Submitting..." : "Submit for approval"}
          </button>

          <small className="submit-note">
            Your destination will remain pending until an administrator
            reviews it.
          </small>
        </form>
      </section>
    </main>
  );
}
