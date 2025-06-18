import { IncomingMessage, ServerResponse } from "node:http";
import { RegisterController } from "./controllers/RegisterController";
import { LoginController } from "./controllers/LoginController";
import authCheck from "../utils/authCheck";
import { favoriteMedia } from "./controllers/FavoriteController";
import { getFavorites } from "./controllers/GetFavoritesController";
import unfavorite from "./controllers/UnfavoriteController";
import { getProfileController } from "./controllers/GetProfileController";
import { editProfileInfoController } from "./controllers/EditProfileInfoController";

export const routes = [
  {
    path: "/register",
    method: "POST",
    handler: (request: IncomingMessage, response: ServerResponse) => {
      RegisterController(request, response);
    },
  },
  {
    path: "/login",
    method: "POST",
    handler: (register: IncomingMessage, response: ServerResponse) => {
      LoginController(register, response);
    },
  },
  {
    path: "/authCheck",
    method: "GET",
    handler: (request: IncomingMessage, response: ServerResponse) => {
      authCheck(request, response);
    },
  },
  {
    path: "/favorite",
    method: "POST",
    handler: (request: IncomingMessage, response: ServerResponse) => {
      favoriteMedia(request, response);
    },
  },
  {
    path: "/getfavorites",
    method: "GET",
    handler: (request: IncomingMessage, response: ServerResponse) => {
      getFavorites(request, response);
    },
  },
  {
    path: "/unfavorite",
    method: "DELETE",
    handler: (request: IncomingMessage, response: ServerResponse) => {
      unfavorite(request, response);
    },
  },
  {
    path: "/getProfile",
    method: "GET",
    handler: (request: IncomingMessage, response: ServerResponse) => {
      getProfileController(request, response);
    },
  },
  {
    path: "/editProfile",
    method: "PATCH",
    handler: (request: IncomingMessage, response: ServerResponse) => {
      editProfileInfoController(request, response);
    },
  },
];
