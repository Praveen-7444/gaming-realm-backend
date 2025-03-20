import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserById, deleteById, updateUserById} from "../../services/user.service";
import { CreateUserInput } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Font, Theme } from "@prisma/client";

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



export async function getPreference(
  request: FastifyRequest<{Params: { id: any } }>,
  reply: FastifyReply
) {
    try {
        let { id } = request.params;
        id = parseInt(id);
        const user = await findUserById(id);
        if (!user) {
          return reply.status(404).send({ message: "User not found" });
        }
        const { userTheme, userFont } = user;
        reply.status(200).send({ message: "Successfully fetched User Preference", data: {userTheme, userFont} });
      } catch (error) {
          console.log(error);
        reply.status(500).send({ message: "Error getting user Preference" });
      }
     
}


export async function setPreference(
    request: FastifyRequest<{Params: { id: any }; Body: { userTheme: Theme; userFont: Font }}>,
    reply: FastifyReply
  ) {
    try {
      let { id } = request.params;
      id = parseInt(id);
      const { userTheme, userFont } = request.body;

      const user = await findUserById(id);
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }

      await updateUserById(id, {userTheme, userFont});

      reply.status(200).send({
        message: "Successfully updated user preferences",
        updatedPreferences: { userTheme, userFont },
      });
    } catch (error) {
        console.log(error);
      reply.status(500).send({ message: "Error setting user Preference" });
    }
  }