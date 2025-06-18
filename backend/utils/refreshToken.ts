import jwt from "jsonwebtoken"
import { env } from "../../@env/env"

export default function refreshToken2(token: string) {
    var doesTokenIsValid = jwt.verify(token, env.JWT_SECRET)

    console.log(doesTokenIsValid)

    if (doesTokenIsValid instanceof jwt.JsonWebTokenError) {
        return false
    }

    return true
}