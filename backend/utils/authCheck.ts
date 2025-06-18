import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import { env } from "../../@env/env";

interface JwtVerifyResult {
  userID: string;
  iat: number;
  exp: number;
}

export default async function authCheck(
  request: IncomingMessage,
  response: ServerResponse,
  shouldRequestBeEnded: boolean = true
): Promise<boolean | undefined> {
  console.log("entrou no authcheck");

  function verifyToken(token: string) {
    try {
      const tokenDecoded = jwt.verify(token, env.JWT_SECRET);
      return {
        decoded: tokenDecoded as JwtVerifyResult,
        error: null,
      };
    } catch (err) {
      return {
        decoded: null,
        error: err.name,
      };
    }
  }

  //recovering the tokens from cookies
  let accessTokenCookie: string = "";
  let refreshTokenCookie: string = "";

  /**
   * Here, i check what cookies exists to format correctly
   */

  if (!request.headers.cookie?.includes("refreshToken")) {
    console.log("AuthCheck: refresh cookie não existe");
    response.statusCode = 401;
    response.end(JSON.stringify({ message: "Faça login novamente!" }));
    return false;
  }

  if (!request.headers.cookie.includes("accessToken")) {
    console.log("AuthCheck: acccess cookie não existe");
    refreshTokenCookie = request.headers.cookie?.split("refreshToken=")[1];
  } else {
    console.log("AuthCheck: access cookie existe");
    accessTokenCookie = request.headers.cookie
      ?.split(";")[0]
      .split("accessToken=")[1];

    refreshTokenCookie = request.headers.cookie
      ?.split(";")[1]
      .split("refreshToken=")[1];
  }

  try {
    const doesAccessTokenStillValid = verifyToken(accessTokenCookie);

    const doesRefreshTokenStillValid = verifyToken(refreshTokenCookie);

    if (doesRefreshTokenStillValid.error != null) {
      console.log("Refresh é inválido");
      response.statusCode = 401;
      response.end(JSON.stringify({ message: "Faça login novamente!" }));
      return false;
    }

    if (!doesAccessTokenStillValid.error) {
      console.log("Access ainda é válido");
      if (shouldRequestBeEnded) {
        response.statusCode = 200;
        response.end();
      }
      return true;
    }

    if (doesAccessTokenStillValid.error !== "TokenExpiredError") {
      console.log("Access é inválido por algum motivo");
      response.statusCode = 401;
      response.end(JSON.stringify({ message: "Faça login novamente!" }));
      return false;
    }

    if (doesAccessTokenStillValid.error === "TokenExpiredError") {
      console.log("Access é válido, mas expirou. Gerando novo");

      const refreshedAccessToken: string = jwt.sign(
        {
          userID: doesRefreshTokenStillValid.decoded?.userID,
        },
        env.JWT_SECRET,
        { expiresIn: "15s" }
      );

      const refreshedRefreshToken: string = jwt.sign(
        {
          userID: doesRefreshTokenStillValid.decoded?.userID,
        },
        env.JWT_SECRET,
        { expiresIn: "25s" }
      );

      response.setHeader("Set-Cookie", [
        `accessToken=${refreshedAccessToken}; Path=/`,
        `refreshToken=${refreshedRefreshToken}; Path=/`,
      ]);

      if (shouldRequestBeEnded === true) {
        response.end();
        return true;
      }

      return true;
    }
  } catch (err) {
    throw err;
  }
}
