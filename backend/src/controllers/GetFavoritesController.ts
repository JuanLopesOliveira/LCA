import { IncomingMessage, ServerResponse } from "node:http";
import authCheck from "../../utils/authCheck";
import jwt from "jsonwebtoken";
import { env } from "../../../@env/env";
import { MysqlFavoritesRepository } from "../repositories/mysql/mysql-favorites-repo";
import { GetFavorites } from "../services/GetFavoritesService";

export function getFavorites(
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

  let body = "";

  request.on("data", (chuck) => {
    body += chuck;
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
      const favoritesRepo = new MysqlFavoritesRepository();
      const favoriteService = new GetFavorites(favoritesRepo);

      const getAllFavorites = await favoriteService.execute({
        userID,
      });

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(
        JSON.stringify({
          getAllFavorites,
        })
      );
    } catch (err) {
      response.statusCode = 500;
      response.end();
      throw new Error(err.message ? err.message : "Falha no servidor");
    }
  });
}
