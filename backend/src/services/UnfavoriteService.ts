import { AlreadyUnfavoritedError } from "../../errors/already-unfavorited";
import { MysqlFavoritesRepository } from "../repositories/mysql/mysql-favorites-repo";

interface UnfavoriteServiceRequest {
  userID: string;
  mediaType: string;
  mediaID: number;
}

export class UnfavortieService {
  private favoritesRepository: MysqlFavoritesRepository;

  constructor(favoriteRepoParam: MysqlFavoritesRepository) {
    this.favoritesRepository = favoriteRepoParam;
  }

  async execute({ userID, mediaType, mediaID }: UnfavoriteServiceRequest) {
    const removeFavorite = await this.favoritesRepository.removeFavorite(
      userID,
      mediaType,
      mediaID
    );

    if (!removeFavorite) {
      throw new AlreadyUnfavoritedError();
    }

    return removeFavorite;
  }
}
