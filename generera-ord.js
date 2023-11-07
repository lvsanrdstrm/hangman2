import { appendFile, appendFileSync, readFileSync } from 'node:fs'


let hemligaOrden = readFileSync("data/ordlista.csv", "utf8")
hemligaOrden = hemligaOrden.trim().split(",")

export default class HemligtOrd {

  constructor(hemligtOrd) {
    this.hemligtOrd = this.getSecretWord()
  }

  getSecretWord() {
    let generatedWordIndex = Math.random() * hemligaOrden.length
    let generatedWord = hemligaOrden[Math.floor(generatedWordIndex)]
    return generatedWord
  }

}