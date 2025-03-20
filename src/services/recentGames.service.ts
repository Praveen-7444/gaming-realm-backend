import prisma from "../utility/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getGames(
  request: FastifyRequest<{ Params: { userId: any } }>,
  reply: FastifyReply
) {
  try {
    let { userId } = request.params;
    userId = parseInt(userId);
    
    const recentGames = await prisma.userRecentGame.findMany({
      where: { userId },
      include: { game: true },
      orderBy: { playedAt: "desc" },
      take: 4,
    });

    if (!recentGames.length) {
      return reply.status(404).send({ message: "No recent games found" });
    }

    reply.send(recentGames.map((entry) => entry.game));
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Error retrieving recent games" });
  }
}


export async function addGame(
  request: FastifyRequest<{ Body: { userId: any; gameId: any } }>,
  reply: FastifyReply
) {
  try {
    let { userId, gameId } = request.body;
    userId = parseInt(userId);
    gameId = parseInt(gameId);

    const existingEntry = await prisma.userRecentGame.findUnique({
      where: {
        userId_gameId: { userId, gameId },
      },
    });

    if (existingEntry) {
      await prisma.userRecentGame.update({
        where: { id: existingEntry.id },
        data: { playedAt: new Date() },
      });
    } else {
      await prisma.userRecentGame.create({
        data: { userId, gameId },
      });

      const count = await prisma.userRecentGame.count({
        where: { userId },
      });

      if (count > 4) {
        const oldestGame = await prisma.userRecentGame.findFirst({
          where: { userId },
          orderBy: { playedAt: "asc" },
        });

        if (oldestGame) {
          await prisma.userRecentGame.delete({
            where: { id: oldestGame.id },
          });
        }
      }
    }

    const recentGames = await getGames({ params: { userId } } as any, reply);
    reply.send(recentGames);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Error adding recent game" });
  }
}
