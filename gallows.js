export default class Gallows {
  stages = [
    `

    |
    |
    |
    |
    |
    |
    `,
    `
    _________
    |         
    |         
    |        
    |        
    |
    |
    `,
    `
    _________
    |         |
    |         
    |        
    |       
    |
    |
    `,
    `
    _________
    |         |
    |         0
    |        
    |        
    |
    |
    `,
    `
    _________
    |         |
    |         0
    |         |
    |        
    |
    |
    `,
    `
    _________
    |         |
    |         0
    |        /|
    |         
    |
    |
    `,
    `
    _________
    |         |
    |         0
    |        /|\\
    |        
    |
    |
    `,
    `
    _________
    |         |
    |         0
    |        /|\\
    |        / 
    |
    |
    `,
    `
    _________
    |         |
    |         0
    |        /|\\
    |        / \\
    |
    |
    `
  ]

  // denna metod returnerar första elementet i arrayen och "skalar" liksom ner den för varje gång den kallas
  step() {
    return this.stages.shift()
  }

}