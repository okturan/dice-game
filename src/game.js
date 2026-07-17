export function rollDie(random = Math.random) {
  return Math.floor(random() * 6) + 1;
}

export function outcomeMessage(player1Roll, player2Roll, player1Label, player2Label) {
  if (player1Roll > player2Roll) return `${player1Label} Wins!`;
  if (player2Roll > player1Roll) return `${player2Label} Wins!`;
  return "Draw! 🤝";
}

export function rollTiming(reducedMotion) {
  if (reducedMotion) {
    return { steps: 0, interval: 0, messageDelay: 0 };
  }

  return { steps: 8, interval: 500, messageDelay: 500 };
}
