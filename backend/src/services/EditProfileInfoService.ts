import { UUID } from "node:crypto";
import { MysqlUsersRepository } from "../repositories/mysql/mysql-users-repository";
import bcryptjs from "bcryptjs";
import { IDDoNotExists } from "../../errors/id-do-not-exists";
import { WrongPassword } from "../../errors/wrong-password";

interface EditedUserInfoRequest {
  userID: string;
  username: string;
  currentPassword: string;
  newPassword: string;
}

interface EditedUserInfoResponse {
  userID: string;
  username: string;
  email: string;
}

export class EditProfileService {
  private UsersRepository: MysqlUsersRepository;

  constructor(repoParam: MysqlUsersRepository) {
    this.UsersRepository = repoParam;
  }

  async execute({
    userID,
    username,
    currentPassword,
    newPassword,
  }: EditedUserInfoRequest): Promise<EditedUserInfoResponse | null> {
    try {
      const doesThisIDExists = await this.UsersRepository.getUserByID(userID);

      if (!doesThisIDExists) {
        throw new IDDoNotExists();
      }

      const doesThePasswordsMatches = await bcryptjs.compare(
        currentPassword,
        doesThisIDExists.password
      );

      if (!doesThePasswordsMatches) {
        throw new WrongPassword();
      }

      const hashedPassword = await bcryptjs.hash(newPassword, 6);

      await this.UsersRepository.updateUser({
        userID,
        username,
        password: hashedPassword,
      });

      const updatedUser = await this.UsersRepository.getUserByID(userID);

      return {
        userID: updatedUser!.id,
        username: updatedUser!.userName,
        email: updatedUser!.email,
      };
    } catch (err) {
      throw new Error(err.message || "Error from service");
    }
  }
}
