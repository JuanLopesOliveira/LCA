import { FavoriteSchema } from "../../utils/interfaces";
import { MysqlFavoritesRepository } from "../repositories/mysql/mysql-favorites-repo";

interface FavoriteServiceRequest {
  userID: string;
}

export class GetFavorites {
  private favoritesRepository: MysqlFavoritesRepository;

  constructor(favoritesRepoParam: MysqlFavoritesRepository) {
    this.favoritesRepository = favoritesRepoParam;
  }

  async execute({
    userID,
  }: FavoriteServiceRequest): Promise<FavoriteSchema[] | null> {
    try {
      const allFavoritedMedias = await this.favoritesRepository.getFavorites(
        userID
      );

      return allFavoritedMedias;
    } catch (err) {
      console.log("err from get favorites: " + err.message);
      throw err;
    }
  }
}
