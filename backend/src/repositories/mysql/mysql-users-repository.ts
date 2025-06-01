import { MysqlConnector } from "../../mysql/Connection";
import { UserInfo, UserSchema } from "../../../utils/interfaces";
import { UsersRepoInterface } from "../users-repo-interface";
import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import { UUID } from "crypto";

export class MysqlUsersRepository implements UsersRepoInterface {
  private database: MysqlConnector;

  constructor() {
    this.database = new MysqlConnector();
  }

  async getUserByID(userID: string): Promise<UserInfo | null> {
    try {
      const connection = await this.database.connect();
      const query = "SELECT userName, email from users WHERE id = ?";
      const [result] = await connection.execute<RowDataPacket[]>(query, [
        query,
      ]);

      console.log(result);
      return result.length > 0 ? (result[0] as UserInfo) : null;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
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
      console.log(err);
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

  async updateUser() {}

  async deleteUser() {}
}
