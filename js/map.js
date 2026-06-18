// Map Generation System
function generateMap(){
  let map = document.getElementById("provinceGrid");
  
  if(!map) return;
  
  map.innerHTML = "";
  
  let provinces = [
    "Capital",
    "Northern Region",
    "Eastern Region",
    "Southern Region",
    "Western Region",
    "Trade Center",
    "Agriculture",
    "Military District"
  ];
  
  provinces.forEach(name => {
    map.innerHTML +=
      `<div class="province" onclick="provinceInfo('${name}')" style="cursor: pointer; transition: all 0.3s ease;">
        ${name}
      </div>`;
  });
}

function provinceInfo(name){
  alert(
    "Province: " + name +
    "\n\nOwner: " + World.player.name +
    "\n\nPopulation: ~" + Math.floor(Math.random() * 500000 + 100000) +
    "\n\nStatus: Stable"
  );
}

// Initialize map when game starts
function initializeMap(){
  generateMap();
}
