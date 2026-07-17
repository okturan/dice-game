import React, { useState, useEffect, useRef } from "react";
import Dice from "./components/Dice";
import { outcomeMessage, rollDie } from "./game";
import "./App.css";

function App() {
  const [player1Roll, setPlayer1Roll] = useState(1);
  const [player2Roll, setPlayer2Roll] = useState(2);
  const [message, setMessage] = useState("Roll the Dice!");
  const [isRolling, setIsRolling] = useState(false);
  const [player1Label, setPlayer1Label] = useState("Player 1");
  const [player2Label, setPlayer2Label] = useState("Player 2");
  const timeouts = useRef([]);

  const ROLL_ANIMATION_STEPS = 8;
  const ROLL_INTERVAL = 500;
  const MESSAGE_DELAY = 500;

  const roll = (isFinal = false) => {
    const roll1 = rollDie();
    const roll2 = rollDie();
    setPlayer1Roll(roll1);
    setPlayer2Roll(roll2);

    if (isFinal) {
      const messageTimeout = setTimeout(() => {
        setMessage(outcomeMessage(roll1, roll2, player1Label, player2Label));
        setIsRolling(false);
      }, MESSAGE_DELAY);
      timeouts.current.push(messageTimeout);
    }
  };

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setMessage("Rolling...");

    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    for (let i = 0; i <= ROLL_ANIMATION_STEPS; i++) {
      const isFinal = i === ROLL_ANIMATION_STEPS;
      const timeout = setTimeout(() => roll(isFinal), ROLL_INTERVAL * i);
      timeouts.current.push(timeout);
    }
  };

  useEffect(() => {
    return () => timeouts.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="App">
      <h1 aria-live="polite">{message}</h1>
      <div className="players">
        <input
          type="text"
          aria-label="Player 1 name"
          value={player1Label}
          onChange={(e) => setPlayer1Label(e.target.value)}
          className="player-label"
        />
        <input
          type="text"
          aria-label="Player 2 name"
          value={player2Label}
          onChange={(e) => setPlayer2Label(e.target.value)}
          className="player-label"
        />
      </div>
      <div className="dice-container">
        <Dice number={player1Roll} label={`${player1Label} rolled ${player1Roll}`} />
        <Dice number={player2Roll} label={`${player2Label} rolled ${player2Roll}`} />
      </div>
      <button className={`roll-button ${isRolling ? "disabled" : ""}`} onClick={rollDice} disabled={isRolling}>
        {isRolling ? "Rolling..." : "Roll"}
      </button>
    </div>
  );
}

export default App;
