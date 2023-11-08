import { readFileSync } from 'node:fs'
import PromptSync from 'prompt-sync'
import User from "./user.js"

const prompt = PromptSync({ sigint: true })

let dbUsers = readFileSync("data/users.csv", "utf8")

dbUsers = dbUsers.trim().split("\r\n")

let users = []

for (let dbUser of dbUsers) {
  dbUser = dbUser.split(",")
  users.push(new User(dbUser[0], dbUser[1]))
}

export default class UserLogIn {

  user
  username = prompt("please enter your username: ")
  password = prompt("please enter your password: ")

  logInUser() {
    for (let savedUser of users) {
      if (savedUser.checkCredentials(username, password)) {
        user = savedUser
      }
    }
    if (user) {
      console.log("Welcome, " + user.name)
    } else {
      console.log("couldn't find a user with the given username and password combo")
    }
  }

}