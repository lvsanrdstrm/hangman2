import SecretWord from "./secret-word.js"
import Question from "./question.js"
import FoundWord from "./found-word.js"
import Gallows from "./gallows.js"
import HemligtOrd from "./generera-ord.js"

const print = console.log

export default class Game {

  secretWord
  foundWord
  gallows
  hemligtOrd

  usedLetters = []

  constructor() {
    print("Welcome to a simple game of hangman. You are doomed!")
    this.runRound()
  }


  runRound() {
    // create a new gallows
    this.gallows = new Gallows()
    // 10. ask for secret word                         bass
    // let question = new Question("Type the secret word, don't show your opponent: ") gamla koden, dold för ska testa hämta på annat sätt
    this.hemligtOrd = new HemligtOrd()
    this.secretWord = new SecretWord(this.hemligtOrd.getSecretWord())
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
    // kod som testar input är bokstav och endast ett tecken
    print("You guessed " + letter)
    do {
      if (!this.isOnlyLetters(letter)) {
        print("Please enter letters only.")
        break
      }
      if (!this.isOnlyOneLetter(letter)) {
        print("Please enter only one letter.")
        break
      }
    } while (!this.isOnlyLetters(letter) || !this.isOnlyOneLetter(letter))
    if (this.usedLetters.includes(letter)) {
      print('You already tried this letter, you moron')
    }
    // find if the letter is in the secret word
    if (this.secretWord.isLetterInSecretWord(letter)) {
      //  (b)  found            store  x in used chars,  b _ _ _
      //  (s)  found            store  s in used chars,  b _ s s 
      let positions = this.secretWord.getLetterPositions(letter)
      this.foundWord.applyFoundLetter(letter, positions)
      print("You found \n" + this.foundWord.asString)
      this.usedLetters.push(letter)
      print('You have now tried the following letters: ' + this.usedLetters)
      // check if word i complete (no empty slots)? exit to win round
      this.checkWin()
    } else {
      //  (x)  not found        store  x in used chars, add part to gallows
      print(this.gallows.step())
      this.usedLetters.push(letter)
      print('You have now tried the following letters: ' + this.usedLetters)
      // check if gallows is done? exit to loose round
      this.checkLoose()
    }
  }

  isOnlyLetters(userInput) {
    // Check if userInput is only letters
    return /^[A-Ö]+$/.test(userInput) // +:et gör att den testar för mer än ett tecken. [A-Ö] kollar att det är ETT tecken mellan de två
  }

  isOnlyOneLetter(userInput) {
    // Check if userInput is only one letter
    return /^[A-Ö]$/.test(userInput) // [A-Ö] kollar att det är ETT tecken 
  }

  checkWin() {
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

  lettersLeft() {
    let letterseLeftCount = this.foundWord.letters.filter(element => /[\*]+/g.test(element))
    return letterseLeftCount.length
  }

}