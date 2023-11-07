import { appendFile, appendFileSync, readFileSync } from 'node:fs'


let hemligaOrden = readFileSync("data/ordlista.csv", "utf8")
hemligaOrden = hemligaOrden.trim().split(",")

function getSecretWord() {
  let generatedWordIndex = Math.random() * hemligaOrden.length
  let generatedWord = hemligaOrden[Math.floor(generatedWordIndex)]
  return generatedWord
}

console.log(hemligaOrden)

console.log(getSecretWord())
