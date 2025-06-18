export class AlreadyUnfavoritedError extends Error {
  constructor() {
    super("Está media já não está favoritada");
  }
}
