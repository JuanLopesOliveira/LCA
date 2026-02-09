import { IncomingMessage, ServerResponse } from 'node:http';
import authCheck from '../../utils/authCheck';
import jwt from 'jsonwebtoken';
import { env } from '../../../@env/env';
import { z } from 'zod';
import { UnfavortieService } from '../services/UnfavoriteService';
import { MysqlFavoritesRepository } from '../repositories/mysql/mysql-favorites-repo';
import { AlreadyUnfavoritedError } from '../../../errors/already-unfavorited';

export default function unfavorite(
  request: IncomingMessage,
  response: ServerResponse,
) {
  if (request.headers.cookie == '' || !request.headers.cookie) {
    console.log('cookies não existem');
    response.statusCode = 401;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ message: 'Não autorizado!' }));
    return false;
  }

  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', async () => {
    let refreshToken: any = '';
    let userID: string = '';

    const tokenStillValidOrNewerWasGenerated = await authCheck(
      request,
      response,
      false,
    );

    if (!tokenStillValidOrNewerWasGenerated) {
      console.log('token não é válido');
      response.statusCode = 401;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ message: 'Não autorizado!' }));
      return false;
    }

    refreshToken = request.headers.cookie
      ?.split(';')[1]
      ?.split('refreshToken=')[1];

    const decoded = jwt.verify(refreshToken, env.JWT_SECRET);

    if (typeof decoded === 'object' && 'userID' in decoded) {
      userID = decoded.userID;
    }
    try {
      const unfavoriteMediaBodySchema = z.object({
        mediaType: z.coerce.string(),
        mediaID: z.coerce.number(),
      });

      const unfavoriteMediaData = unfavoriteMediaBodySchema.parse(
        JSON.parse(body),
      );

      const favoritesRepo = new MysqlFavoritesRepository();
      const unfavoriteService = new UnfavortieService(favoritesRepo);

      await unfavoriteService.execute({
        userID,
        mediaType: unfavoriteMediaData.mediaType,
        mediaID: unfavoriteMediaData.mediaID,
      });

      response.statusCode = 204;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ message: 'Desfavoritado' }));
    } catch (err) {
      if (err instanceof AlreadyUnfavoritedError) {
        response.statusCode = 404
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ message: 'Já está desfavoritado' }));
        return
      }
      response.statusCode = 500;
      response.setHeader('Content-Type', 'application/json');
      response.end(
        JSON.stringify({
          message:
            err instanceof Error ? `${err.message}` : 'Falha no servidor',
        }),
      );
    }
  });
}
