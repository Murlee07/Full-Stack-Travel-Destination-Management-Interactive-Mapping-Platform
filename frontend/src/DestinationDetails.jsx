import { useMemo, useState } from "react";
import { ArrowLeft, MapPin, Search, ExternalLink, Compass } from "lucide-react";
import "./DestinationDetails.css";

const destinationGuides = {
  Munnar: {
    state: "Kerala, India",
    subtitle: "Explore misty mountains, tea plantations, waterfalls and peaceful nature trails.",
    hero: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=85",
    places: [
      {
        name: "Eravikulam National Park",
        type: "Wildlife & nature",
        description: "Explore rolling grasslands, mountain scenery and the habitat of the endangered Nilgiri tahr.",
        location: "Eravikulam National Park, Munnar, Kerala",
        bestTime: "Morning",
        maps: "Eravikulam National Park Munnar"
      },
      {
        name: "Mattupetty Dam",
        type: "Lake & viewpoints",
        description: "Enjoy views of the reservoir surrounded by green hills. Boating may be available depending on local operations.",
        location: "Mattupetty Dam, Munnar, Kerala",
        bestTime: "Morning or afternoon",
        maps: "Mattupetty Dam Munnar"
      },
      {
        name: "Top Station",
        type: "Mountain viewpoint",
        description: "A scenic high-altitude viewpoint known for wide views of the Western Ghats and surrounding valleys.",
        location: "Top Station, near Munnar, Kerala",
        bestTime: "Early morning",
        maps: "Top Station Munnar"
      },
      {
        name: "Tea Museum",
        type: "History & culture",
        description: "Learn about the history of tea production in the Munnar region and see exhibits related to tea processing.",
        location: "Tata Tea Museum, Nullatanni, Munnar, Kerala",
        bestTime: "Check current museum hours",
        maps: "Tata Tea Museum Munnar"
      },
      {
        name: "Attukad Waterfalls",
        type: "Waterfall",
        description: "A waterfall set among green hills, popular for scenery and photography. Access can depend on weather conditions.",
        location: "Attukad Waterfalls, Pallivasal, Munnar, Kerala",
        bestTime: "After the rains, when access is safe",
        maps: "Attukad Waterfalls Munnar"
      },
      {
        name: "Pothamedu View Point",
        type: "Scenic viewpoint",
        description: "Look out across tea plantations, misty hills and valleys around Munnar.",
        location: "Pothamedu View Point, Munnar, Kerala",
        bestTime: "Early morning or sunset",
        maps: "Pothamedu View Point Munnar"
      },
      {
        name: "Kundala Lake",
        type: "Lake & nature",
        description: "A peaceful lake surrounded by forested hills and tea estates, suitable for a scenic stop.",
        location: "Kundala Lake, near Munnar, Kerala",
        bestTime: "Morning",
        maps: "Kundala Lake Munnar"
      },
      {
        name: "Blossom Hydel Park",
        type: "Garden & recreation",
        description: "A landscaped park near Munnar town for a relaxed walk and time outdoors.",
        location: "Blossom Hydel Park, Munnar, Kerala",
        bestTime: "Daytime; check local opening hours",
        maps: "Blossom Hydel Park Munnar"
      }
    ]
  },

  Jaipur: {
    state: "Rajasthan, India",
    subtitle: "Discover grand forts, royal palaces, colourful markets and Rajasthan's rich heritage.",
    hero: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1800&q=85",
    places: [
      { name: "Amber Fort", type: "Fort & heritage", description: "Explore a hilltop fort complex known for its courtyards, grand gateways and ornate halls.", location: "Amber Fort, Amer, Jaipur, Rajasthan", bestTime: "Morning", maps: "Amber Fort Jaipur" },
      { name: "Hawa Mahal", type: "Architecture", description: "See Jaipur's iconic Palace of Winds, famous for its distinctive pink facade and rows of windows.", location: "Hawa Mahal, Badi Choupad, Jaipur, Rajasthan", bestTime: "Morning", maps: "Hawa Mahal Jaipur" },
      { name: "City Palace", type: "Royal heritage", description: "Visit a historic palace complex with courtyards, museums and royal architecture.", location: "City Palace, Jaipur, Rajasthan", bestTime: "Morning", maps: "City Palace Jaipur" },
      { name: "Jantar Mantar", type: "Science & history", description: "Discover a UNESCO-listed astronomical observatory featuring monumental historic instruments.", location: "Jantar Mantar, Jaipur, Rajasthan", bestTime: "Morning", maps: "Jantar Mantar Jaipur" },
      { name: "Nahargarh Fort", type: "Fort & viewpoint", description: "Enjoy hilltop views over Jaipur and explore a historic fort overlooking the city.", location: "Nahargarh Fort, Jaipur, Rajasthan", bestTime: "Late afternoon", maps: "Nahargarh Fort Jaipur" },
      { name: "Jal Mahal", type: "Lake & architecture", description: "Photograph the palace appearing to float in Man Sagar Lake. Viewing is generally from the lakeside.", location: "Jal Mahal, Amer Road, Jaipur, Rajasthan", bestTime: "Early morning or sunset", maps: "Jal Mahal Jaipur" }
    ]
  },

  Kodaikanal: {
    state: "Tamil Nadu, India",
    subtitle: "Discover cool mountain air, pine forests, lakes and spectacular hill viewpoints.",
    hero: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=85",
    places: [
      { name: "Kodaikanal Lake", type: "Lake & recreation", description: "Walk around the star-shaped lake or enjoy available boating and cycling activities.", location: "Kodaikanal Lake, Kodaikanal, Tamil Nadu", bestTime: "Morning or evening", maps: "Kodaikanal Lake" },
      { name: "Coaker's Walk", type: "Walking trail", description: "Take a scenic walk along a hillside promenade with views over valleys and surrounding hills.", location: "Coaker's Walk, Kodaikanal, Tamil Nadu", bestTime: "Early morning", maps: "Coakers Walk Kodaikanal" },
      { name: "Bryant Park", type: "Garden", description: "Explore a botanical garden with landscaped grounds, flowers and seasonal displays.", location: "Bryant Park, Kodaikanal, Tamil Nadu", bestTime: "Morning", maps: "Bryant Park Kodaikanal" },
      { name: "Pillar Rocks", type: "Viewpoint", description: "See three prominent rock pillars rising above a forested valley.", location: "Pillar Rocks Viewpoint, Kodaikanal, Tamil Nadu", bestTime: "Morning", maps: "Pillar Rocks Kodaikanal" },
      { name: "Pine Forest", type: "Forest & photography", description: "Walk through a picturesque pine plantation and enjoy the cool forest setting.", location: "Pine Forest, Kodaikanal, Tamil Nadu", bestTime: "Morning", maps: "Pine Forest Kodaikanal" },
      { name: "Silver Cascade Falls", type: "Waterfall", description: "A roadside waterfall that makes a popular photo stop on the approach to Kodaikanal.", location: "Silver Cascade Falls, Kodaikanal, Tamil Nadu", bestTime: "Daytime; take care near the road", maps: "Silver Cascade Falls Kodaikanal" }
    ]
  },

  Puducherry: {
    state: "Puducherry, India",
    subtitle: "Enjoy French-inspired streets, seaside walks, historic architecture and relaxed cafés.",
    hero: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1800&q=85",
    places: [
      { name: "Promenade Beach", type: "Beach & walking", description: "Walk along the seafront promenade and enjoy the coastal atmosphere.", location: "Promenade Beach, White Town, Puducherry", bestTime: "Early morning or evening", maps: "Promenade Beach Puducherry" },
      { name: "Sri Aurobindo Ashram", type: "Spiritual & cultural", description: "Visit a well-known spiritual community. Respect its rules and quiet atmosphere.", location: "Sri Aurobindo Ashram, White Town, Puducherry", bestTime: "Check visitor hours", maps: "Sri Aurobindo Ashram Puducherry" },
      { name: "French Quarter (White Town)", type: "Architecture & walking", description: "Explore colourful colonial-era streets, distinctive facades, boutiques and cafés.", location: "White Town, Puducherry", bestTime: "Morning or late afternoon", maps: "White Town Puducherry" },
      { name: "Paradise Beach", type: "Beach", description: "Visit a sandy beach generally accessed by boat from the Chunnambar area; check services and conditions.", location: "Paradise Beach, near Chunnambar, Puducherry", bestTime: "Morning", maps: "Paradise Beach Puducherry" },
      { name: "Basilica of the Sacred Heart of Jesus", type: "Church & architecture", description: "See a prominent church known for its architecture and stained-glass details.", location: "Sacred Heart Basilica, Subbiah Salai, Puducherry", bestTime: "Outside service times", maps: "Basilica Sacred Heart Jesus Puducherry" },
      { name: "Auroville and Matrimandir viewpoint", type: "Community & architecture", description: "Learn about Auroville and visit permitted public areas. Access to Matrimandir viewing areas may require advance arrangements.", location: "Auroville, near Puducherry, Tamil Nadu", bestTime: "Check official visitor arrangements", maps: "Auroville Visitor Centre" }
    ]
  },

  Goa: {
    state: "Goa, India",
    subtitle: "Explore sandy beaches, Portuguese-era heritage, lively coastal towns and tropical scenery.",
    hero: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=85",
    places: [
      { name: "Baga Beach", type: "Beach & activities", description: "A popular beach area known for waterside restaurants and seasonal beach activities.", location: "Baga Beach, North Goa, Goa", bestTime: "Morning or sunset", maps: "Baga Beach Goa" },
      { name: "Fort Aguada", type: "Fort & history", description: "Explore a historic Portuguese-era fort with coastal views.", location: "Fort Aguada, Sinquerim, Goa", bestTime: "Morning or late afternoon", maps: "Fort Aguada Goa" },
      { name: "Basilica of Bom Jesus", type: "Heritage & architecture", description: "Visit a renowned historic church in Old Goa, recognised as a UNESCO World Heritage site.", location: "Basilica of Bom Jesus, Old Goa, Goa", bestTime: "Morning; check visitor rules", maps: "Basilica of Bom Jesus Goa" },
      { name: "Dudhsagar Falls", type: "Waterfall & nature", description: "See a dramatic waterfall surrounded by forest. Access rules, transport and seasonal conditions vary.", location: "Dudhsagar Falls, Goa-Karnataka border region", bestTime: "Check seasonal access before travelling", maps: "Dudhsagar Falls Goa" },
      { name: "Palolem Beach", type: "Beach & relaxation", description: "Enjoy a curved beach in South Goa known for its scenic shoreline.", location: "Palolem Beach, Canacona, South Goa", bestTime: "Morning or sunset", maps: "Palolem Beach Goa" },
      { name: "Fontainhas", type: "Heritage neighbourhood", description: "Walk through a colourful Latin Quarter known for its old houses and narrow lanes.", location: "Fontainhas, Panaji, Goa", bestTime: "Morning or late afternoon", maps: "Fontainhas Panaji Goa" }
    ]
  },

  Agra: {
    state: "Uttar Pradesh, India",
    subtitle: "Explore Mughal architecture, marble craftsmanship and centuries of history.",
    hero: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1800&q=85",
    places: [
      { name: "Taj Mahal", type: "World heritage", description: "Visit the famous white-marble mausoleum and its formal gardens. Check ticketing and visiting-day rules.", location: "Taj Mahal, Dharmapuri, Agra, Uttar Pradesh", bestTime: "Early morning", maps: "Taj Mahal Agra" },
      { name: "Agra Fort", type: "Fort & history", description: "Explore a vast red sandstone fort associated with the Mughal emperors.", location: "Agra Fort, Rakabganj, Agra, Uttar Pradesh", bestTime: "Morning", maps: "Agra Fort" },
      { name: "Mehtab Bagh", type: "Garden & viewpoint", description: "A garden across the river offering views towards the Taj Mahal.", location: "Mehtab Bagh, Agra, Uttar Pradesh", bestTime: "Late afternoon", maps: "Mehtab Bagh Agra" },
      { name: "Itimad-ud-Daulah's Tomb", type: "Architecture", description: "Discover an ornate Mughal tomb known for its delicate decorative work.", location: "Itimad-ud-Daulah's Tomb, Agra, Uttar Pradesh", bestTime: "Morning", maps: "Itimad ud Daulah Tomb Agra" },
      { name: "Akbar's Tomb, Sikandra", type: "Mughal heritage", description: "Visit the monumental tomb complex of Emperor Akbar, set in landscaped grounds.", location: "Akbar's Tomb, Sikandra, Agra, Uttar Pradesh", bestTime: "Morning", maps: "Akbar Tomb Sikandra Agra" },
      { name: "Fatehpur Sikri", type: "Historic city", description: "Explore the historic Mughal city and its monumental architecture outside central Agra.", location: "Fatehpur Sikri, Uttar Pradesh", bestTime: "Start early; allow travel time", maps: "Fatehpur Sikri Uttar Pradesh" }
    ]
  },

  Ooty: {
    state: "Tamil Nadu, India",
    subtitle: "Experience tea gardens, scenic viewpoints, gardens and a classic hill-station atmosphere.",
    hero: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1800&q=85",
    places: [
      { name: "Government Botanical Garden", type: "Garden", description: "Walk through landscaped gardens featuring a wide variety of plants and trees.", location: "Government Botanical Garden, Ooty, Tamil Nadu", bestTime: "Morning", maps: "Government Botanical Garden Ooty" },
      { name: "Ooty Lake", type: "Lake & recreation", description: "Enjoy a lakeside visit, with boating and other activities depending on current operations.", location: "Ooty Lake, Ooty, Tamil Nadu", bestTime: "Morning or evening", maps: "Ooty Lake" },
      { name: "Doddabetta Peak", type: "Mountain viewpoint", description: "Visit one of the area's best-known high viewpoints for views of the Nilgiri hills.", location: "Doddabetta Peak, near Ooty, Tamil Nadu", bestTime: "Early morning", maps: "Doddabetta Peak Ooty" },
      { name: "Rose Garden", type: "Garden", description: "Explore terraced gardens with rose varieties and seasonal blooms.", location: "Government Rose Garden, Ooty, Tamil Nadu", bestTime: "Morning", maps: "Government Rose Garden Ooty" },
      { name: "Nilgiri Mountain Railway", type: "Heritage railway", description: "Experience the historic mountain railway on available routes and services; book in advance when possible.", location: "Ooty Railway Station, Ooty, Tamil Nadu", bestTime: "Check train timetable", maps: "Ooty Railway Station" },
      { name: "Pykara Lake and Falls", type: "Lake & waterfall", description: "Explore a scenic lake and nearby waterfall area outside Ooty; conditions and access vary seasonally.", location: "Pykara, near Ooty, Tamil Nadu", bestTime: "Daytime; check local access", maps: "Pykara Lake Ooty" }
    ]
  },

  Alleppey: {
    state: "Kerala, India",
    subtitle: "Cruise palm-lined backwaters, relax beside the coast and explore Kerala's waterways.",
    hero: "https://images.unsplash.com/photo-1602301410751-8f7f9f40b7d8?auto=format&fit=crop&w=1800&q=85",
    places: [
      { name: "Alappuzha Backwaters", type: "Backwaters & boating", description: "Experience canals, lagoons and village scenery on an authorised boat trip.", location: "Alappuzha Backwaters, Alappuzha, Kerala", bestTime: "Morning or afternoon", maps: "Alappuzha Backwaters Kerala" },
      { name: "Alappuzha Beach", type: "Beach & lighthouse", description: "Take a coastal walk and see the historic pier area; follow local safety guidance near the water.", location: "Alappuzha Beach, Alappuzha, Kerala", bestTime: "Sunrise or sunset", maps: "Alappuzha Beach" },
      { name: "Marari Beach", type: "Beach & relaxation", description: "A quieter coastal area suitable for relaxing and enjoying the shoreline.", location: "Marari Beach, Mararikulam, Kerala", bestTime: "Early morning or sunset", maps: "Marari Beach Kerala" },
      { name: "Pathiramanal Island", type: "Island & birdlife", description: "A small island on Vembanad Lake known for its natural setting and birdlife. Boat access depends on local services.", location: "Pathiramanal Island, Vembanad Lake, Kerala", bestTime: "Morning; check boat availability", maps: "Pathiramanal Island Kerala" },
      { name: "Krishnapuram Palace", type: "Palace & museum", description: "Visit a historic palace known for traditional Kerala architecture and museum exhibits.", location: "Krishnapuram Palace, Kayamkulam, Kerala", bestTime: "Check current opening hours", maps: "Krishnapuram Palace Kerala" },
      { name: "Kuttanad", type: "Village & countryside", description: "Discover Kerala's backwater countryside, paddy fields and village landscapes.", location: "Kuttanad, Alappuzha district, Kerala", bestTime: "Morning", maps: "Kuttanad Kerala" }
    ]
  }
};

function getGoogleMapsUrl(place) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.maps || place.location || place.name
  )}`;
}

export default function DestinationDetails({
  destination,
  onBack,
  onExploreMap
}) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const guide = destinationGuides[destination?.name] || {
    state: destination?.state || destination?.location || "India",
    subtitle: destination?.description || `Explore popular tourist attractions in ${destination?.name || "this destination"}.`,
    hero: destination?.image || destination?.image_url || "",
    places: []
  };

  const types = useMemo(
    () => ["All", ...new Set(guide.places.map((place) => place.type))],
    [guide.places]
  );

  const filteredPlaces = guide.places.filter((place) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      place.name.toLowerCase().includes(term) ||
      place.description.toLowerCase().includes(term) ||
      place.location.toLowerCase().includes(term);

    return matchesSearch &&
      (selectedType === "All" || place.type === selectedType);
  });

  return (
    <main className="destination-guide">
      <header className="guide-topbar">
        <button className="guide-back-button" onClick={onBack}>
          <ArrowLeft size={18} /> Back to destinations
        </button>
        <div className="guide-brand">
          <Compass size={22} /> Travel Explorer
        </div>
      </header>

      <section className="guide-hero">
        {guide.hero && (
          <img
            className="guide-hero-image"
            src={guide.hero}
            alt={`${destination?.name} landscape`}
          />
        )}
        <div className="guide-hero-overlay" />
        <div className="guide-hero-content">
          <span className="guide-eyebrow">DESTINATION GUIDE</span>
          <h1>{destination?.name || "Explore India"}</h1>
          <p className="guide-state"><MapPin size={17} /> {guide.state}</p>
          <p className="guide-subtitle">{guide.subtitle}</p>
          <button className="guide-primary-button" onClick={onExploreMap}>
            Explore destination map <ExternalLink size={17} />
          </button>
        </div>
      </section>

      <section className="guide-main">
        <div className="guide-section-heading">
          <div>
            <span className="guide-eyebrow guide-eyebrow-dark">PLAN YOUR VISIT</span>
            <h2>Tourist places in {destination?.name}</h2>
            <p>Discover places to visit, read a quick overview and open their locations in Google Maps.</p>
          </div>
          <span className="guide-count">{filteredPlaces.length} places</span>
        </div>

        <div className="guide-filters">
          <div className="guide-search">
            <Search size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tourist places..."
              aria-label="Search tourist places"
            />
          </div>
          <select
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            aria-label="Filter by place type"
          >
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {filteredPlaces.length > 0 ? (
          <div className="guide-places-grid">
            {filteredPlaces.map((place, index) => (
              <article className="guide-place-card" key={place.name}>
                <div className="guide-place-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <span className="guide-place-type">{place.type}</span>
                <h3>{place.name}</h3>
                <p className="guide-place-description">{place.description}</p>

                <div className="guide-location">
                  <MapPin size={18} />
                  <div>
                    <strong>Location</strong>
                    <p>{place.location}</p>
                  </div>
                </div>

                <div className="guide-best-time">
                  <strong>Suggested time</strong>
                  <span>{place.bestTime}</span>
                </div>

                <a
                  className="guide-map-link"
                  href={getGoogleMapsUrl(place)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps <ExternalLink size={17} />
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="guide-empty">
            <Search size={30} />
            <h3>No tourist places found</h3>
            <p>Try another search term or choose a different category.</p>
          </div>
        )}

        {guide.places.length === 0 && (
          <div className="guide-note">
            A detailed attraction list has not been added for this destination yet.
            The page structure is ready, so you can add its attractions to
            <code> destinationGuides </code> in <code>DestinationDetails.jsx</code>.
          </div>
        )}

        <div className="guide-travel-note">
          <strong>Before you travel:</strong> Opening hours, entry rules, road access
          and weather conditions can change. Confirm local details before setting out.
        </div>
      </section>

      <footer className="guide-footer">
        <Compass size={18} /> Travel Explorer · Discover places worth visiting
      </footer>
    </main>
  );
}
