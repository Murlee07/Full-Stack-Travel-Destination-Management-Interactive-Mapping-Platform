import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  ArrowLeft,
  Compass,
  Home,
  MapPin,
  RefreshCw,
  Search,
  ExternalLink,
} from "lucide-react";
import "./Destinations.css";

// Correct Leaflet marker assets for Vite.
const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const defaultCenter = [22.9734, 78.6569];

function MapRecenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, { duration: 0.8 });
    }
  }, [map, position]);

  return null;
}

export default function Destinations({ onBack, onHome }) {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiBase = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace(/\/$/, "");

  const loadDestinations = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiBase}/destinations`);

      if (!response.ok) {
        throw new Error("Could not load destinations from the server.");
      }

      const data = await response.json();

      // Supports either { destinations: [...] } or a direct array.
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.destinations)
          ? data.destinations
          : [];

      setDestinations(
        list.filter((destination) => {
          const latitude = Number(destination.latitude);
          const longitude = Number(destination.longitude);

          return (
            Number.isFinite(latitude) &&
            Number.isFinite(longitude) &&
            latitude >= -90 &&
            latitude <= 90 &&
            longitude >= -180 &&
            longitude <= 180
          );
        })
      );
    } catch (err) {
      setError(
        `${err.message} Check that your backend is running and the destinations API is available.`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDestinations();
    // Load the destination list when this page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredDestinations = destinations.filter((destination) => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return true;

    return [
      destination.name,
      destination.city,
      destination.country,
      destination.description,
    ].some((value) => String(value || "").toLowerCase().includes(term));
  });

  const getPosition = (destination) => [
    Number(destination.latitude),
    Number(destination.longitude),
  ];

  const focusDestination = (destination) => {
    setSelectedDestination(destination);
  };

  const openGoogleMaps = (destination) => {
    const query = `${destination.name || ""} ${destination.city || ""} ${
      destination.country || ""
    }`.trim();

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const selectedPosition = selectedDestination
    ? getPosition(selectedDestination)
    : null;

  return (
    <main className="map-page">
      <header className="map-navbar">
        <button
          className="map-brand"
          type="button"
          onClick={onHome}
          aria-label="Return to main page"
        >
          <Compass size={26} />
          <span>Roam India</span>
        </button>

        <div className="map-navbar-actions">
          <button
            className="map-nav-button"
            type="button"
            onClick={onHome}
          >
            <Home size={17} />
            Home
          </button>

          <button
            className="map-nav-button"
            type="button"
            onClick={onBack}
          >
            <ArrowLeft size={17} />
            Destinations
          </button>
        </div>
      </header>

      <section className="map-heading">
        <div>
          <span className="map-eyebrow">
            <MapPin size={15} />
            EXPLORE INDIA
          </span>

          <h1>Discover places on the map</h1>

          <p>
            Select a marker to see destination details, or open its location
            in Google Maps.
          </p>
        </div>

        <button
          className="map-refresh-button"
          type="button"
          onClick={loadDestinations}
          disabled={loading}
        >
          <RefreshCw size={16} />
          {loading ? "Loading..." : "Refresh"}
        </button>
      </section>

      <section className="map-workspace">
        <aside className="map-sidebar">
          <label className="map-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>

          <div className="map-list-heading">
            <h2>Destinations</h2>
            <span>{filteredDestinations.length}</span>
          </div>

          {loading && (
            <p className="map-status">Loading destinations...</p>
          )}

          {error && (
            <div className="map-error">
              <p>{error}</p>
              <button
                type="button"
                className="map-small-button"
                onClick={loadDestinations}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && filteredDestinations.length === 0 && (
            <p className="map-status">
              No destinations found. Try another search.
            </p>
          )}

          <div className="map-destination-list">
            {filteredDestinations.map((destination) => (
              <button
                className={`map-destination-item ${
                  selectedDestination?.id === destination.id
                    ? "active"
                    : ""
                }`}
                key={destination.id ?? destination.name}
                type="button"
                onClick={() => focusDestination(destination)}
              >
                <span className="map-item-icon">
                  <MapPin size={19} />
                </span>

                <span className="map-item-copy">
                  <strong>{destination.name}</strong>
                  <small>
                    {[destination.city, destination.country]
                      .filter(Boolean)
                      .join(", ") || "India"}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="map-canvas">
          <MapContainer
            center={defaultCenter}
            zoom={5}
            scrollWheelZoom
            className="leaflet-map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapRecenter position={selectedPosition} />

            {filteredDestinations.map((destination) => (
              <Marker
                key={destination.id ?? destination.name}
                position={getPosition(destination)}
                icon={markerIcon}
                eventHandlers={{
                  click: () => focusDestination(destination),
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <strong>{destination.name}</strong>

                    <p>
                      {[destination.city, destination.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>

                    {destination.description && (
                      <p>{destination.description}</p>
                    )}

                    <button
                      type="button"
                      onClick={() => openGoogleMaps(destination)}
                    >
                      Open Google Maps <ExternalLink size={14} />
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <div className="map-overlay-label">
            <MapPin size={16} />
            Interactive destination map
          </div>
        </div>
      </section>

      {selectedDestination && (
        <section className="map-selected-panel">
          <div>
            <span className="map-eyebrow">SELECTED DESTINATION</span>
            <h2>{selectedDestination.name}</h2>
            <p>
              {[selectedDestination.city, selectedDestination.country]
                .filter(Boolean)
                .join(", ") || "India"}
            </p>
            {selectedDestination.description && (
              <p>{selectedDestination.description}</p>
            )}
          </div>

          <button
            className="map-primary-button"
            type="button"
            onClick={() => openGoogleMaps(selectedDestination)}
          >
            View location <ExternalLink size={17} />
          </button>
        </section>
      )}

      <footer className="map-footer">
        <Compass size={17} />
        Roam India · Explore destinations across India
      </footer>
    </main>
  );
}
