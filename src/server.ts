import * as fsp from "fs/promises"
import { Outcome } from "./common.js"
import { RockPaperScissorsGame } from "./RockPaperScissors.js"

async function main() {
  const rock_only_bot = await fsp.readFile("src/wasm/rock_only.wasm")
  const paper_only_bot = await fsp.readFile("src/wasm/paper_only.wasm")

  const {
    instance: { exports: rockbot },
  }: any = await WebAssembly.instantiate(rock_only_bot)
  const {
    instance: { exports: paperbot },
  }: any = await WebAssembly.instantiate(paper_only_bot)

  const rpsgame = new RockPaperScissorsGame(rockbot, paperbot)
  const outcome = rpsgame.play()

  if (outcome == Outcome.AWins) {
    console.log("Rock bot wins!")
  }
  if (outcome == Outcome.BWins) {
    console.log("Paper bot wins!")
  }
  if (outcome == Outcome.Draw) {
    console.log("It is a draw! (what)")
  }
}

main()
