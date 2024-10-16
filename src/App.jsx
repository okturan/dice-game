import React, { useState, useEffect, useRef } from "react";
import Dice from "./components/Dice";
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

  const randomRoll = () => Math.floor(Math.random() * 6) + 1;

  const roll = (isFinal = false) => {
    const roll1 = randomRoll();
    const roll2 = randomRoll();
    setPlayer1Roll(roll1);
    setPlayer2Roll(roll2);

    if (isFinal) {
      setTimeout(() => {
        if (roll1 > roll2) {
          setMessage(`${player1Label} Wins!`);
        } else if (roll1 < roll2) {
          setMessage(`${player2Label} Wins!`);
        } else {
          setMessage("Draw! 🤝");
        }
        setIsRolling(false);
      }, MESSAGE_DELAY);
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
      <h1>{message}</h1>
      <div className="players">
        <input
          type="text"
          value={player1Label}
          onChange={(e) => setPlayer1Label(e.target.value)}
          className="player-label"
        />
        <input
          type="text"
          value={player2Label}
          onChange={(e) => setPlayer2Label(e.target.value)}
          className="player-label"
        />
      </div>
      <div className="dice-container">
        <Dice number={player1Roll} />
        <Dice number={player2Roll} />
      </div>
      <button className={`roll-button ${isRolling ? "disabled" : ""}`} onClick={rollDice} disabled={isRolling}>
        {isRolling ? "Rolling..." : "Roll"}
      </button>
    </div>
  );
}

export default App;
