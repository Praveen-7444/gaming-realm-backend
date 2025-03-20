import { FastifyInstance } from "fastify";
import { updateScoreHandler } from "../controller/handlers/game.controller";
import { postGameMessageHandler } from "../controller/handlers/game.controller";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.post("/api/games/:id/score", updateScoreHandler);
  fastify.post("/api/game/post-message", postGameMessageHandler);
}
