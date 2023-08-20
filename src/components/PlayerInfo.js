import React, { useState, useEffect } from "react";

const SKILLS = [
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

const fetchPlayerData = async (playerName) => {
  const url = `https://secure.runescape.com/m=hiscore_oldschool_seasonal/index_lite.ws?player=${encodeURIComponent(
    playerName
  )}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch player data for ${playerName}`);
    }
    const data = await response.text();
    console.log(`Fetched Data for ${playerName}:`, data); // Debugging Point 1
    const parsedData = data.split("\n").map((skill) => skill.split(","));
    return parsedData;
  } catch (error) {
    console.error("Error fetching player data:", error.message);
    return null;
  }
};

const PlayerInfo = ({ player1Name, player2Name }) => {
  const [player1Stats, setPlayer1Stats] = useState([]);
  const [player2Stats, setPlayer2Stats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data1 = await fetchPlayerData(player1Name);
      const data2 = await fetchPlayerData(player2Name);
      setPlayer1Stats(data1 || []); // Fallback to empty array if null is returned
      setPlayer2Stats(data2 || []); // Same as above
    }
    fetchData();
  }, [player1Name, player2Name]);

  console.log("Player1 Name:", player1Name); // Debugging Point 2
  console.log("Player2 Name:", player2Name); // Debugging Point 2
  console.log("Player1 Stats Length:", player1Stats.length); // Debugging Point 3
  console.log("Player2 Stats Length:", player2Stats.length); // Debugging Point 3
  console.log("Skills Length:", SKILLS.length); // Debugging Point 3

  if (
    !player1Stats ||
    !player2Stats ||
    player1Stats.length !== SKILLS.length ||
    player2Stats.length !== SKILLS.length
  ) {
    return <div>Loading...</div>;
  }

  return <table>{/* ... (the rest of your rendering code) */}</table>;
};

export default PlayerInfo;
