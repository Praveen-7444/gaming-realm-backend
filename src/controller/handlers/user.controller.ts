import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserById, deleteById,updateRecentlyPlayedGames} from "../../services/user.service";
import { CreateUserInput } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../../utility/prisma";


export async function getUser(
    request: FastifyRequest<{ Params: { id: any } }>,
    reply: FastifyReply
  ) {
    try {
      let { id } = request.params;
      id = parseInt(id);
      console.log(id)
      const user = await findUserById(id);
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }
      reply.send(user);
    } catch (error) {
      console.log(error);
      reply.status(500).send({ message: "Error getting user" });
    }
  }

export async function deleteUser(
    request: FastifyRequest<{ Params: { id: any } }>,
    reply: FastifyReply
  ) {
    try {
      let { id } = request.params;
      id = parseInt(id);
      const user = await findUserById(id);
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }
     await deleteById(id);
    } catch (error) {
        console.log(error);
      reply.status(500).send({ message: "Error getting user" });
    }
    reply.status(200).send({ message: "User deleted successfully" });
  }

  export async function updateUser(
    request: FastifyRequest<{ Params: { id: any; newQueue: string[] } }>,
    reply: FastifyReply
  ) {
    try {
      const { id, newQueue } = request.params;
  
      const updatedUser = await updateRecentlyPlayedGames(id,newQueue);
  
      reply.status(200).send({ message: "User updated successfully", updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      reply.status(500).send({ message: "Unable to update" });
    }
  }
  
  export async function getRecentlyPlayedGames(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
  
      const user = await prisma.user.findUnique({
        where: { id },
        select: { RecentlyPlayed: true },
      });
  
      if (!user) {
        reply.status(404).send({ message: "User not found" });
        return;
      }
  
      reply.status(200).send({ recentlyPlayed: user.RecentlyPlayed });
    } catch (error) {
      console.error("Error fetching recently played games:", error);
      reply.status(500).send({ message: "Unable to fetch data" });
    }
  }
  