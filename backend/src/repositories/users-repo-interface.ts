import { UUID } from "node:crypto";
import { UserSchema } from "../../utils/interfaces";

interface updateUserSchema {
  userID: UUID;
  username: string;
  password: string;
}

export interface UsersRepoInterface {
  createUser(userData: any): Promise<any>;
  getUserByEmail(userEmail: string): Promise<any>;
  getUserByID(userID: string): Promise<any>;
  updateUser({ userID, username, password }: updateUserSchema): Promise<any>;
  deleteUser(userEmail: string): Promise<any>;
}
