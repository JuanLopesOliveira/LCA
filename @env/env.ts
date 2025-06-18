import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
    ENV_TYPE: z.enum(['development', 'test', 'production']).default('production'),
    VITE_API_KEY: z.string(),
    VITE_BASE_API: z.string(),
    VITE_API_DISCOVER: z.string(),
    VITE_API_MOVIE: z.string(),
    VITE_API_TV: z.string(),
    VITE_SEARCH: z.string(),
    VITE_IMG: z.string(),
    NODE_SERVER_PORT: z.coerce.number(),
    NODE_HTTPS_SERVER_PORT: z.coerce.number(),
    MYSQL_HOST: z.string(),
    MYSQL_USER: z.string(),
    MYSQL_PASSWORD: z.string(),
    MYSQL_DATABASE: z.string(),
    JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.log("Something is wrong with .env", _env.error.format())

    throw new Error('Invalid enviroment variables')
}

export const env = _env.data