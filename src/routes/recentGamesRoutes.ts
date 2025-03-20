import { FastifyInstance } from "fastify";
import { getRecentGames, updateRecentGames } from "../controller/handlers/recentGames.controller";
import { authorizationGuard } from "../middleware/auth.middleware";

export async function recentGamesRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>("/users/:id/recent-games", { preHandler: authorizationGuard }, getRecentGames);

  fastify.post<{ Params: { id: string }; Body: { gameId: string } }>("/users/:id/recent-games", { preHandler: authorizationGuard }, updateRecentGames);
}
