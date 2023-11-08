import UserLogIn from "./user-login"

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