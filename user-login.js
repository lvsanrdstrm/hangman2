import { appendFile, appendFileSync, readFileSync } from 'node:fs'
import PromptSync from 'prompt-sync'
import User from "./user.js"

const print = console.log

const prompt = PromptSync({ sigint: true })

let dbUsers = readFileSync("data/users.csv", "utf8")

dbUsers = dbUsers.trim().split("\r\n")

let users = []

for (let dbUser of dbUsers) {
  dbUser = dbUser.split(",")
  users.push(new User(dbUser[0], dbUser[1]))
}

export default class UserLogIn {


  logInUser() {

    for (let dbUser of dbUsers) {
      dbUser = dbUser.split(",")
      if (!users.includes(dbUser))
        users.push(new User(dbUser[0], dbUser[1]))
    }

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
      const loginChoice = prompt("press any key to try again N to create a new user: ").toUpperCase()
      if (this.loginChoice == "N") {
        this.createUser()
      } else {
        this.logInUser()
      }
    }
  }
  createUser() {
    username = prompt("please enter your username: ")
    password = prompt("please enter your password: ")
    appendFileSync('users.csv', username + ',' + password + '\n', 'utf8')
    // tror inte ja behöver detta om ja appendar till users.csv 
    // users.push(new User(username, password))
    print("you're now a registred user. please log in: ")
    this.logInUser()
  }

}





