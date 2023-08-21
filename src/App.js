import React from "react";
import PlayerInfo from "./components/PlayerInfo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>RuneScape Stats</h1>
      <PlayerInfo player1Name="Hosama0" player2Name="Unholy304" />
    </div>
  );
}

export default App;
