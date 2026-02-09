export class EmailOrPasswordIncorrect extends Error {
  constructor() {
    super("E-mail ou senha incorretos!");
  }
}
