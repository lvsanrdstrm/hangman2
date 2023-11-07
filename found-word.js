export default class FoundWord {

  letters = []

  get asString() {
    return this.letters.join(" ")
  }

  constructor(secretWord) {
    this.createNotFoundLetters(secretWord.chars)
  }

  createNotFoundLetters(chars) {
    for (let letter of chars) {
      this.letters.push("*")
    }
  }

  applyFoundLetter(letter, positions) {
    for (let index of positions) {
      this.letters[index] = letter
    }
  }

}