import { MediaAlredyFavorited } from "../../errors/add-favorite-error";
import { FavoritesRepoError } from "../../errors/favorites-error";
import { MysqlFavoritesRepository } from "../repositories/mysql/mysql-favorites-repo";

interface FavoriteServiceRequest {
  userID: string;
  mediaType: string;
  mediaID: number;
}

interface FavoriteServiceResponse {
  success: boolean;
}

export class FavoriteService {
  private favoritesRepository: MysqlFavoritesRepository;

  constructor(favoriteRepoParam: MysqlFavoritesRepository) {
    this.favoritesRepository = favoriteRepoParam;
  }

  async execute({ userID, mediaType, mediaID }: FavoriteServiceRequest) {
    try {
      const doesThisMediaAreAlredyFavorited =
        await this.favoritesRepository.getFavorite(userID, mediaType, mediaID);

      if (doesThisMediaAreAlredyFavorited) {
        throw new MediaAlredyFavorited("Já favoritado!");
      }

      await this.favoritesRepository.addFavorite(userID, mediaType, mediaID);

      return {
        success: true,
      };
    } catch (err) {
      if (
        !(err instanceof FavoritesRepoError) &&
        !(err instanceof MediaAlredyFavorited)
      ) {
        throw new Error("Erro no servidor");
      }
      throw err;
    }
  }
}
