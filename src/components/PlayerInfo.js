import React, { useState, useEffect } from "react";

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
  const url = "/m=hiscore_oldschool_seasonal/index_lite.ws?player=Unholy304";

  const response = await fetch(url);
  const data = await response.text();
  return data;
}

const PlayerInfo = () => {
  const [playerInfo, setPlayerInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const playerData = await fetchPlayerData();
        const playerInfoArray = playerData.split("\n");
        const formattedData = playerInfoArray
          .slice(0, skillNames.length)
          .map((info, index) => {
            const [rank, level, experience] = info.split(",");
            return {
              skill: skillNames[index],
              level: level,
              experience: experience,
            };
          });
        setPlayerInfo(formattedData);
      } catch (err) {
        setError(err.message);
      }
    }

    loadData();
  }, []);

  return (
    <div>
      <h2>Player Stats:</h2>
      {error ? (
        <p>Error fetching player data: {error}</p>
      ) : (
        <ul>
          {playerInfo.map((info, index) => (
            <li key={index}>
              {info.skill}: Level {info.level} ({info.experience}exp)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerInfo;
