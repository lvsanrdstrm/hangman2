import { appendFileSync, readFileSync } from 'node:fs'
import PromptSync from 'prompt-sync'
import User from "./user.js"
// skapar variabeln print där inbyggda funktionen console.log ligger (för att förenkla)
const print = console.log
// skapar variabeln prompt som innehåller metoden promptsync från modulen prompt-sync
const prompt = PromptSync({ sigint: true })
// skapar variabeln dbUsers där metoden readfilesync läser filen users
let dbUsers = readFileSync("data/users.csv", "utf8")
// trimmar texten i dbusers och splittar på radbrytning
dbUsers = dbUsers.trim().split("\r\n")

let users = []

// itererar igenom dbusers och splittar varje rad, alltså användare och lösen på kommat och sparar dem tillfälligt i en dbuser-lista
// pushar sedan in resultatet av en ny instans av klassen user i users-listan. den tar första elementet från tillfälliga dbuser-listan,
// alltså användarnamn som input användarnamn och andra elementet i dbuser som lösenord.
// users-listan består sedan av alla användare från listan nu representerade som user-klass-instanser
for (let dbUser of dbUsers) {
  dbUser = dbUser.split(",")
  users.push(new User(dbUser[0], dbUser[1]))
}

export default class UserLogIn {


  logInUser() {


    let user
    const username = prompt("please enter your username: ")
    const password = prompt("please enter your password: ")


    for (let savedUser of users) {
      if (savedUser.checkCredentials(username, password)) {
        user = savedUser
      }
    }
    if (user) {
      print("Welcome, " + user.name)
    } else {
      print("couldn't find a user with the given username and password combo. try again or create a new user?")
      this.loginChoice = prompt("press any key to try again N to create a new user: ")
      if (this.loginChoice.toUpperCase() == "N") {
        this.createUser()
      } else {
        this.logInUser()
      }
    }
  }
  createUser() {
    this.username = prompt("please enter a username: ")
    this.password = prompt("please enter a password: ")
    appendFileSync('data/users.csv', this.username + ',' + this.password + '\n', 'utf8')
    users.push(new User(this.username, this.password))
    // tror inte ja behöver detta om ja appendar till users.csv 
    // users.push(new User(username, password))
    print("you're now a registred user. please log in: ")
    this.logInUser()
  }

}





