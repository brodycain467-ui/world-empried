// UI Helper Functions
function hideAll(){
  document
    .querySelectorAll(
      "#homeScreen,#difficultyScreen,#eraScreen,#nationScreen,#gameScreen"
    )
    .forEach(el => {
      el.classList.add("hidden");
    });
}

function startSetup(){
  hideAll();
  document
    .getElementById("difficultyScreen")
    .classList.remove("hidden");
}

function setDifficulty(level){
  World.difficulty = level;
  hideAll();
  loadEras();
  document
    .getElementById("eraScreen")
    .classList.remove("hidden");
}

function loadEras(){
  let container =
    document.getElementById("eraButtons");
  container.innerHTML = "";

  ERAS.forEach(era => {
    container.innerHTML +=
      `<button onclick="selectEra(${era.year})">
        ${era.name}
      </button>`;
  });
}

function selectEra(year){
  World.createEraWorld(year);
  hideAll();
  loadNations();
  document
    .getElementById("nationScreen")
    .classList.remove("hidden");
}

function loadNations(){
  let container =
    document.getElementById("nationButtons");
  container.innerHTML = "";

  World.nations.forEach(nation => {
    container.innerHTML +=
      `<button onclick="startGame('${nation.id}')" style="border-left: 4px solid ${nation.color}">
        ${nation.name}
      </button>`;
  });
}

function startGame(nationId){
  World.player =
    World.nations.find(
      n => n.id === nationId
    );

  hideAll();
  document
    .getElementById("gameScreen")
    .classList.remove("hidden");

  refreshUI();
}

function refreshUI(){
  document
    .getElementById("nationDisplay")
    .innerText =
    World.player.name;

  document
    .getElementById("treasuryDisplay")
    .innerText =
    "💰 " + Math.floor(World.player.treasury);

  document
    .getElementById("approvalDisplay")
    .innerText =
    "😊 " + Math.floor(World.player.approval) + "%";

  updateDate();
}

function updateDate(){
  const months = [
    "January","February","March",
    "April","May","June",
    "July","August","September",
    "October","November","December"
  ];

  document
    .getElementById("dateDisplay")
    .innerText =
    months[World.month - 1] +
    " " +
    World.day +
    ", " +
    World.year +
    " AD";
}

function advanceTime(months){
  World.advanceTime(months);
  refreshUI();
}

function openMilitary(){
  if (!World.player) return;
  
  const options = `
Current Military Strength: ${Math.floor(World.player.military)}

Upgrade Military (Cost: 500 Gold) - Type "upgrade"
Cancel - Type anything else
`;
  
  const choice = prompt(options);
  
  if (choice === "upgrade" && World.player.treasury >= 500) {
    World.player.military += 20;
    World.player.treasury -= 500;
    refreshUI();
    alert('Military upgraded!');
  }
}

function openDiplomacy(){
  if (!World.player) return;
  
  const aiNations = World.nations.filter(n => n.isAI);
  const nationList = aiNations
    .map(n => `${n.name} (Military: ${Math.floor(n.military)}, Approval: ${Math.floor(n.approval)}%)`)
    .join('\n');
  
  alert(`Available Nations:\n\n${nationList}\n\nDiplomacy System Coming Soon!`);
}

function openTrade(){
  if (!World.player) return;
  
  const currentTrade = Math.floor(World.player.trade);
  const newTrade = prompt(
    `Current Trade Level: ${currentTrade}\n\nInvest in Trade (Cost: 200 Gold per level)`,
    currentTrade
  );
  
  if (newTrade && parseInt(newTrade) > currentTrade) {
    const cost = (parseInt(newTrade) - currentTrade) * 200;
    if (World.player.treasury >= cost) {
      World.player.trade = parseInt(newTrade);
      World.player.treasury -= cost;
      refreshUI();
      alert('Trade upgraded!');
    } else {
      alert('Insufficient funds!');
    }
  }
}

function openSettings(){
  alert('Settings Coming Soon!');
}
