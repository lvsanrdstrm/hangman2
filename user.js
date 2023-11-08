import PromptSync from 'prompt-sync'
import { appendFileSync, readFileSync } from 'node:fs'

const print = console.log

const prompt = PromptSync({ sigint: true })

let dbUsers = readFileSync("data/users.csv", "utf8")

dbUsers = dbUsers.trim().split("\r\n")

let users = []

for (let dbUser of dbUsers) {
  dbUser = dbUser.split(",")
  users.push(new User(dbUser[0], dbUser[1]))
}

export default class User {
  name
  #password

  constructor(name, password) {
    this.name = name
    this.#password = password
  }

  checkCredentials(username, password) {
    return this.name === username && this.#password === password
  }

  createUser() {
    this.username = prompt("please enter a username: ")
    this.password = prompt("please enter a password: ")
    appendFileSync('data/users.csv', this.username + ',' + this.password + '\n', 'utf8')
    this.users.push(new User(this.username, this.password))
    // tror inte ja behöver detta om ja appendar till users.csv 
    // users.push(new User(username, password))
    print("you're now a registred user. please log in: ")
    this.logInUser()
  }

}