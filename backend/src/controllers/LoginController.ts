import { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";
import { MysqlUsersRepository } from "../repositories/mysql/mysql-users-repository";
import { LoginService } from "../services/LoginService";
import { env } from "../../../@env/env";
import jwt from "jsonwebtoken";
import { EmailOrPasswordIncorrect } from "../../errors/email-or-password-incorrect";

export function LoginController(
  request: IncomingMessage,
  response: ServerResponse
) {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", async () => {
    try {
      const userLoginBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });

      const userLoginData = userLoginBodySchema.parse(JSON.parse(body));

      const userRepo = new MysqlUsersRepository();
      const loginService = new LoginService(userRepo);

      const user = await loginService.execute({
        email: userLoginData.email,
        password: userLoginData.password,
      });

      const accessToken = jwt.sign(
        {
          userID: user.id,
        },
        env.JWT_SECRET,
        { expiresIn: "10s" }
      );

      const refreshToken = jwt.sign(
        {
          userID: user.id,
        },
        env.JWT_SECRET,
        { expiresIn: "20s" }
      );

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.setHeader("Set-Cookie", [
        `accessToken=${accessToken}; Path=/`,
        `refreshToken=${refreshToken}; Path=/`,
      ]);

      response.end(JSON.stringify({ message: "Sucesso" }));
    } catch (err) {
      response.statusCode = 500;
      if (err instanceof EmailOrPasswordIncorrect) {
        response.statusCode = 401;
      }
      response.setHeader("Content-Type", "application/json");
      response.end(
        JSON.stringify({ message: err.message || "Falha no servidor!" })
      );
    }
  });
}
