import mysql from "mysql2/promise";
import { env } from "../../../@env/env";

export class MysqlConnector {
  private connection: mysql.Connection | null = null;

  async connect() {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DATABASE,
      });
    }

    return this.connection;
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}
