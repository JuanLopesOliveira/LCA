import { UUID } from "crypto";

export interface UserSchema {
  id: UUID;
  userName: string;
  password: string;
  email: string;
}

export interface UserInfo {
  userName: string;
  email: string;
}

export interface FavoriteSchema {
  userID: UUID;
  mediaType: string;
  mediaID: number;
}
