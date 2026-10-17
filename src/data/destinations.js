// Static destination catalogue. Costs are estimated per person in INR.
// baseCost = estimated travel + stay for one visit.

export const CATEGORIES = ["All", "Beach", "Mountains", "Heritage", "Nature", "Adventure", "Spiritual", "City"];

export const CATEGORY_META = {
  Beach: { emoji: "🏖️", color: "#0ea5e9" },
  Mountains: { emoji: "🏔️", color: "#6366f1" },
  Heritage: { emoji: "🏰", color: "#d97706" },
  Nature: { emoji: "🌿", color: "#16a34a" },
  Adventure: { emoji: "🧗", color: "#dc2626" },
  Spiritual: { emoji: "🛕", color: "#9333ea" },
  City: { emoji: "🌆", color: "#0f766e" },
};

export const destinations = [
  {
    id: "goa", name: "Goa", country: "India", category: "Beach", baseCost: 12000, rating: 4.6,
    bestTime: "Nov – Feb", lat: 15.2993, lon: 74.124,
    description: "Golden beaches, Portuguese churches, seafood shacks and lively nightlife on India's west coast.",
    activities: [
      { id: "goa-scuba", name: "Scuba diving at Grande Island", cost: 3500 },
      { id: "goa-dudhsagar", name: "Dudhsagar Falls jeep trip", cost: 2500 },
      { id: "goa-churches", name: "Old Goa heritage churches tour", cost: 800 },
      { id: "goa-cruise", name: "Mandovi sunset cruise", cost: 1200 },
    ],
  },
  {
    id: "manali", name: "Manali", country: "India", category: "Mountains", baseCost: 15000, rating: 4.7,
    bestTime: "Mar – Jun, Dec – Jan", lat: 32.2432, lon: 77.1892,
    description: "Snow-capped Himalayan peaks, pine forests and adventure sports in Himachal Pradesh.",
    activities: [
      { id: "manali-paragliding", name: "Paragliding at Solang Valley", cost: 3000 },
      { id: "manali-rohtang", name: "Rohtang Pass excursion", cost: 4000 },
      { id: "manali-rafting", name: "Beas river rafting", cost: 1500 },
      { id: "manali-hadimba", name: "Hadimba Temple & Old Manali walk", cost: 300 },
    ],
  },
  {
    id: "jaipur", name: "Jaipur", country: "India", category: "Heritage", baseCost: 10000, rating: 4.5,
    bestTime: "Oct – Mar", lat: 26.9124, lon: 75.7873,
    description: "The Pink City – majestic forts, royal palaces and colourful bazaars of Rajasthan.",
    activities: [
      { id: "jaipur-amber", name: "Amber Fort visit", cost: 500 },
      { id: "jaipur-balloon", name: "Hot-air balloon ride", cost: 9000 },
      { id: "jaipur-chokhi", name: "Chokhi Dhani cultural dinner", cost: 1200 },
      { id: "jaipur-palace", name: "City Palace & Hawa Mahal", cost: 700 },
    ],
  },
  {
    id: "munnar", name: "Munnar", country: "India", category: "Nature", baseCost: 11000, rating: 4.6,
    bestTime: "Sep – Mar", lat: 10.0889, lon: 77.0595,
    description: "Rolling tea gardens, misty hills and wildlife in the Western Ghats of Kerala.",
    activities: [
      { id: "munnar-tea", name: "Tea Museum & factory tour", cost: 300 },
      { id: "munnar-eravikulam", name: "Eravikulam National Park", cost: 500 },
      { id: "munnar-jeep", name: "Kolukkumalai sunrise jeep safari", cost: 2500 },
      { id: "munnar-spice", name: "Spice plantation walk", cost: 600 },
    ],
  },
  {
    id: "leh", name: "Leh Ladakh", country: "India", category: "Adventure", baseCost: 25000, rating: 4.8,
    bestTime: "May – Sep", lat: 34.1526, lon: 77.5771,
    description: "High-altitude desert, turquoise lakes and ancient monasteries on the roof of India.",
    activities: [
      { id: "leh-pangong", name: "Pangong Lake overnight trip", cost: 5000 },
      { id: "leh-nubra", name: "Nubra Valley camel safari", cost: 1500 },
      { id: "leh-khardung", name: "Khardung La bike ride", cost: 3500 },
      { id: "leh-monastery", name: "Thiksey & Hemis monastery tour", cost: 800 },
    ],
  },
  {
    id: "varanasi", name: "Varanasi", country: "India", category: "Spiritual", baseCost: 8000, rating: 4.4,
    bestTime: "Oct – Mar", lat: 25.3176, lon: 82.9739,
    description: "One of the world's oldest living cities, famous for its ghats and the Ganga Aarti.",
    activities: [
      { id: "varanasi-aarti", name: "Ganga Aarti from a boat", cost: 600 },
      { id: "varanasi-sarnath", name: "Sarnath half-day trip", cost: 1000 },
      { id: "varanasi-food", name: "Street food walk", cost: 900 },
      { id: "varanasi-sunrise", name: "Sunrise boat ride", cost: 500 },
    ],
  },
  {
    id: "andaman", name: "Havelock Island", country: "India (Andaman)", category: "Beach", baseCost: 30000, rating: 4.8,
    bestTime: "Oct – May", lat: 11.9761, lon: 92.9876,
    description: "Crystal-clear water, coral reefs and white-sand beaches like Radhanagar.",
    activities: [
      { id: "andaman-snorkel", name: "Snorkelling at Elephant Beach", cost: 2500 },
      { id: "andaman-seawalk", name: "Sea walk", cost: 3800 },
      { id: "andaman-kayak", name: "Mangrove kayaking", cost: 3000 },
      { id: "andaman-cellular", name: "Cellular Jail light & sound show", cost: 300 },
    ],
  },
  {
    id: "rishikesh", name: "Rishikesh", country: "India", category: "Adventure", baseCost: 9000, rating: 4.5,
    bestTime: "Sep – Nov, Feb – May", lat: 30.0869, lon: 78.2676,
    description: "Yoga capital of the world with white-water rafting and bungee jumping on the Ganga.",
    activities: [
      { id: "rishikesh-rafting", name: "White-water rafting (16 km)", cost: 1500 },
      { id: "rishikesh-bungee", name: "Bungee jumping", cost: 3500 },
      { id: "rishikesh-yoga", name: "Yoga & meditation class", cost: 800 },
      { id: "rishikesh-aarti", name: "Triveni Ghat evening aarti", cost: 100 },
    ],
  },
  {
    id: "dubai", name: "Dubai", country: "UAE", category: "City", baseCost: 55000, rating: 4.6,
    bestTime: "Nov – Mar", lat: 25.2048, lon: 55.2708,
    description: "Futuristic skyline, luxury shopping and golden desert dunes.",
    activities: [
      { id: "dubai-burj", name: "Burj Khalifa observation deck", cost: 4000 },
      { id: "dubai-safari", name: "Desert safari with BBQ dinner", cost: 3500 },
      { id: "dubai-dhow", name: "Dhow cruise at Marina", cost: 2500 },
      { id: "dubai-future", name: "Museum of the Future", cost: 3000 },
    ],
  },
  {
    id: "singapore", name: "Singapore", country: "Singapore", category: "City", baseCost: 60000, rating: 4.7,
    bestTime: "Feb – Apr", lat: 1.3521, lon: 103.8198,
    description: "Clean, green city-state with world-class attractions, food courts and gardens.",
    activities: [
      { id: "sg-universal", name: "Universal Studios Singapore", cost: 7000 },
      { id: "sg-gardens", name: "Gardens by the Bay", cost: 2000 },
      { id: "sg-sentosa", name: "Sentosa Island day", cost: 3000 },
      { id: "sg-safari", name: "Night Safari", cost: 3500 },
    ],
  },
];

export const getDestination = (id) => destinations.find((d) => d.id === id);
