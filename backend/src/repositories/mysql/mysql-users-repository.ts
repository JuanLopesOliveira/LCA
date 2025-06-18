import { MysqlConnector } from "../../mysql/Connection";
import {
  UserInfo,
  UserSchema,
  UpdateUserSchema,
} from "../../../utils/interfaces";
import { UsersRepoInterface } from "../users-repo-interface";
import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";

export class MysqlUsersRepository implements UsersRepoInterface {
  private database: MysqlConnector;

  constructor() {
    this.database = new MysqlConnector();
  }

  async getUserByID(userID: string): Promise<UserSchema | null> {
    try {
      const connection = await this.database.connect();
      const query = "SELECT * from users WHERE id = ?";
      const [result] = await connection.execute<RowDataPacket[]>(query, [
        userID,
      ]);

      return result.length > 0 ? (result[0] as UserSchema) : null;
    } catch (err) {
      throw new Error("FromDBRepo: " + err.message);
    } finally {
      this.database.disconnect();
    }
  }

  async createUser(userData: UserSchema): Promise<boolean> {
    try {
      const connection = await this.database.connect();
      const query =
        "INSERT INTO users (id, userName, email, password)" +
        " VALUES (?, ?, ?, ?)";
      const [result] = await connection.execute<ResultSetHeader>(query, [
        userData.id,
        userData.userName,
        userData.email,
        userData.password,
      ]);

      return result.affectedRows > 0 ? true : false;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      this.database.disconnect();
    }
  }

  async getUserByEmail(userEmail: string): Promise<UserSchema | null> {
    try {
      const connection = await this.database.connect();
      const query = "SELECT * FROM users WHERE email = ?";
      const [result] = await connection.execute<RowDataPacket[]>(query, [
        userEmail,
      ]);

      return result.length > 0 ? (result[0] as UserSchema) : null;
    } catch (err) {
      throw new Error(`From DBRepo: ${err.message ? err.message : err.code}`);
    } finally {
      this.database.disconnect();
    }
  }

  async updateUser({
    userID,
    username,
    password,
  }: UpdateUserSchema): Promise<any> {
    try {
      const connection = await this.database.connect();
      const query = "UPDATE users SET userName = ?, password = ? WHERE id = ?";
      const [result] = await connection.execute<ResultSetHeader>(query, [
        username,
        password,
        userID,
      ]);

      return result.affectedRows > 0 ? true : false;
    } catch (err) {
      throw new Error(`From DBRepo: ${err.message}`);
    } finally {
      this.database.disconnect();
    }
  }

  async deleteUser() {}
}
