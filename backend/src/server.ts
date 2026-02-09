import { IncomingMessage, ServerResponse } from "node:http";
import https from "node:https";
import { routes } from "./routes";
import dotenv from "dotenv";
import { env } from "../../@env/env";
import fs from "fs";

dotenv.config({ path: "../lca/.env" });
const port = env.NODE_HTTPS_SERVER_PORT;

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://localhost:5173",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

const httpsServer = https.createServer(
  options,
  (request: IncomingMessage, response: ServerResponse) => {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.setHeader(key, value);
    });

    if (request.method == "OPTIONS") {
      response.writeHead(204);
      return response.end();
    }

    const route = routes.find(
      (route) => request.url == route.path && request.method == route.method
    );

    if (route) {
      return route.handler(request, response);
    }

    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: "Rota não encontrada" }));
  }
);

httpsServer
  .listen(port, () => {
    console.log(`HTTPS server is running on port ${port}`);
  })
  .on("error", (err) => {
    console.log(`Something happened when starting server: ${err.message}`);
  });
