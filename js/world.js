const World = {
  year: 117,
  month: 1,
  day: 1,
  player: null,
  difficulty: "medium",
  nations: [],
  
  // Create era-specific world
  createEraWorld: function(year) {
    this.year = year;
    
    switch(year) {
      case 117:
        this.nations = [
          {
            id: "rome",
            name: "Roman Empire",
            capital: "Rome",
            color: "#8B0000",
            treasury: 5000,
            approval: 70,
            military: 85000,
            culture: 80,
            technology: 60,
            trade: 50,
            population: 70000000,
            happiness: 70,
            stability: 75,
            bonus: { military: 1.1, culture: 1.05 },
            isPlayer: false,
            isAI: true
          },
          {
            id: "han",
            name: "Han Dynasty",
            capital: "Chang'an",
            color: "#FF6B6B",
            treasury: 4800,
            approval: 75,
            military: 90000,
            culture: 85,
            technology: 70,
            trade: 60,
            population: 60000000,
            happiness: 75,
            stability: 80,
            bonus: { technology: 1.2, economy: 1.1 },
            isPlayer: false,
            isAI: true
          },
          {
            id: "parthia",
            name: "Parthian Empire",
            capital: "Ctesiphon",
            color: "#FFD700",
            treasury: 3500,
            approval: 68,
            military: 60000,
            culture: 60,
            technology: 55,
            trade: 75,
            population: 40000000,
            happiness: 68,
            stability: 70,
            bonus: { diplomacy: 1.15, trade: 1.1 },
            isPlayer: false,
            isAI: true
          },
          {
            id: "kush",
            name: "Kingdom of Kush",
            capital: "Meroe",
            color: "#FF8C00",
            treasury: 1200,
            approval: 72,
            military: 20000,
            culture: 50,
            technology: 40,
            trade: 35,
            population: 5000000,
            happiness: 72,
            stability: 65,
            bonus: { culture: 1.1, trade: 0.9 },
            isPlayer: false,
            isAI: true
          }
        ];
        break;
        
      case 476:
        this.nations = [
          {
            id: "byzantine",
            name: "Eastern Roman Empire",
            capital: "Constantinople",
            color: "#4169E1",
            treasury: 4500,
            approval: 70,
            military: 70000,
            culture: 75,
            technology: 65,
            trade: 55,
            population: 35000000,
            happiness: 70,
            stability: 75,
            bonus: { culture: 1.15, diplomacy: 1.1 },
            isPlayer: false,
            isAI: true
          },
          {
            id: "sassanid",
            name: "Sassanid Empire",
            capital: "Ctesiphon",
            color: "#FFD700",
            treasury: 4000,
            approval: 65,
            military: 65000,
            culture: 70,
            technology: 60,
            trade: 60,
            population: 30000000,
            happiness: 65,
            stability: 70,
            bonus: { diplomacy: 1.15, trade: 1.1 },
            isPlayer: false,
            isAI: true
          }
        ];
        break;
        
      case 2026:
        this.nations = [
          {
            id: "usa",
            name: "United States",
            capital: "Washington D.C.",
            color: "#0052CC",
            treasury: 120000,
            approval: 48,
            military: 1300000,
            culture: 90,
            technology: 95,
            trade: 85,
            population: 330000000,
            happiness: 48,
            stability: 70,
            bonus: { technology: 1.2, military: 1.1 },
            isPlayer: false,
            isAI: true
          },
          {
            id: "china",
            name: "China",
            capital: "Beijing",
            color: "#FF0000",
            treasury: 115000,
            approval: 70,
            military: 2000000,
            culture: 85,
            technology: 90,
            trade: 80,
            population: 1400000000,
            happiness: 70,
            stability: 75,
            bonus: { economy: 1.2, military: 1.15 },
            isPlayer: false,
            isAI: true
          }
        ];
        break;
        
      default:
        this.nations = [
          {
            id: "test",
            name: "Test Nation",
            capital: "Test City",
            color: "#666666",
            treasury: 1000,
            approval: 50,
            military: 10000,
            culture: 50,
            technology: 50,
            trade: 40,
            population: 1000000,
            happiness: 50,
            stability: 50,
            bonus: { military: 1.0, culture: 1.0 },
            isPlayer: false,
            isAI: true
          }
        ];
    }
  },
  
  // Initialize the world with nations for a specific era
  init: function(eraIndex, playerNationId, difficulty) {
    this.difficulty = difficulty;
    this.player = null;
    
    const era = ERAS[eraIndex];
    this.createEraWorld(era.year);
    this.month = 1;
    this.day = 1;
    
    // Set player and apply bonuses
    this.nations.forEach(nation => {
      nation.isPlayer = nation.id === playerNationId;
      nation.isAI = nation.id !== playerNationId;
      
      // Apply difficulty modifiers
      if (nation.isAI) {
        const mod = DIFFICULTY_MODIFIERS[difficulty];
        nation.military *= mod.aiBonus;
        nation.technology *= mod.aiBonus;
      } else {
        const mod = DIFFICULTY_MODIFIERS[difficulty];
        nation.military *= mod.playerBonus;
        nation.technology *= mod.playerBonus;
      }
      
      if (nation.isPlayer) {
        this.player = nation;
      }
    });
  },
  
  // Advance time by months
  advanceTime: function(months) {
    this.month += months;
    
    while (this.month > 12) {
      this.month -= 12;
      this.year += 1;
    }
    
    // Update nation stats each month
    this.updateNations();
  },
  
  // Update nation stats based on game rules
  updateNations: function() {
    this.nations.forEach(nation => {
      // Income generation
      const income = 100 + (nation.trade * 2) + (nation.technology * 1.5);
      nation.treasury += income;
      
      // Happiness affects stability and approval
      const happinessFactor = nation.happiness / 100;
      nation.stability += (happinessFactor * 2) - 1;
      nation.approval += (happinessFactor * 1.5) - 0.75;
      
      // Clamp values
      nation.treasury = Math.max(0, nation.treasury);
      nation.approval = Math.max(0, Math.min(100, nation.approval));
      nation.stability = Math.max(0, Math.min(100, nation.stability));
      nation.happiness = Math.max(0, Math.min(100, nation.happiness));
      
      // Population growth based on happiness and stability
      const growthRate = (nation.happiness / 100) * (nation.stability / 100) * 0.02;
      nation.population *= (1 + growthRate);
      
      // AI decision making
      if (nation.isAI) {
        this.aiTurn(nation);
      }
    });
  },
  
  // Simple AI decision logic
  aiTurn: function(nation) {
    const mod = DIFFICULTY_MODIFIERS[this.difficulty];
    
    // AI might build military if threatened
    if (nation.treasury > 2000 && Math.random() < (0.3 * mod.aiAggression)) {
      nation.military += 20;
      nation.treasury -= 1000;
    }
    
    // AI might invest in technology
    if (nation.treasury > 1500 && Math.random() < 0.2) {
      nation.technology += 10;
      nation.treasury -= 500;
    }
    
    // AI might trade to increase treasury
    if (nation.treasury < 3000 && Math.random() < 0.3) {
      nation.trade += 5;
    }
  },
  
  // Get the date display string
  getDateString: function() {
    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
    return `${months[this.month - 1]} 1, ${this.year} AD`;
  },
  
  // Get a nation by ID
  getNation: function(nationId) {
    return this.nations.find(n => n.id === nationId);
  },
  
  // Get all AI nations
  getAINations: function() {
    return this.nations.filter(n => n.isAI);
  }
};
