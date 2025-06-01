import { UUID } from "node:crypto";
import { UserSchema } from "../../utils/interfaces";

export interface UsersRepoInterface {
  createUser(userData: any): Promise<any>;
  getUserByEmail(userEmail: string): Promise<any>;
  getUserByID(userID: string): Promise<any>;
  updateUser(userEmail: string, userData: any): Promise<any>;
  deleteUser(userEmail: string): Promise<any>;
}
