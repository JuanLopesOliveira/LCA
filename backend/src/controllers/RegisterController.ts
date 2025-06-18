import { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";
import { RegisterService } from "../services/RegisterService";
import { MysqlUsersRepository } from "../repositories/mysql/mysql-users-repository";
import { EmailAlreadyExists } from "../../errors/email-already-exists";

export function RegisterController(
  request: IncomingMessage,
  response: ServerResponse
) {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", async () => {
    try {
      const userBodySchema = z.object({
        username: z.string().min(5),
        email: z.string().email(),
        password: z.string().min(6),
      });

      const bodyData = userBodySchema.parse(JSON.parse(body));

      const usersRepo = new MysqlUsersRepository();
      const registerService = new RegisterService(usersRepo);

      const user = await registerService.execute({
        name: bodyData.username,
        email: bodyData.email,
        password: bodyData.password,
      });

      if (user.success) {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.end(
          JSON.stringify({ success: "Cadastro criado com sucesso" })
        );
      }
    } catch (err) {
      err instanceof EmailAlreadyExists
        ? (response.statusCode = 409)
        : (response.statusCode = 500);

      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ error: err.message }));
    }
  });
}
