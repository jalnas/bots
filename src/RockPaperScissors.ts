import { Outcome } from "./common.js"

interface RPSBot {
  play(): RPSHand
}

enum RPSHand {
  Rock,
  Paper,
  Scissors,
}

const OutcomeMap: Map<string, Outcome> = new Map([
  [[RPSHand.Rock, RPSHand.Rock].join(""), Outcome.Draw],
  [[RPSHand.Rock, RPSHand.Paper].join(""), Outcome.BWins],
  [[RPSHand.Rock, RPSHand.Scissors].join(""), Outcome.AWins],
  [[RPSHand.Paper, RPSHand.Rock].join(""), Outcome.AWins],
  [[RPSHand.Paper, RPSHand.Paper].join(""), Outcome.Draw],
  [[RPSHand.Paper, RPSHand.Scissors].join(""), Outcome.BWins],
  [[RPSHand.Scissors, RPSHand.Rock].join(""), Outcome.BWins],
  [[RPSHand.Scissors, RPSHand.Paper].join(""), Outcome.AWins],
  [[RPSHand.Scissors, RPSHand.Scissors].join(""), Outcome.Draw],
])

export class RockPaperScissorsGame implements SingleRoundGame {
  #bot0: RPSBot
  #bot1: RPSBot

  constructor(bot0: RPSBot, bot1: RPSBot) {
    this.#bot0 = bot0
    this.#bot1 = bot1
  }

  play(): Outcome {
    const bot0_hand: RPSHand = this.#bot0.play()
    const bot1_hand: RPSHand = this.#bot1.play()
    return OutcomeMap.get([bot0_hand, bot1_hand].join(""))
  }
}
