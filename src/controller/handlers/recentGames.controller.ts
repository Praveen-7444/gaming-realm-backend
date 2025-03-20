import {getGames,addGame} from '../../services/recentGames.service';
import { FastifyReply, FastifyRequest } from "fastify";


export async function getRecentGames(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
):Promise<void> {
  try {
    const userId = req.params.id;
    const recentGames = await getGames(
      { params: { userId } } as FastifyRequest<{ Params: { userId: any } }>,
      res
    );

    res.status(200).send({ recentGames });
  } catch (error) {
    console.error("Error getting recent games:", error);
    res.status(500).send({ error: "Internal server error" });
  }
}

export async function updateRecentGames(
  req: FastifyRequest<{ Params: { id: string }; Body: { gameId: string } }>,
  res: FastifyReply
):Promise<void> {
  try {
    const userId = req.params.id;
    const { gameId } = req.body;

    if (!gameId) {
      return res.status(400).send({ error: "Game ID is required" });
    }

    const updatedRecentGames = await addGame(
      { body: { userId, gameId } } as FastifyRequest<{ Body: { userId: any; gameId: any } }>,
      res
    );

    res.status(200).send({
      message: "Recent games updated successfully",
      recentGames: updatedRecentGames,
    });
  } catch (error) {
    console.error("Error updating recent games:", error);
    res.status(500).send({ error: "Internal server error" });
  }
}
