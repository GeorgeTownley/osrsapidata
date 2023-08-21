import React, { useState } from "react";

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
  const url = `http://localhost:3001/api/m=hiscore_oldschool_seasonal/index_lite.ws?player=${encodeURIComponent(
    playerName
  )}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("API Response Status:", response.status);
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

const PlayerInfo = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Stats, setPlayer1Stats] = useState([]);
  const [player2Stats, setPlayer2Stats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const data1 = await fetchPlayerData(player1Name);
    const data2 = await fetchPlayerData(player2Name);
    setPlayer1Stats(data1 || []);
    setPlayer2Stats(data2 || []);
    setIsLoading(false);
  };

  const handleCompareClick = () => {
    if (player1Name && player2Name) {
      fetchData();
    }
  };

  const comparisonSymbol = (player1Experience, player2Experience) => {
    if (player1Experience > player2Experience) {
      return { symbol: "<", color: "red" };
    } else if (player1Experience < player2Experience) {
      return { symbol: ">", color: "green" };
    } else {
      return { symbol: "=", color: "black" };
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <table className="player-comparison-table">
        <thead>
          <tr>
            <th>
              <input
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                placeholder="Enter Player 1 Name"
              />
            </th>
            <th>Comparison</th>
            <th>
              <input
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder="Enter Player 2 Name"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {SKILLS.map((skill, index) => {
            const player1Level = player1Stats[index]
              ? player1Stats[index][1]
              : 0;
            const player1Experience = player1Stats[index]
              ? parseInt(player1Stats[index][2], 10)
              : 0;
            const player2Level = player2Stats[index]
              ? player2Stats[index][1]
              : 0;
            const player2Experience = player2Stats[index]
              ? parseInt(player2Stats[index][2], 10)
              : 0;
            const comparison = comparisonSymbol(
              player1Experience,
              player2Experience
            );

            return (
              <tr key={skill}>
                <td>
                  {skill} {player1Level} ({player1Experience})
                </td>
                <td style={{ color: comparison.color }}>{comparison.symbol}</td>
                <td>
                  {skill} {player2Level} ({player2Experience})
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleCompareClick}>Compare</button>
    </>
  );
};

export default PlayerInfo;
