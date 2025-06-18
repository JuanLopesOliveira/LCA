import { IncomingMessage, ServerResponse } from "node:http";
import jwt from "jsonwebtoken"
import { env } from "../../@env/env";

export default function refreshTokens(refreshToken: string) {
    console.log(refreshToken)

    try {
        const doestokenValid: any = jwt.verify(refreshToken, env.JWT_SECRET)

        if (doestokenValid instanceof jwt.JsonWebTokenError) {
            response.statusCode = 401
            response.end()
            console.log("token é invalido")
        } else {
            console.log("token é valido")
            const accessToken = jwt.sign({
                userID: doestokenValid.id
            }, env.JWT_SECRET,
                {expiresIn: '10s'}
            )
            const refreshToken = jwt.sign({
                userID: doestokenValid.id
            }, env.JWT_SECRET,
                {expiresIn: '20s'}
            )
            response.statusCode = 200
            response.setHeader("Set-Cookie",
                [
                    `accessToken=${accessToken}; Path=/; Max-Age=10`,
                    `refreshToken=${refreshToken}; Path=/; Max-Age=20`
                ]
            )
            response.end()
            return true
        }

    } catch (err) {
        console.log('Error from refreshToken')
        console.log(err)
        console.log()
        return false
    }
}