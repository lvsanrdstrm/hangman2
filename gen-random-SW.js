import { appendFile, appendFileSync, readFileSync } from 'node:fs'

//läser filen wordlist och gör om den till en lista
let secretWordlist = readFileSync("data/wordlist.csv", "utf8")
secretWordlist = secretWordlist.trim().split("\r\n")


export default class RandomSecretWord {

  getRandomSecretWord() {
    //genererar random nummer som blir listindex för att hämta random ord
    let generatedWordIndex = Math.random() * secretWordlist.length
    //hämtar ett random ord med det genererade indexet
    let randomSecretWord = secretWordlist[Math.floor(generatedWordIndex)]
    return randomSecretWord
  }

  addSecretWord(word) {
    //lägger till ett nytt ord till listan
    appendFileSync('data/wordlist.csv', word + '\n', 'utf8')
  }

}