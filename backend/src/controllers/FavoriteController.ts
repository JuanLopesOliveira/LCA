import { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../../../@env/env";
import { MysqlFavoritesRepository } from "../repositories/mysql/mysql-favorites-repo";
import { FavoriteService } from "../services/FavoriteService";
import authCheck from "../../utils/authCheck";

export function favoriteMedia(
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
      return false;
    }

    refreshToken = request.headers.cookie
      ?.split(";")[1]
      ?.split("refreshToken=")[1];

    const decodedToken = jwt.verify(refreshToken, env.JWT_SECRET);
    userID = (decodedToken as JwtPayload).userID;

    try {
      const favoriteMediaBodySchema = z.object({
        mediaType: z.coerce.string(),
        mediaID: z.coerce.number(),
      });

      const favoriteMediaData = favoriteMediaBodySchema.parse(JSON.parse(body));

      const favoritesRepo = new MysqlFavoritesRepository();
      const favoriteService = new FavoriteService(favoritesRepo);

      const mediaToBeFavorited = await favoriteService.execute({
        userID,
        mediaType: favoriteMediaData.mediaType,
        mediaID: favoriteMediaData.mediaID,
      });

      response.statusCode = 200;
      response.end(JSON.stringify(favoriteMediaData));
    } catch (err) {
      response.statusCode = 500;
      response.end(
        JSON.stringify({
          response:
            err instanceof Error ? `${err.message}` : "Falha no servidor",
        })
      );
    }
  });
}
