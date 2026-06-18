const World = {
  year: 117,
  month: 1,
  day: 1,
  player: null,
  difficulty: "medium",
  nations: [],
  
  // Initialize the world with nations for a specific era
  init: function(eraIndex, playerNationId, difficulty) {
    this.difficulty = difficulty;
    this.player = null;
    this.nations = [];
    
    const era = ERAS[eraIndex];
    this.year = era.year;
    this.month = 1;
    this.day = 1;
    
    // Create all nations for this era
    NATIONS.forEach(nationData => {
      if (nationData.era <= eraIndex) {
        const nation = {
          id: nationData.id,
          name: nationData.name,
          capital: nationData.capital,
          color: nationData.color,
          treasury: 5000,
          approval: 70,
          military: 100,
          culture: 50,
          technology: 50,
          trade: 40,
          population: 1000000,
          happiness: 70,
          stability: 75,
          bonus: nationData.bonus,
          isPlayer: nationData.id === playerNationId,
          isAI: nationData.id !== playerNationId,
          territories: [],
          alliances: [],
          wars: []
        };
        
        // Apply difficulty modifiers to AI nations
        if (nation.isAI) {
          const mod = DIFFICULTY_MODIFIERS[difficulty];
          nation.military *= mod.aiBonus;
          nation.technology *= mod.aiBonus;
        } else {
          const mod = DIFFICULTY_MODIFIERS[difficulty];
          nation.military *= mod.playerBonus;
          nation.technology *= mod.playerBonus;
        }
        
        this.nations.push(nation);
        
        if (nation.isPlayer) {
          this.player = nation;
        }
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
