import { IncomingMessage, ServerResponse } from 'node:http';
import { z } from 'zod';
import authCheck from '../../utils/authCheck';
import jwt from 'jsonwebtoken';
import { env } from '../../../@env/env';
import { MysqlUsersRepository } from '../repositories/mysql/mysql-users-repository';
import { GetProfileService } from '../services/GetProfileService';
import { UnautorizedError } from '../../../errors/unauthorized';

export function getProfileController(
  request: IncomingMessage,
  response: ServerResponse,
) {
  let body: string = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', async () => {
    try {
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
        response.end();
        return false;
      }

      refreshToken = request.headers.cookie
        ?.split(';')[1]
        ?.split('refreshToken=')[1];

      const decoded = jwt.verify(refreshToken, env.JWT_SECRET);

      if (typeof decoded === 'object' && 'userID' in decoded) {
        userID = decoded.userID;
      }

      const userRepo = new MysqlUsersRepository();
      const getProfileService = new GetProfileService(userRepo);

      const user = await getProfileService.execute({ userID });

      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(user));
    } catch (err) {
      response.statusCode = 500;
      if (err instanceof UnautorizedError) {
        response.statusCode = 401;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ message: 'Não autorizado!' }));
        return
      }
      throw new Error(
        'From GetProfileController: ' + err.message || 'Falha no servidor',
      );
    }
  });
}
