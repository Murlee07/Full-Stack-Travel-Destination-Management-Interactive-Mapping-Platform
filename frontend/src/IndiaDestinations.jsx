import { useMemo, useState } from "react";
import {
  ArrowRight,
  Compass,
  Heart,
  MapPin,
  Search,
  LogOut,
  PlusCircle,
  Map,
  SlidersHorizontal,
} from "lucide-react";
import "./IndiaDestinations.css";

const destinations = [
  {
    name: "Munnar",
    state: "Kerala",
    category: "Mountains",
    badge: "Nature escape",
    description: "Rolling tea gardens, misty mountains and peaceful nature trails.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    query: "Munnar Kerala India",
  },
  {
    name: "Alleppey",
    state: "Kerala",
    category: "Nature",
    badge: "Backwater escape",
    description: "Cruise palm-lined backwaters and explore beautiful waterways.",
    image: "https://images.unsplash.com/photo-1602301410751-8f7f9f40b7d8?auto=format&fit=crop&w=900&q=85",
    query: "Alleppey Alappuzha Kerala",
  },
  {
    name: "Pondicherry",
    state: "Puducherry",
    category: "Coastal",
    badge: "Coastal charm",
    description: "French-inspired streets, seaside promenades and relaxed cafés.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=85",
    query: "White Town Pondicherry India",
  },
  {
    name: "Bastar",
    state: "Chhattisgarh",
    category: "Nature",
    badge: "Hidden gem",
    description: "Discover waterfalls, forest landscapes and rich tribal culture.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",
    query: "Bastar Chhattisgarh India",
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    category: "Heritage",
    badge: "Royal heritage",
    description: "Explore grand forts, royal palaces and colourful bazaars.",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=85",
    query: "Jaipur Rajasthan India",
  },
  {
    name: "Tawang",
    state: "Arunachal Pradesh",
    category: "Mountains",
    badge: "Himalayan escape",
    description: "Experience Himalayan scenery, mountain passes and monasteries.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
    query: "Tawang Arunachal Pradesh India",
  },
  {
    name: "Kodaikanal",
    state: "Tamil Nadu",
    category: "Mountains",
    badge: "Hill station",
    description: "Enjoy misty hills, pine forests, lakes and scenic viewpoints.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=85",
    query: "Kodaikanal Tamil Nadu India",
  },
  {
    name: "Goa",
    state: "Goa",
    category: "Coastal",
    badge: "Beach getaway",
    description: "Golden beaches, Portuguese heritage and beautiful sunsets.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
    query: "Goa India",
  },
  {
    name: "Agra",
    state: "Uttar Pradesh",
    category: "Heritage",
    badge: "Iconic landmark",
    description: "Discover the Taj Mahal and the remarkable Mughal legacy.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=85",
    query: "Taj Mahal Agra India",
  },
  {
    name: "Ooty",
    state: "Tamil Nadu",
    category: "Mountains",
    badge: "Mountain retreat",
    description: "Visit tea estates, gardens and scenic Nilgiri hill viewpoints.",
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=85",
    query: "Ooty Tamil Nadu India",
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    category: "Culture",
    badge: "Spiritual heritage",
    description: "Experience ancient riverside ghats, temples and cultural traditions.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=85",
    query: "Varanasi Uttar Pradesh India",
  },
  {
    name: "Udaipur",
    state: "Rajasthan",
    category: "Heritage",
    badge: "City of lakes",
    description: "Explore lakeside palaces, old streets and romantic city views.",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=900&q=85",
    query: "Udaipur Rajasthan India",
  },
  {
    name: "Darjeeling",
    state: "West Bengal",
    category: "Mountains",
    badge: "Tea country",
    description: "Enjoy mountain panoramas, tea gardens and heritage railway journeys.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85",
    query: "Darjeeling West Bengal India",
  },
  {
    name: "Rishikesh",
    state: "Uttarakhand",
    category: "Nature",
    badge: "River adventure",
    description: "Explore the Ganges, foothill scenery, yoga centres and river activities.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    query: "Rishikesh Uttarakhand India",
  },
  {
    name: "Hampi",
    state: "Karnataka",
    category: "Heritage",
    badge: "Ancient wonder",
    description: "Walk among remarkable temple ruins and dramatic boulder-strewn landscapes.",
    image: "https://images.unsplash.com/photo-1600100397608-f010d1c7b3b7?auto=format&fit=crop&w=900&q=85",
    query: "Hampi Karnataka India",
  },
  {
    name: "Shillong",
    state: "Meghalaya",
    category: "Nature",
    badge: "Green escape",
    description: "Discover green hills, waterfalls and the culture of Northeast India.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
    query: "Shillong Meghalaya India",
  },
];

const categories = [
  "All",
  "Mountains",
  "Heritage",
  "Coastal",
  "Nature",
  "Culture",
];

export default function IndiaDestinations({
  user,
  onExploreMap,
  onSubmitDestination,
  onLogout,
  onExploreDestination,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const filteredDestinations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesSearch =
        !term ||
        destination.name.toLowerCase().includes(term) ||
        destination.state.toLowerCase().includes(term) ||
        destination.description.toLowerCase().includes(term);

      const matchesCategory =
        activeCategory === "All" ||
        destination.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const toggleFavorite = (name) => {
    setFavorites((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  };

  const handleExplore = (destination) => {
    if (onExploreDestination) {
      onExploreDestination(destination);
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination.query)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="india-page">
      <header className="india-navbar">
        <a className="india-brand" href="#top">
          <Compass size={27} />
          <span>Roam India</span>
        </a>

        <nav className="india-nav-actions">
          <button className="india-nav-button" onClick={onExploreMap} type="button">
            <Map size={17} /> Explore Map
          </button>

          {user?.role === "USER" && (
            <button className="india-nav-button" onClick={onSubmitDestination} type="button">
              <PlusCircle size={17} /> Share a Place
            </button>
          )}

          {user && (
            <span className="india-user-name">
              Hi, {user.name || user.username || "Traveller"}
            </span>
          )}

          {onLogout && (
            <button className="india-logout-button" onClick={onLogout} type="button">
              <LogOut size={17} /> <span>Exit</span>
            </button>
          )}
        </nav>
      </header>

      <main id="top">
        <section className="india-hero">
          <div className="india-hero-copy">
            <span className="india-eyebrow">
              <Compass size={16} /> THE INDIA TRAVEL COLLECTION
            </span>
            <h1>
              Find your next
              <br />
              <em>beautiful escape.</em>
            </h1>
            <p>
              From Himalayan hideaways to tropical backwaters and royal cities,
              discover incredible places across India.
            </p>
            <button className="india-primary-button" onClick={onExploreMap} type="button">
              Explore the map <ArrowRight size={18} />
            </button>
          </div>

          <div className="india-hero-photo">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1300&q=85"
              alt="Scenic travel landscape"
            />
            <div className="india-photo-caption">
              <MapPin size={17} />
              <span>Incredible India awaits</span>
            </div>
          </div>
        </section>

        <section className="india-collection">
          <div className="india-section-heading">
            <div>
              <span className="india-eyebrow">HANDPICKED FOR YOU</span>
              <h2>Explore India’s most loved places</h2>
              <p>Find your destination, discover its highlights and plan your next trip.</p>
            </div>
            <span className="india-total">{filteredDestinations.length} destinations</span>
          </div>

          <div className="india-controls">
            <label className="india-search">
              <Search size={19} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search a place, state or experience..."
              />
            </label>
            <div className="india-filter-label">
              <SlidersHorizontal size={17} /> Filter
            </div>
          </div>

          <div className="india-categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`india-category-chip ${activeCategory === category ? "selected" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="india-grid">
              {filteredDestinations.map((destination) => {
                const favorite = favorites.includes(destination.name);

                return (
                  <article className="india-card" key={destination.name}>
                    <div className="india-card-photo">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                      <span className="india-badge">{destination.badge}</span>
                      <button
                        className={`india-heart ${favorite ? "is-favorite" : ""}`}
                        type="button"
                        aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
                        aria-pressed={favorite}
                        onClick={() => toggleFavorite(destination.name)}
                      >
                        <Heart size={21} fill={favorite ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className="india-card-body">
                      <div className="india-location">
                        <MapPin size={15} /> {destination.state}
                      </div>
                      <h3>{destination.name}</h3>
                      <p>{destination.description}</p>
                      <div className="india-card-bottom">
                        <span className="india-tag">{destination.category}</span>
                        <button
                          className="india-explore-link"
                          type="button"
                          onClick={() => handleExplore(destination)}
                        >
                          Explore <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="india-empty">
              <Search size={30} />
              <h3>No destinations found</h3>
              <p>Try another search or select a different category.</p>
              <button
                className="india-primary-button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                type="button"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {user?.role === "USER" && (
          <section className="india-share-banner">
            <div>
              <span className="india-eyebrow">SHARE YOUR DISCOVERY</span>
              <h2>Know a place worth visiting?</h2>
              <p>Submit a destination for review and help other travellers discover it.</p>
            </div>
            <button className="india-primary-button" onClick={onSubmitDestination} type="button">
              Share a destination <ArrowRight size={18} />
            </button>
          </section>
        )}
      </main>

      <footer className="india-footer">
        <Compass size={19} />
        <span>Roam India · Discover places worth visiting</span>
      </footer>
    </div>
  );
}
