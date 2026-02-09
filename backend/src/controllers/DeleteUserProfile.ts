import { IncomingMessage, ServerResponse } from "node:http";
import authCheck from "../../utils/authCheck";
import jwt from "jsonwebtoken";
import { env } from "../../../@env/env";
import { z } from "zod";
import { MysqlUsersRepository } from "../repositories/mysql/mysql-users-repository";
import { DeleteUserProfileService } from "../services/DeleteUserProfileService";

export default function deleteProfileController(
  request: IncomingMessage,
  response: ServerResponse
) {

  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", async () => {
    let refreshToken: any = "";
    let userID: string = "";

    const tokenStillValidOrNewerWasGenerated = await authCheck(
      request,
      response,
      false
    );

    if (!tokenStillValidOrNewerWasGenerated) {
      console.log("token não é válido");
      response.statusCode = 401;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ message: "Não autorizado!" }));
      return false;
    }

    refreshToken = request.headers.cookie
      ?.split(";")[1]
      ?.split("refreshToken=")[1];

    const decoded = jwt.verify(refreshToken, env.JWT_SECRET);

    if (typeof decoded === "object" && "userID" in decoded) {
      userID = decoded.userID;
    }
    try {
      const deleteUserProfileSchema = z.object({
        userEmail: z.coerce.string(),
      });

      const deleteUserProfileData = deleteUserProfileSchema.parse(
        JSON.parse(body)
      );

      const usersRepo = new MysqlUsersRepository();
      const deleteUserProfileService = new DeleteUserProfileService(usersRepo);

      await deleteUserProfileService.execute({
        userEmail: deleteUserProfileData.userEmail,
        userID,
      });

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.setHeader("Set-Cookie", [
        `accessToken=""; Path=/`,
        `refreshToken=""; Path=/`,
      ]);
      response.end(JSON.stringify({ message: "Deletado!" }));
    } catch (err) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "application/json");
      response.end(
        JSON.stringify({
          message:
            err instanceof Error ? `${err.message}` : "Falha no servidor",
        })
      );
    }
  });
}
