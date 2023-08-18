// In components/PlayerInfo.js
import React, { useState, useEffect } from "react";

const skillNames = [
  // ... (your skillNames array)
];

async function fetchPlayerData() {
  const url =
    "https://secure.runescape.com/m=hiscore_oldschool_seasonal/index_lite.ws?player=Unholy304";

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
            return `${skillNames[index]}: Level ${level} (${experience}exp)`;
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
            <li key={index}>{info}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerInfo;
