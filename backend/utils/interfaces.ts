import { UUID } from "crypto";

export interface UserSchema {
  id: string;
  userName: string;
  email: string;
  password: string;
}

export interface UserInfo {
  userName: string;
  email: string;
}

export interface UpdateUserSchema {
  userID: string;
  username: string;
  password: string;
}

export interface FavoriteSchema {
  userID: UUID;
  mediaType: string;
  mediaID: number;
}
