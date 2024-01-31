import SecretWord from "./secret-word.js"
import Question from "./question.js"
import FoundWord from "./found-word.js"
import Gallows from "./gallows.js"
import RandomSecretWord from "./gen-random-SW.js"
import UserLogIn from "./user-login.js"

const print = console.log

/* skapar och exporterar klassen Game*/
export default class Game {
  /* skapar klassvariabler*/
  secretWord
  foundWord
  gallows
  randomSecretWord
  logIn

  usedLetters = []

  /* skapar konstruktor. inleds med printen och sedan kör den userlogin, loginuser och runround */
  constructor() {
    print("Welcome to a simple game of hangman. You are doomed!")
    this.logIn = new UserLogIn()
    this.logIn.logInUser()
    this.runRound()
  }


  runRound() {
    // create a new gallows, skapar en ny instans av objektet gallows för just denna runda och hämtar från modulen gallows.
    this.gallows = new Gallows()
    // 10. ask for secret word                         bass
    // let question = new Question("Type the secret word, don't show your opponent: ") gamla koden, dold för ska testa hämta på annat sätt
    // skapar en instans av objektet randomsecretword
    this.randomSecretWord = new RandomSecretWord()
    // skapar instans av objektet SecretWord i denna round, inputen är resultatet från metoden getRS i RSW-instansen
    this.secretWord = new SecretWord(this.randomSecretWord.getRandomSecretWord())
    print("The secret word has " + this.secretWord.length + " letters")
    // process secret word into chars                  b a s s
    // store found word as empty positions for chars   _ _ _ _
    // skapar instans av objektet foundword med secretword som input
    // found word är spelarens representation av det hemliga ordet, där alla funna bokstäver visar sig
    this.foundWord = new FoundWord(this.secretWord)
    // printar foundword i startfasen, vilket är ordets längd men med * iställt för bokstäverna
    print(this.foundWord.asString)
    // 20. ask for letter ? 
    // kallar/kör metoden guessword nedan
    this.guessWord()
    // loose round
    // win round
    // goto 10
    // this.runRound()
  }

  guessWord() {
    // skapar variabeln letter som fylls med spelarens input, vilket är klassvariabeln answer från question. inputen i konstruktorn är en fråga. 
    let letter = new Question("Guess a letter: ").answer
    // kod som testar input är bokstav och endast ett tecken
    // med en do-while-loop som printar bara bokstäver / bara en bokstav-prompts om inputen är fel och börjar sedan om från början av guessword-metoden
    print("You guessed " + letter)
    do {
      if (!this.isOnlyLetters(letter)) {
        print("Please enter letters only.")
        this.guessWord()
      }
      if (!this.isOnlyOneLetter(letter)) {
        print("Please enter only one letter.")
        this.guessWord()
      }
      // while-delen har the condition att do-delen körs om input-bokstaven inte är bokstav eller är mer än en bokstav
    } while (!this.isOnlyLetters(letter) || !this.isOnlyOneLetter(letter))
    // om de conditionen inte uppfylls körs koden nedan
    // den testar om bokstaven redan har blivit gissad och börjar sedan om från början av guessword-metoden
    if (this.usedLetters.includes(letter)) {
      print('You already tried this letter, you moron')
      this.guessWord()
    }
    // find if the letter is in the secret word med en metod som returnerar boolean, så om true så körs koden i if-blocket
    if (this.secretWord.isLetterInSecretWord(letter)) {
      //  (b)  found            store  x in used chars,  b _ _ _
      //  (s)  found            store  s in used chars,  b _ s s 
      // denna kod returnerar gissade bokstavens position med getletterposition-metoden
      let positions = this.secretWord.getLetterPositions(letter)
      // i applyfoundletter omvandlas sedan den positionen till position i foundword som är spelarens representation av hemliga ordet
      this.foundWord.applyFoundLetter(letter, positions)
      // printar foundword med det/de hittade bokstäverna synliga och resten av ordet som stjärnor
      print("You found \n" + this.foundWord.asString)
      // printar hur många försök det är kvar genom att printa hur många element det är kvar i gallows-arrayen.
      // printar hur många bokstäver det är kvar att hitta med letterleft-funktionen
      print('Good job, but never lower your guard. You only have ' + this.gallows.stages.length + ' tries left and still ' + this.lettersLeft() + ' letters to find...')
      // skickar in den gissade, korrekta bokstaven i listan usedletters
      this.usedLetters.push(letter)
      // printar sedan den listan så spelaren ser vad den gissat
      print('You have now tried the following letters: ' + this.usedLetters)
      // check if word i complete (no empty slots)? exit to win round
      this.checkWin()
    } else {
      //  (x)  not found        store  x in used chars, add part to gallows
      // printar senaste elementet från gallows-arrayen, alltså hur hängd gubben är 
      print(this.gallows.step())
      // lägger till  den gissade bokstaven i listan med gissade bokstäver
      this.usedLetters.push(letter)
      print('You are closing up on a certain death. Only ' + this.gallows.stages.length + ' tries left and still ' + this.lettersLeft() + ' letters to find... Do you enjoy living? Try harder.')
      print('You have now tried the following letters: ' + this.usedLetters)
      print("You have found \n" + this.foundWord.asString)
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
    // kollar vinst genom att se om det inte är stjärnor kvar i spelrundans representation av det hemliga ordet.
    // inga stjänror kvar = gissat alla bokstäver
    if (!this.foundWord.letters.includes('*')) {
      // printar hela foundword, alltså alla gissade bokstäver i det hemliga ordet
      print("Congratulations, you barely survived this time \n" + this.foundWord.asString)
      // skapar variabeln adWord med en instans av objektet question
      let addWord = new Question("Your prize is that you get to add a word to the wordlist: ")
      // skapar ny instans av randomsecretword-classen
      this.addWordToList = new RandomSecretWord()
      // skapar variabeln addToList där vår RSW-instans addwordtolist kör sin metod addsecretword med svaret från addWord
      this.addToList = this.addWordToList.addSecretWord(addWord.answer)
      print("Your word is now added to the list.\nThank you, congratulations again and goodbye!")
    } else {
      // om the condition inga stjärnor kva ri foundword ej uppfylls så körs guessword igen i denna game-instans
      this.guessWord()
    }
  }

  checkLoose() {
    // denna körs varje gång spelaren gissar fel bokstav
    // om det inte finns element kvar i gallows-arrayen så är spelet över
    if (this.gallows.stages.length == 0) {
      print("Game over, you got to hang! \n" + "The word was " + this.secretWord.asString)
    } else {
      // annars körs guesseword igen i denna game-instans
      this.guessWord()
    }
  }

  // skapar variabeln/arrayen lettersleftcound genom att filtrera foundwords-arrayen letters 
  // som returnerar elementen i arrayen som är *. sedan returnerar den längden på den nya arrayen, alltså hur många bokstäver det är kvar att gissa
  lettersLeft() {
    let letterseLeftCount = this.foundWord.letters.filter(element => /[\*]+/g.test(element))
    return letterseLeftCount.length
  }

}