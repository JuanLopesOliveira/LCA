bexport interface FavoritesRepoInterface {
  getFavorite(userID: string, mediaType: string, mediaID: number): Promise<any>;
  getFavorites(userID: string): Promise<any>;
  addFavorite(userID: string, mediaType: string, mediaID: number): Promise<any>;
  removeFavorite(
    userID: string,
    mediaType: string,
    mediaID: number
  ): Promise<any>;
}
