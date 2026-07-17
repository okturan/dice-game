export function rollDie(random = Math.random) {
  return Math.floor(random() * 6) + 1;
}

export function outcomeMessage(player1Roll, player2Roll, player1Label, player2Label) {
  if (player1Roll > player2Roll) return `${player1Label} Wins!`;
  if (player2Roll > player1Roll) return `${player2Label} Wins!`;
  return "Draw! 🤝";
}
