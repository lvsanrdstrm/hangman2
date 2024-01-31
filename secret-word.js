export default class SecretWord {

  chars = []

  // räknar ut längden på listan med characters, alltså ordets längd
  get length() {
    return this.chars.length
  }

  // gör listan med characters till ett ord/string igen med en join
  get asString() {
    return this.chars.join(" ")
  }

  constructor(word) {
    // process secret word into chars, inputen är genererat randomsecretword
    this.chars = this.processWord(word)
  }
  // denna metod gör ordet till versaler och splittar till characters
  processWord(word) {
    return word.toUpperCase().split("")
  }

  // testar om spelarens input-bokstav är i hemliga ordet, returnerar boolean
  isLetterInSecretWord(letter) {
    return this.chars.includes(letter)
  }

  // itererar genom chars och kollar om den testade bokstaven är på någon av positionerna/indexen. 
  // om ja pushar den positionen in i en lista positions som används senare för att lägga in positionen i found word 
  getLetterPositions(letter) {
    let positions = []
    for (let i = 0; i < this.chars.length; i++) {
      if (this.chars[i] == letter) {
        positions.push(i)
      }
    }
    return positions
  }

}