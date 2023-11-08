import { appendFile, appendFileSync, readFileSync } from 'node:fs'

let secretWordlist = readFileSync("data/ordlista.csv", "utf8")
secretWordlist = secretWordlist.trim().split(",")



export default class RandomSecretWord {

  getRandomSecretWord() {
    let generatedWordIndex = Math.random() * secretWordlist.length
    let randomSecretWord = secretWordlist[Math.floor(generatedWordIndex)]
    return randomSecretWord
  }

}