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


  runRound() {
    // create a new gallows
    this.gallows = new Gallows()
    // 10. ask for secret word                         bass
    let question = new Question("Type the secret word, don't show your opponent: ")
    this.secretWord = new SecretWord(question.answer)
    print("The secret word has " + this.secretWord.length + " letters")
    // process secret word into chars                  b a s s
    // store found word as empty positions for chars   _ _ _ _
    this.foundWord = new FoundWord(this.secretWord)
    print(this.foundWord.asString)
    // 20. ask for letter ? 
    this.guessWord()
    // loose round
    // win round
    // goto 10
    // this.runRound()
  }

}