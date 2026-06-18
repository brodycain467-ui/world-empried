// Game Logic and State Management
const GameState = {
  isRunning: false,
  speed: 1,
  
  start: function() {
    this.isRunning = true;
  },
  
  pause: function() {
    this.isRunning = false;
  }
};

// Export game state for external access
window.GameState = GameState;
