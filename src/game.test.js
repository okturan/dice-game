import assert from "node:assert/strict";
import test from "node:test";
import { outcomeMessage, rollDie } from "./game.js";

test("rollDie maps the random interval to valid inclusive die faces", () => {
  assert.equal(rollDie(() => 0), 1);
  assert.equal(rollDie(() => 0.5), 4);
  assert.equal(rollDie(() => 0.999999), 6);
});

test("outcomeMessage reports either customized winner or a draw", () => {
  assert.equal(outcomeMessage(6, 2, "Ada", "Linus"), "Ada Wins!");
  assert.equal(outcomeMessage(1, 5, "Ada", "Linus"), "Linus Wins!");
  assert.equal(outcomeMessage(3, 3, "Ada", "Linus"), "Draw! 🤝");
});
