import prisma from "../utility/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getGames(
  request: FastifyRequest<{ Params: { userId: any } }>,
  reply: FastifyReply
) {
  
}


export async function addGame(
  request: FastifyRequest<{ Body: { userId: any; gameId: any } }>,
  reply: FastifyReply
) {
  
}
