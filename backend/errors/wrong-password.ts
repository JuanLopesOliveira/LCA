export class WrongPassword extends Error {
  constructor() {
    super("Senha Incorreta");
  }
}
