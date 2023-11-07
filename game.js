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

  guessWord() {
    let letter = new Question("Guess a letter: ").answer
    print("You guessed " + letter)
    // find if the letter is in the secret word
    if (this.secretWord.isLetterInSecretWord(letter)) {
      //  (b)  found            store  x in used chars,  b _ _ _
      //  (s)  found            store  s in used chars,  b _ s s 
      let positions = this.secretWord.getLetterPositions(letter)
      this.foundWord.applyFoundLetter(letter, positions)
      print("You found \n" + this.foundWord.asString)
      // check if word i complete (no empty slots)? exit to win round
      this.checkWin()
    } else {
      //  (x)  not found        store  x in used chars, add part to gallows
      print(this.gallows.step())
      // check if gallows is done? exit to loose round
      this.checkLoose()
    }
  }

  heckWin() {
    if (!this.foundWord.letters.includes('*')) {
      print("Congratulations, you barely survived this time \n" + this.foundWord.asString)
    } else {
      // goto 20
      this.guessWord()
    }
  }

  checkLoose() {
    if (this.gallows.stages.length == 0) {
      print("Wonderful, you got to hang! \n" + "The word was " + this.secretWord.asString)
    } else {
      // goto 20
      this.guessWord()
    }
  }

}