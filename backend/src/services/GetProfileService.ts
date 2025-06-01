import { UUID } from "node:crypto";
import { MysqlUsersRepository } from "../repositories/mysql/mysql-users-repository";

export class GetProfileService {
  private usersRepository: MysqlUsersRepository;

  constructor(repoParam: MysqlUsersRepository) {
    this.usersRepository = repoParam;
  }

  async execute(userID: string) {
    try {
      const user = await this.usersRepository.getUserByID(userID);

      console.log(user);
    } catch (err) {
      console.log(err);
      throw new Error("From GetProfileService: " + err.message);
    }
  }
}
