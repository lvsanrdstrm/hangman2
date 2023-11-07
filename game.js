import SecretWord from "./secret-word.js"
import Question from "./question.js"
import FoundWord from "./found-word.js"
import Gallows from "./gallows.js"

const print = console.log

export default class Game {

  secretWord
  foundWord
  gallows

  constructor() {
    print("Welcome to a simple game of hangman. You are doomed!")
    this.runRound()
  }

}