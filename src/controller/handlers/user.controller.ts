import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserById, deleteById} from "../../services/user.service";
import { CreateUserInput } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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