import { FastifyReply, FastifyRequest } from "fastify";
import { getPostGameMessage } from "../../services/game.service";
import { updateUserScore } from "../../services/game.service";

export async function postGameMessageHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { result } = request.body as { result: "win" | "lose" | "draw" };

    if (!["win", "lose", "draw"].includes(result)) {
      return reply.status(400).send({ message: "Invalid game result" });
    }

    const message = getPostGameMessage(result);
    reply.send({ message });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Error generating post-game message" });
  }
}



export async function updateScoreHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { userId, gameId, score } = request.body as { userId: number; gameId: number; score: number };

    if (!userId || !gameId || !score) {
      return reply.status(400).send({ message: "Missing required fields" });
    }

    const updatedGame = await updateUserScore(userId, gameId, score);
    reply.send({ message: "Score updated successfully", updatedGame });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Error updating score" });
  }
}

