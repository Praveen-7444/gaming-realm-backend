import { FastifyInstance } from "fastify";
import { getRecentGames, updateRecentGames } from "../controller/handlers/recentGames.controller";
import { authorizationGuard } from "../middleware/auth.middleware";

const getRecentGamesOptions = {
  preHandler: authorizationGuard,
  handler: getRecentGames,
};

const updateRecentGamesOptions = {
  preHandler: authorizationGuard,
  handler: updateRecentGames,
};

const recentGamesRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/api/users/:id/recent-games", getRecentGamesOptions);
  fastify.post("/api/users/:id/recent-games", updateRecentGamesOptions);

  done();
};

export default recentGamesRoutes;
