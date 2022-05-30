// Game Stats
var totalParkers = 0;
var alltimeParkers = 0;
var parkersPerClick = 1;
var parkersPerSecond = 0;

// Game Items
class Building {
    constructor( name, basecost, parkerRate) {
        this.basecost = basecost;
        this.owned = 0;
        this.name = name;
        this.parkerRate = parkerRate;
    }

    getCurrentCost() {
        return Math.ceil(this.basecost * Math.pow(1.15, this.owned));
    }
}
const buildings = [10];
buildings[0] = new Building("Baby Trevor", 15, 0.1);
buildings[1] = new Building("Baby Daniel", 100, 1);
buildings[2] = new Building("Baby Ian", 1100, 8);
buildings[3] = new Building("Baby Joey", 12000, 47);
buildings[4] = new Building("Baby Nic", 130000, 260);
buildings[5] = new Building("Build-a-Parker", 1400000, 1400);
buildings[6] = new Building("Sbeve", 20000000, 7800);
buildings[7] = new Building("Dubai Portal", 330000000, 44000);
buildings[8] = new Building("Art Hoe Convention", 5100000000, 260000);
buildings[9] = new Building("Vtuber Stream", 75000000000, 1600000);

document.getElementById("building0").addEventListener("click", () => {
    buyBuilding(0);
});
document.getElementById("building1").addEventListener("click", () => {
    buyBuilding(1);
});
document.getElementById("building2").addEventListener("click", () => {
    buyBuilding(2);
});
document.getElementById("building3").addEventListener("click", () => {
    buyBuilding(3);
});
document.getElementById("building4").addEventListener("click", () => {
    buyBuilding(4);
});
document.getElementById("building5").addEventListener("click", () => {
    buyBuilding(5);
});
document.getElementById("building6").addEventListener("click", () => {
    buyBuilding(6);
});
document.getElementById("building7").addEventListener("click", () => {
    buyBuilding(7);
});
document.getElementById("building8").addEventListener("click", () => {
    buyBuilding(8);
});
document.getElementById("building9").addEventListener("click", () => {
    buyBuilding(9);
});

// Animation variables
var blinkCounter = 0;
var blinkType = getRandomInt(1, 3);
const randomMin = 2000;
const randomMax = 3000;
var randomInterval = getRandomInt(randomMin, randomMax);

// Game loop
var currentTime = Date.now();
var lastTime = currentTime;

document.getElementById("babyParker").addEventListener("click", parkerClicked);
document.getElementById("babyParker").addEventListener("mouseover", animate);
document.getElementById("babyParker").addEventListener("mouseout", animate);

updateCosts();
updateBuildingCounts();
window.requestAnimationFrame(gameLoop);

function gameLoop() {
    tick();
    window.requestAnimationFrame(gameLoop);
}

function tick() {
    currentTime = Date.now();
    checkCosts();
    addBuildingsRates();
    updateCount();
    blink();
    lastTime = currentTime;
}

function parkerClicked() {
    totalParkers += parkersPerClick;
    alltimeParkers += parkersPerClick;
    updateCount();
    animate();
}

function addBuildingsRates() {
    for (let i = 0; i < buildings.length; i++) {
        totalParkers += buildings[i].owned * buildings[i].parkerRate * ((currentTime - lastTime) / 1000);
        alltimeParkers += buildings[i].owned * buildings[i].parkerRate * ((currentTime - lastTime) / 1000);
    }
}

function animate() {
    if (document.getElementById('babyParker').classList.contains("bounce")) {
        document.getElementById('babyParker').classList.add("bounce2");
        document.getElementById('babyParker').classList.remove("bounce");
    } else {
        document.getElementById('babyParker').classList.add("bounce");
        document.getElementById('babyParker').classList.remove("bounce2");
    }
}

function updateCount() {
    document.getElementById("parkersBaked").textContent = shortenNumString(totalParkers);
}

function buyBuilding(buildingNo) {
    if (totalParkers >= buildings[buildingNo].getCurrentCost()) {
        totalParkers -= buildings[buildingNo].getCurrentCost();
        buildings[buildingNo].owned++;
        parkersPerSecond += buildings[buildingNo].parkerRate;
        document.getElementById("parkerPerSecond").textContent = parkersPerSecond.toFixed(0);
        updateCosts();
        updateBuildingCounts();
        console.log("Buy success, parkerRate: " + parkersPerSecond);
    } else {
        console.log("Insufficient funds, cost: " + buildings[buildingNo].getCurrentCost());
    }
}

function checkCosts() {
    for (let i = 0; i < buildings.length; i++) {
        if (totalParkers > buildings[i].getCurrentCost()) {
            document.getElementById("building" + i).classList.remove("notAfford");
        } else {
            document.getElementById("building" + i).classList.add("notAfford");
        }
    }
}

function updateCosts() {
    for (let i = 0; i < buildings.length; i++) {
        document.getElementById("itemCost" + i).textContent = shortenNumString(buildings[i].getCurrentCost());
    }
}

function updateBuildingCounts() {
    for (let i = 0; i < buildings.length; i++) {
        document.getElementById("itemNum" + i).textContent = buildings[i].owned;
    }
}

function blink() {
    blinkCounter++;

    switch (blinkType) {
        case 1:
            if (blinkCounter == randomInterval) {
                document.getElementById("babyParker").src = "images/BabyParkerBlink.png";
            } else if (blinkCounter == 10 + randomInterval) {
                document.getElementById("babyParker").src = "images/BabyParker.png";
            } else if (blinkCounter == 20 + randomInterval) {
                document.getElementById("babyParker").src = "images/BabyParkerBlink.png";
            } else if (blinkCounter == 30 + randomInterval) {
                document.getElementById("babyParker").src = "images/BabyParker.png";
                blinkCounter = 0;
                randomInterval = getRandomInt(randomMin, randomMax);
                blinkType = getRandomInt(1, 3);
            }
            break;
        case 2:
            if (blinkCounter == randomInterval) {
                document.getElementById("babyParker").src = "images/BabyParkerBlink.png";
            } else if (blinkCounter == 10 + randomInterval) {
                document.getElementById("babyParker").src = "images/BabyParker.png";
                blinkCounter = 0;
                randomInterval = getRandomInt(randomMin, randomMax);
                blinkType = getRandomInt(1, 3);
            }
            break;
    }
}

function shortenNumString(number) {
    if (number >= 1000000000000000) {
        number /= 1000000000000000;
        return number.toFixed(3) + " quadrillion";
    } else if (number >= 1000000000000) {
        number /= 1000000000000;
        return number.toFixed(3) + " trillion";
    } else if (number >= 1000000000) {
        number /= 1000000000;
        return number.toFixed(3) + " billion";
    } else if (number >= 1000000) {
        number /= 1000000;
        return number.toFixed(3) + " million";
    } else if (number >= 100000) {
        return number.toFixed(0).slice(0, 3) + "," + number.toFixed(0).slice(3);
    } else if (number >= 10000) {
        return number.toFixed(0).slice(0, 2) + "," + number.toFixed(0).slice(2);
    } else {
        return number.toFixed(0);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}