import { AlreadyUnfavoritedError } from "../../errors/already-unfavorited";
import { MysqlUsersRepository } from "../repositories/mysql/mysql-users-repository";

interface DeleteUserProfileServiceRequest {
  userEmail: string;
  userID: string;
}

export class DeleteUserProfileService {
  private usersRepository: MysqlUsersRepository;

  constructor(usersRepositoryParam: MysqlUsersRepository) {
    this.usersRepository = usersRepositoryParam;
  }

  async execute({
    userEmail,
    userID
  }: DeleteUserProfileServiceRequest) {
    const deleteUser = await this.usersRepository.deleteUser(userEmail, userID);

    if (!deleteUser) {
      throw new AlreadyUnfavoritedError();
    }

    return deleteUser;
  }
}
