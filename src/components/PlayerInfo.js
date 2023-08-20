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
  const url = `/m=hiscore_oldschool_seasonal/index_lite.ws?player=${encodeURIComponent(
    playerName
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch player data for ${playerName}`);
    }
    const data = await response.text();
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
      setPlayer1Stats(data1);
      setPlayer2Stats(data2);
    }
    fetchData();
  }, [player1Name, player2Name]);

  if (
    !player1Stats ||
    !player2Stats ||
    player1Stats.length !== SKILLS.length ||
    player2Stats.length !== SKILLS.length
  ) {
    return <div>Loading...</div>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>{player1Name}</th>
          <th>Comparison</th>
          <th>{player2Name}</th>
        </tr>
      </thead>
      <tbody>
        {SKILLS.map((skill, index) => {
          const [player1Exp] = player1Stats[index];
          const [player2Exp] = player2Stats[index];

          let comparison;
          if (player1Exp > player2Exp) {
            comparison = "<";
          } else if (player1Exp < player2Exp) {
            comparison = ">";
          } else {
            comparison = "=";
          }

          return (
            <tr key={index}>
              <td>
                {skill}: {player1Stats[index][1]} ({player1Exp} exp)
              </td>
              <td>{comparison}</td>
              <td>
                {skill}: {player2Stats[index][1]} ({player2Exp} exp)
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PlayerInfo;
