export class IDDoNotExists extends Error {
  constructor() {
    super("Este ID não existe");
  }
}
