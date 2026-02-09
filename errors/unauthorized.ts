export class UnautorizedError extends Error {
    constructor() {
        super("Não autorizado!")
    }
}