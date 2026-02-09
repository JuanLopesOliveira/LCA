/* eslint-disable no-useless-catch */
import bcryptjs from "bcryptjs";
import { UserSchema } from "../../utils/interfaces";
import { MysqlUsersRepository } from "../repositories/mysql/mysql-users-repository";
import { EmailAlreadyExists } from "../../../errors/email-already-exists";
import crypto from "node:crypto"

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterServiceResponse {
  user: UserSchema | null;
}

export class RegisterService {
  private UserRepository: MysqlUsersRepository;

  constructor(userRepoParam: MysqlUsersRepository) {
    this.UserRepository = userRepoParam;
  }

  async execute({
    name,
    email,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    try {
      const doesEmailAlreadyExists = await this.UserRepository.getUserByEmail(
        email
      );

      if (doesEmailAlreadyExists) {
        throw new EmailAlreadyExists();
      }

      const hashedPassword = await bcryptjs.hash(password, 6);

      const newUser: UserSchema = {
        id: crypto.randomUUID(),
        userName: name,
        password: hashedPassword,
        email,
      };

      await this.UserRepository.createUser(newUser);
      const userCreated = await this.UserRepository.getUserByEmail(email)

      return {
        user: userCreated,
      };
    } catch (err) {
      throw err;
    }
  }
}

