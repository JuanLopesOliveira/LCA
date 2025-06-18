import { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";
import authCheck from "../../utils/authCheck";
import jwt from "jsonwebtoken";
import { env } from "../../../@env/env";
import { MysqlUsersRepository } from "../repositories/mysql/mysql-users-repository";
import { EditProfileService } from "../services/EditProfileInfoService";

export function editProfileInfoController(
  request: IncomingMessage,
  response: ServerResponse
) {
  if (request.headers.cookie == "" || !request.headers.cookie) {
    console.log("cookies não existem");
    response.statusCode = 401;
    response.setHeader("Content-Type", "application/json");
    response.end();
    return false;
  }

  let body: string = "";

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
      response.end();
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
      const editedBodySchema = z.object({
        username: z.string(),
        currentPassword: z.string(),
        newPassword: z.string(),
      });

      const bodyData = editedBodySchema.parse(JSON.parse(body));

      const userRepo = new MysqlUsersRepository();
      const editProfileServiceInstance = new EditProfileService(userRepo);

      const user = await editProfileServiceInstance.execute({
        userID,
        username: bodyData.username,
        currentPassword: bodyData.currentPassword,
        newPassword: bodyData.newPassword,
      });

      const accessToken = jwt.sign(
        {
          userID: user?.userID,
        },
        env.JWT_SECRET,
        { expiresIn: "10s" }
      );

      const refreshToken = jwt.sign(
        {
          userID: user?.userID,
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
      response.setHeader("Content-Type", "application/json");
      response.end(
        JSON.stringify({
          message: err.message ? err.message : "Falha no servidor",
        })
      );
    }
  });
}
