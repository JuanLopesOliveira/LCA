import { UUID } from "node:crypto";
import { MysqlUsersRepository } from "../repositories/mysql/mysql-users-repository";

interface GetProfileServiceRequest {
  userID: string;
}

interface GetProfileServiceResponse {
  username: string;
  email: string;
}
export class GetProfileService {
  private usersRepository: MysqlUsersRepository;

  constructor(repoParam: MysqlUsersRepository) {
    this.usersRepository = repoParam;
  }

  async execute({
    userID,
  }: GetProfileServiceRequest): Promise<GetProfileServiceResponse | null> {
    try {
      const user = await this.usersRepository.getUserByID(userID);

      if (!user) {
        return null;
      }

      return {
        username: user?.userName,
        email: user?.email,
      };
    } catch (err) {
      throw new Error("From GetProfileService: " + err.message);
    }
  }
}
