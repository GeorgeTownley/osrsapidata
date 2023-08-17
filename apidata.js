const https = require("https");

const skillNames = [
  "Overall",
  "Attack",
  "Defence",
  "Strength",
  "Hitpoints",
  "Ranged",
  "Prayer",
  "Magic",
  "Cooking",
  "Woodcutting",
  "Fletching",
  "Fishing",
  "Firemaking",
  "Crafting",
  "Smithing",
  "Mining",
  "Herblore",
  "Agility",
  "Thieving",
  "Slayer",
  "Farming",
  "Runecrafting",
  "Hunter",
  "Construction",
];

async function fetchPlayerData() {
  return new Promise((resolve, reject) => {
    const url =
      "https://secure.runescape.com/m=hiscore_oldschool_seasonal/index_lite.ws?player=hosama0";

    https
      .get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function printPlayerInfo() {
  try {
    const playerData = await fetchPlayerData();
    const playerInfoArray = playerData.split("\n");
    console.log("Player Stats:");
    playerInfoArray.forEach((info, index) => {
      const [rank, level, experience] = info.split(",");
      console.log(`Rank: ${rank}, Level: ${level}, Experience: ${experience}`);
    });
  } catch (error) {
    console.error("Error fetching or printing player data:", error);
  }
}

printPlayerInfo();
