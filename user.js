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
}