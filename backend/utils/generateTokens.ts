import jwt from 'jsonwebtoken'

export default function generateTokens(data: string, secretKey: string) {
    return jwt.sign({
        userID: data
    }, secretKey, {
        expiresIn: '10s'
    })
}