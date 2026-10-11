const destinationGuides = {
  Munnar: {
    state: "Kerala",
    intro: "Explore misty mountains, tea plantations, waterfalls and peaceful nature trails.",
    places: [
      ["Eravikulam National Park", "Explore mountain grasslands and the habitat of the Nilgiri tahr.", "Eravikulam National Park, Munnar, Kerala", "Morning"],
      ["Mattupetty Dam", "Enjoy reservoir views surrounded by green hills.", "Mattupetty Dam, Munnar, Kerala", "Morning"],
      ["Top Station", "Take in panoramic views of the Western Ghats and surrounding valleys.", "Top Station, Munnar, Kerala", "Early morning"],
      ["Tata Tea Museum", "Learn about the region's tea-growing history and processing.", "Tata Tea Museum, Munnar, Kerala", "Check opening hours"],
      ["Attukad Waterfalls", "Visit a scenic waterfall set among forested hills.", "Attukad Waterfalls, Munnar, Kerala", "Check weather and access"],
      ["Pothamedu View Point", "See tea estates and misty valleys from a popular viewpoint.", "Pothamedu View Point, Munnar, Kerala", "Sunrise or sunset"],
      ["Kundala Lake", "Relax beside a lake surrounded by wooded hills.", "Kundala Lake, Munnar, Kerala", "Morning"],
      ["Blossom Hydel Park", "Enjoy landscaped gardens and a relaxed outdoor walk.", "Blossom Hydel Park, Munnar, Kerala", "Daytime"]
    ]
  },

  Alleppey: {
    state: "Kerala",
    intro: "Cruise palm-lined backwaters, relax beside the coast and discover Kerala's waterways.",
    places: [
      ["Alappuzha Backwaters", "Explore canals, lagoons and village scenery on a boat trip.", "Alappuzha Backwaters, Kerala", "Morning"],
      ["Alappuzha Beach", "Take a coastal walk and enjoy views of the Arabian Sea.", "Alappuzha Beach, Kerala", "Sunset"],
      ["Marari Beach", "Relax on a quieter sandy stretch near Mararikulam.", "Marari Beach, Kerala", "Morning or sunset"],
      ["Pathiramanal Island", "Discover a small lake island known for natural scenery and birdlife.", "Pathiramanal Island, Kerala", "Check boat availability"],
      ["Krishnapuram Palace", "See traditional Kerala architecture and historical exhibits.", "Krishnapuram Palace, Kayamkulam, Kerala", "Check opening hours"],
      ["Kuttanad", "Experience paddy fields, canals and rural backwater landscapes.", "Kuttanad, Alappuzha district, Kerala", "Morning"]
    ]
  },

  Pondicherry: {
    state: "Puducherry",
    intro: "Discover French-inspired streets, seaside walks, heritage architecture and cafés.",
    places: [
      ["Promenade Beach", "Walk along the seafront and enjoy the coastal atmosphere.", "Promenade Beach, Puducherry", "Early morning"],
      ["White Town", "Explore colourful colonial-era buildings, boutiques and cafés.", "White Town, Puducherry", "Morning"],
      ["Sri Aurobindo Ashram", "Visit a well-known spiritual community and respect its quiet atmosphere.", "Sri Aurobindo Ashram, Puducherry", "Check visitor hours"],
      ["Paradise Beach", "Enjoy a sandy beach commonly reached by boat from the Chunnambar area.", "Paradise Beach, Puducherry", "Morning"],
      ["Basilica of the Sacred Heart of Jesus", "Admire a historic church known for its architecture and stained glass.", "Sacred Heart Basilica, Puducherry", "Check service times"],
      ["Auroville Visitor Centre", "Learn about Auroville and its international community.", "Auroville Visitor Centre, Tamil Nadu", "Check visitor arrangements"]
    ]
  },

  Bastar: {
    state: "Chhattisgarh",
    intro: "Discover forest landscapes, waterfalls, caves and the rich cultural heritage of Bastar.",
    places: [
      ["Chitrakote Waterfalls", "See a wide waterfall on the Indravati River, especially impressive during the rainy season.", "Chitrakote Waterfalls, Bastar, Chhattisgarh", "Daytime; check seasonal conditions"],
      ["Tirathgarh Waterfalls", "Explore a multi-tiered waterfall surrounded by forest in Kanger Valley.", "Tirathgarh Waterfalls, Bastar, Chhattisgarh", "Daytime"],
      ["Kanger Valley National Park", "Discover forest scenery and diverse wildlife in a protected natural area.", "Kanger Valley National Park, Chhattisgarh", "Check park access"],
      ["Kutumsar Cave", "Learn about a limestone cave system; access may be restricted seasonally.", "Kutumsar Cave, Kanger Valley, Chhattisgarh", "Confirm local access"],
      ["Bastar Palace", "Learn about local royal history and Bastar's cultural heritage.", "Bastar Palace, Jagdalpur, Chhattisgarh", "Check visitor access"],
      ["Danteshwari Temple", "Visit an important regional temple in Dantewada.", "Danteshwari Temple, Dantewada, Chhattisgarh", "Check local guidance"]
    ]
  },

  Jaipur: {
    state: "Rajasthan",
    intro: "Discover royal palaces, pink streets, historic forts and colourful bazaars.",
    places: [
      ["Amber Fort", "Explore a hilltop fort complex with courtyards and ornate halls.", "Amber Fort, Jaipur, Rajasthan", "Morning"],
      ["Hawa Mahal", "See the famous Palace of Winds and its distinctive pink façade.", "Hawa Mahal, Jaipur, Rajasthan", "Morning"],
      ["City Palace", "Visit a historic royal complex with courtyards and museum collections.", "City Palace, Jaipur, Rajasthan", "Morning"],
      ["Jantar Mantar", "Explore an astronomical observatory with monumental historic instruments.", "Jantar Mantar, Jaipur, Rajasthan", "Morning"],
      ["Nahargarh Fort", "Enjoy panoramic views across Jaipur from the hills.", "Nahargarh Fort, Jaipur, Rajasthan", "Late afternoon"],
      ["Jal Mahal", "Photograph the palace beside Man Sagar Lake from the lakeside.", "Jal Mahal, Jaipur, Rajasthan", "Sunrise or sunset"],
      ["Albert Hall Museum", "Discover art, crafts and historical collections in an iconic building.", "Albert Hall Museum, Jaipur, Rajasthan", "Check opening hours"]
    ]
  },

  Tawang: {
    state: "Arunachal Pradesh",
    intro: "Explore Himalayan landscapes, Buddhist heritage, mountain passes and peaceful valleys.",
    places: [
      ["Tawang Monastery", "Visit a major Buddhist monastery overlooking the Tawang valley.", "Tawang Monastery, Arunachal Pradesh", "Morning"],
      ["Sela Pass", "Experience high-altitude Himalayan scenery along the mountain road.", "Sela Pass, Arunachal Pradesh", "Check road and weather conditions"],
      ["Madhuri Lake (Sangetsar Lake)", "See a striking high-altitude lake surrounded by rugged mountains.", "Sangetsar Lake, near Tawang, Arunachal Pradesh", "Check permits and road access"],
      ["Nuranang Waterfall", "Visit a dramatic waterfall amid forested mountain scenery.", "Nuranang Waterfall, Jang, Arunachal Pradesh", "Daytime"],
      ["Tawang War Memorial", "Learn about the region's military history and memorial.", "Tawang War Memorial, Arunachal Pradesh", "Check visitor hours"],
      ["Bum La Pass", "See a high mountain border area where travel requires special permission.", "Bum La Pass, near Tawang, Arunachal Pradesh", "Confirm permits and access"]
    ]
  },

  Kodaikanal: {
    state: "Tamil Nadu",
    intro: "Enjoy cool mountain air, forest trails, lakes and dramatic hill viewpoints.",
    places: [
      ["Kodaikanal Lake", "Walk around the star-shaped lake or enjoy available boating.", "Kodaikanal Lake, Tamil Nadu", "Morning or evening"],
      ["Coaker's Walk", "Take a scenic walk along a hillside path with valley views.", "Coaker's Walk, Kodaikanal, Tamil Nadu", "Early morning"],
      ["Bryant Park", "Explore a botanical garden with seasonal flowers and landscaped grounds.", "Bryant Park, Kodaikanal, Tamil Nadu", "Morning"],
      ["Pillar Rocks", "See three striking rock pillars above a forested valley.", "Pillar Rocks, Kodaikanal, Tamil Nadu", "Morning"],
      ["Pine Forest", "Walk among tall pines in a popular photography spot.", "Pine Forest, Kodaikanal, Tamil Nadu", "Morning"],
      ["Silver Cascade Falls", "Stop at a roadside waterfall on the way to town.", "Silver Cascade Falls, Kodaikanal, Tamil Nadu", "Daytime; take road-safety care"]
    ]
  },

  Goa: {
    state: "Goa",
    intro: "Enjoy golden beaches, Portuguese-era heritage, coastal towns and tropical scenery.",
    places: [
      ["Baga Beach", "Visit a lively beach area with restaurants and seasonal activities.", "Baga Beach, North Goa", "Morning or sunset"],
      ["Fort Aguada", "Explore a historic Portuguese-era fort overlooking the coast.", "Fort Aguada, Goa", "Morning"],
      ["Basilica of Bom Jesus", "Visit a renowned historic church in Old Goa.", "Basilica of Bom Jesus, Old Goa", "Check visitor rules"],
      ["Palolem Beach", "Relax on a scenic curved beach in South Goa.", "Palolem Beach, Canacona, Goa", "Sunset"],
      ["Fontainhas", "Walk through Panaji's colourful Latin Quarter and narrow heritage streets.", "Fontainhas, Panaji, Goa", "Morning"],
      ["Dudhsagar Falls", "See a dramatic waterfall surrounded by forest; access varies by season.", "Dudhsagar Falls, Goa-Karnataka region", "Confirm current access"]
    ]
  },

  Agra: {
    state: "Uttar Pradesh",
    intro: "Discover Mughal architecture, marble craftsmanship and centuries of history.",
    places: [
      ["Taj Mahal", "Explore the famous white-marble mausoleum and its formal gardens.", "Taj Mahal, Agra, Uttar Pradesh", "Early morning"],
      ["Agra Fort", "Discover a vast red sandstone fort associated with Mughal emperors.", "Agra Fort, Agra, Uttar Pradesh", "Morning"],
      ["Mehtab Bagh", "Enjoy views towards the Taj Mahal from a garden across the river.", "Mehtab Bagh, Agra, Uttar Pradesh", "Late afternoon"],
      ["Itimad-ud-Daulah's Tomb", "Admire a Mughal tomb known for its detailed decorative work.", "Itimad-ud-Daulah's Tomb, Agra, Uttar Pradesh", "Morning"],
      ["Akbar's Tomb", "Visit the monumental tomb complex set within landscaped grounds.", "Akbar's Tomb, Sikandra, Agra", "Morning"],
      ["Fatehpur Sikri", "Explore a historic Mughal city outside central Agra.", "Fatehpur Sikri, Uttar Pradesh", "Start early"]
    ]
  },

  Ooty: {
    state: "Tamil Nadu",
    intro: "Visit tea gardens, scenic viewpoints, gardens and classic Nilgiri hill scenery.",
    places: [
      ["Government Botanical Garden", "Explore landscaped gardens and a wide variety of plants.", "Government Botanical Garden, Ooty, Tamil Nadu", "Morning"],
      ["Ooty Lake", "Enjoy a lakeside visit and check available boating activities.", "Ooty Lake, Ooty, Tamil Nadu", "Morning or evening"],
      ["Doddabetta Peak", "Take in views of the Nilgiri hills from a well-known high viewpoint.", "Doddabetta Peak, near Ooty, Tamil Nadu", "Early morning"],
      ["Government Rose Garden", "Explore terraced gardens with roses and seasonal blooms.", "Government Rose Garden, Ooty, Tamil Nadu", "Morning"],
      ["Nilgiri Mountain Railway", "Experience a historic mountain railway on available routes.", "Ooty Railway Station, Tamil Nadu", "Check train schedules"],
      ["Pykara Lake", "Enjoy a scenic lake and nearby waterfall area outside Ooty.", "Pykara, near Ooty, Tamil Nadu", "Daytime"]
    ]
  },

  Varanasi: {
    state: "Uttar Pradesh",
    intro: "Experience sacred riverfront ghats, ancient temples, crafts and living cultural traditions.",
    places: [
      ["Dashashwamedh Ghat", "Visit one of Varanasi's best-known riverfront ghats.", "Dashashwamedh Ghat, Varanasi, Uttar Pradesh", "Early morning or evening"],
      ["Assi Ghat", "Enjoy a riverside walk and observe daily life along the Ganges.", "Assi Ghat, Varanasi, Uttar Pradesh", "Sunrise"],
      ["Kashi Vishwanath Temple", "Visit a major Hindu temple; follow current entry and security rules.", "Kashi Vishwanath Temple, Varanasi, Uttar Pradesh", "Check current entry guidance"],
      ["Sarnath", "Explore an important Buddhist pilgrimage site and archaeological area.", "Sarnath, near Varanasi, Uttar Pradesh", "Morning"],
      ["Manikarnika Ghat", "Observe this important cremation ghat respectfully from permitted public areas.", "Manikarnika Ghat, Varanasi, Uttar Pradesh", "Respect local customs"],
      ["Ramnagar Fort", "Discover a historic fort and museum across the Ganges.", "Ramnagar Fort, Varanasi, Uttar Pradesh", "Check opening hours"]
    ]
  },

  Udaipur: {
    state: "Rajasthan",
    intro: "Discover lakeside palaces, heritage lanes, gardens and beautiful views across the City of Lakes.",
    places: [
      ["City Palace", "Explore a sprawling palace complex overlooking Lake Pichola.", "City Palace, Udaipur, Rajasthan", "Morning"],
      ["Lake Pichola", "Enjoy lake views and check local boat tour availability.", "Lake Pichola, Udaipur, Rajasthan", "Sunset"],
      ["Jag Mandir", "Visit a historic island palace on Lake Pichola; boat access is required.", "Jag Mandir, Lake Pichola, Udaipur", "Check boat availability"],
      ["Saheliyon Ki Bari", "Walk through a historic garden with fountains and greenery.", "Saheliyon Ki Bari, Udaipur, Rajasthan", "Morning"],
      ["Bagore Ki Haveli", "Discover traditional architecture and cultural exhibits beside the lake.", "Bagore Ki Haveli, Udaipur, Rajasthan", "Check opening hours"],
      ["Monsoon Palace", "Enjoy elevated views across Udaipur and the surrounding countryside.", "Sajjangarh Monsoon Palace, Udaipur, Rajasthan", "Late afternoon"]
    ]
  },

  Darjeeling: {
    state: "West Bengal",
    intro: "Explore tea gardens, mountain views, heritage railways and lively hill-town streets.",
    places: [
      ["Tiger Hill", "Watch the sunrise over the Himalayan range when weather permits.", "Tiger Hill, Darjeeling, West Bengal", "Before sunrise"],
      ["Batasia Loop", "See the famous curved railway loop and mountain views.", "Batasia Loop, Darjeeling, West Bengal", "Morning"],
      ["Darjeeling Himalayan Railway", "Experience a historic narrow-gauge mountain railway on available services.", "Darjeeling Railway Station, West Bengal", "Check train schedules"],
      ["Padmaja Naidu Himalayan Zoological Park", "Learn about high-altitude wildlife and conservation.", "Himalayan Zoological Park, Darjeeling", "Check opening hours"],
      ["Peace Pagoda", "Visit a peaceful hilltop monument with views of the town.", "Japanese Peace Pagoda, Darjeeling", "Morning"],
      ["Happy Valley Tea Estate", "Learn about Darjeeling tea and plantation life where tours are available.", "Happy Valley Tea Estate, Darjeeling", "Confirm tour availability"]
    ]
  },

  Rishikesh: {
    state: "Uttarakhand",
    intro: "Explore the Ganges, Himalayan foothills, spiritual landmarks and outdoor adventures.",
    places: [
      ["Lakshman Jhula area", "Explore the well-known riverside area and nearby temples; check bridge access rules.", "Lakshman Jhula, Rishikesh, Uttarakhand", "Morning"],
      ["Ram Jhula", "Walk around a landmark suspension-bridge area beside the Ganges.", "Ram Jhula, Rishikesh, Uttarakhand", "Morning"],
      ["Triveni Ghat", "Visit a popular riverfront ghat known for its evening ceremony.", "Triveni Ghat, Rishikesh, Uttarakhand", "Evening"],
      ["Neer Garh Waterfall", "Follow a nature trail to a waterfall; conditions can vary after rain.", "Neer Garh Waterfall, Rishikesh, Uttarakhand", "Daytime"],
      ["Beatles Ashram", "Explore an artistic, forested former retreat with murals and meditation spaces.", "Beatles Ashram, Rishikesh, Uttarakhand", "Check entry hours"],
      ["Parmarth Niketan", "Visit a riverside ashram and learn about its spiritual programmes.", "Parmarth Niketan, Rishikesh, Uttarakhand", "Check programme times"]
    ]
  },

  Hampi: {
    state: "Karnataka",
    intro: "Walk among ancient temple ruins, monumental stone architecture and dramatic boulder landscapes.",
    places: [
      ["Virupaksha Temple", "Visit a historic temple that remains an important place of worship.", "Virupaksha Temple, Hampi, Karnataka", "Morning"],
      ["Vittala Temple", "Explore a renowned temple complex and its famous stone chariot.", "Vijaya Vittala Temple, Hampi, Karnataka", "Morning"],
      ["Hampi Bazaar", "Walk through the historic market street near Virupaksha Temple.", "Hampi Bazaar, Karnataka", "Morning"],
      ["Hemakuta Hill", "See temple ruins and expansive views of the rocky landscape.", "Hemakuta Hill, Hampi, Karnataka", "Sunrise or sunset"],
      ["Lotus Mahal", "Admire distinctive palace architecture within the historic royal area.", "Lotus Mahal, Hampi, Karnataka", "Morning"],
      ["Queen's Bath", "Visit a historic royal bathing structure known for its architecture.", "Queen's Bath, Hampi, Karnataka", "Daytime"]
    ]
  },

  Shillong: {
    state: "Meghalaya",
    intro: "Discover green hills, waterfalls, lakes and the culture of Northeast India.",
    places: [
      ["Umiam Lake", "Enjoy a large scenic lake surrounded by green hills north of Shillong.", "Umiam Lake, Meghalaya", "Morning"],
      ["Elephant Falls", "Visit a series of waterfalls reached by a stepped walking route.", "Elephant Falls, Shillong, Meghalaya", "Daytime"],
      ["Shillong Peak", "See broad views of Shillong and the surrounding hills when visibility allows.", "Shillong Peak, Meghalaya", "Clear morning"],
      ["Ward's Lake", "Take a relaxing walk around a landscaped lake in town.", "Ward's Lake, Shillong, Meghalaya", "Morning"],
      ["Don Bosco Museum", "Explore exhibits about the cultures and communities of Northeast India.", "Don Bosco Museum, Shillong, Meghalaya", "Check opening hours"],
      ["Laitlum Canyons", "Look across dramatic green ridges and deep valleys outside Shillong.", "Laitlum Canyons, Meghalaya", "Clear weather"]
    ]
  }
};

export default destinationGuides;
