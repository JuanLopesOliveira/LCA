import { IncomingMessage, ServerResponse } from 'node:http';
import { z } from 'zod';
import { RegisterService } from '../services/RegisterService';
import { MysqlUsersRepository } from '../repositories/mysql/mysql-users-repository';
import { EmailAlreadyExists } from '../../../errors/email-already-exists';
import jwt from 'jsonwebtoken';
import { env } from '../../../@env/env';

export function RegisterController(
  request: IncomingMessage,
  response: ServerResponse,
) {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', async () => {
    try {
      console.log('entrou no controller');
      const userBodySchema = z.object({
        username: z.string().min(5),
        email: z.string().email(),
        password: z.string().min(6),
      });

      const bodyData = userBodySchema.parse(JSON.parse(body));

      const usersRepo = new MysqlUsersRepository();
      const registerService = new RegisterService(usersRepo);

      const { user } = await registerService.execute({
        name: bodyData.username,
        email: bodyData.email,
        password: bodyData.password,
      });

      const accessToken = jwt.sign(
        {
          userID: user?.id,
        },
        env.JWT_SECRET,
        { expiresIn: '10s' },
      );

      const refreshToken = jwt.sign(
        {
          userID: user?.id,
        },
        env.JWT_SECRET,
        { expiresIn: '20s' },
      );

      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.setHeader('Set-Cookie', [
        `accessToken=${accessToken}; Path=/`,
        `refreshToken=${refreshToken}; Path=/`,
      ]);

      response.end(JSON.stringify({ success: 'Cadastro criado com sucesso' }));
    } catch (err) {
      err instanceof EmailAlreadyExists
        ? (response.statusCode = 409)
        : (response.statusCode = 500);

      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ error: err.message }));
    }
  });
}
