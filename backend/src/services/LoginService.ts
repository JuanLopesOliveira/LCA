/* eslint-disable no-useless-catch */
import { UUID } from "node:crypto";
import { EmailOrPasswordIncorrect } from "../../../errors/email-or-password-incorrect";
import { UserSchema } from "../../utils/interfaces";
import { MysqlUsersRepository } from "../repositories/mysql/mysql-users-repository";
import bcryptjs from "bcryptjs";

interface LoginServiceRequest {
  email: string;
  password: string;
}

interface LoginServiceResponse {
  id: string;
}

export class LoginService {
  private UserRepository: MysqlUsersRepository;

  constructor(userRepoParam: MysqlUsersRepository) {
    this.UserRepository = userRepoParam;
  }

  async execute({
    email,
    password,
  }: LoginServiceRequest): Promise<LoginServiceResponse> {
    try {
      const doesEmailExists: UserSchema | null =
        await this.UserRepository.getUserByEmail(email);

      if (!doesEmailExists) {
        throw new EmailOrPasswordIncorrect();
      }

      const doesPasswordsMatch = await bcryptjs.compare(
        password,
        doesEmailExists.password
      );

      if (!doesPasswordsMatch) {
        throw new EmailOrPasswordIncorrect();
      }

      return { id: doesEmailExists.id };
    } catch (err) {
      throw err;
    }
  }
}
