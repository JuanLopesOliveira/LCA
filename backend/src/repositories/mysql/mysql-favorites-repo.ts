import { ResultSetHeader, RowDataPacket } from "mysql2";
import { MysqlConnector } from "../../mysql/Connection";
import { FavoritesRepoInterface } from "../favorites-repo-interface";
import { FavoriteSchema, UserSchema } from "../../../utils/interfaces";
import { FavoritesRepoError } from "../../../errors/favorites-error";

export class MysqlFavoritesRepository implements FavoritesRepoInterface {
  private database: MysqlConnector;

  constructor() {
    this.database = new MysqlConnector();
  }
  async getFavorite(
    userID: string,
    mediaType: string,
    mediaID: number
  ): Promise<FavoriteSchema | null> {
    try {
      const connection = await this.database.connect();

      const query =
        "SELECT userID, mediaType, mediaID FROM favorites " +
        " WHERE userID = ?" +
        " AND mediaType = ?" +
        " AND mediaID = ?";

      const [result] = await connection.execute<RowDataPacket[]>(query, [
        userID,
        mediaType,
        mediaID,
      ]);

      return result.length > 0 ? (result[0] as FavoriteSchema) : null;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      this.database.disconnect();
    }
  }

  async getFavorites(userID: string): Promise<FavoriteSchema[] | null> {
    try {
      const connection = await this.database.connect();

      const query =
        "SELECT mediaType, mediaID FROM favorites" + " WHERE userID = ?";

      const [result] = await connection.execute<RowDataPacket[]>(query, [
        userID,
      ]);

      return result.length > 0 ? (result as FavoriteSchema[]) : null;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      this.database.disconnect();
    }
  }

  async addFavorite(
    userID: string,
    mediaType: string,
    mediaID: number
  ): Promise<boolean> {
    try {
      const connection = await this.database.connect();
      const query =
        "INSERT INTO favorites (userID, mediaType, mediaID)" +
        " VALUES (?, ?, ?)";

      const [result] = await connection.execute<ResultSetHeader>(query, [
        userID,
        mediaType,
        mediaID,
      ]);

      return result.affectedRows > 0 ? true : false;
    } catch (err) {
      throw new FavoritesRepoError(`FromDB repository: ${err.message}`);
    } finally {
      this.database.disconnect();
    }
  }

  async removeFavorite(
    userID: string,
    mediaType: string,
    mediaID: number
  ): Promise<boolean> {
    try {
      const connection = await this.database.connect();
      const query =
        "DELETE FROM favorites WHERE" +
        " userID = ? AND mediaType = ? AND mediaID = ?";
      const [result] = await connection.execute<ResultSetHeader>(query, [
        userID,
        mediaType,
        mediaID,
      ]);

      return result.affectedRows > 0 ? true : false;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      this.database.disconnect();
    }
  }
}
