const ERAS = [
  {
    year: 117,
    name: "117 AD - Roman Empire"
  },
  {
    year: 476,
    name: "476 AD - Fall of Rome"
  },
  {
    year: 1054,
    name: "1054 AD - Great Schism"
  },
  {
    year: 1492,
    name: "1492 AD - Exploration"
  },
  {
    year: 1914,
    name: "1914 AD - World War I"
  },
  {
    year: 2026,
    name: "2026 AD - Modern World"
  }
];

const NATIONS = [
  {
    id: "rome",
    name: "Roman Empire",
    era: 0,
    capital: "Rome",
    color: "#8B0000",
    bonus: { military: 1.1, culture: 1.05 }
  },
  {
    id: "persia",
    name: "Persia",
    era: 0,
    capital: "Ctesiphon",
    color: "#FFD700",
    bonus: { diplomacy: 1.15, trade: 1.1 }
  },
  {
    id: "china",
    name: "Han Dynasty",
    era: 0,
    capital: "Chang'an",
    color: "#FF6B6B",
    bonus: { technology: 1.2, economy: 1.1 }
  },
  {
    id: "india",
    name: "Gupta Empire",
    era: 0,
    capital: "Pataliputra",
    color: "#FF8C00",
    bonus: { culture: 1.15, science: 1.1 }
  },
  {
    id: "britain",
    name: "United Kingdom",
    era: 4,
    capital: "London",
    color: "#4169E1",
    bonus: { naval: 1.2, trade: 1.15 }
  },
  {
    id: "france",
    name: "France",
    era: 3,
    capital: "Paris",
    color: "#1E90FF",
    bonus: { culture: 1.15, diplomacy: 1.1 }
  },
  {
    id: "germany",
    name: "Germany",
    era: 4,
    capital: "Berlin",
    color: "#696969",
    bonus: { military: 1.2, technology: 1.1 }
  },
  {
    id: "japan",
    name: "Japan",
    era: 4,
    capital: "Tokyo",
    color: "#FF0000",
    bonus: { military: 1.15, technology: 1.15 }
  }
];

const DIFFICULTY_MODIFIERS = {
  easy: { aiAggression: 0.5, playerBonus: 1.2, aiBonus: 0.8 },
  medium: { aiAggression: 1.0, playerBonus: 1.0, aiBonus: 1.0 },
  hard: { aiAggression: 1.5, playerBonus: 0.9, aiBonus: 1.2 },
  impossible: { aiAggression: 2.0, playerBonus: 0.7, aiBonus: 1.5 }
};
