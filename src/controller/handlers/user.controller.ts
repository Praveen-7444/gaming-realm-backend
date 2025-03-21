import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserById, deleteById, updateUserById} from "../../services/user.service";
import { CreateUserInput } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Font, Theme, User } from "@prisma/client";
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
      const { name, email, username} = user;
      reply.status(200).send({ message: "Data fetched successfully", data: {id, name, email, username} });
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


export async function getLike(
    request: FastifyRequest<{Params: { id: any } }>,
    reply: FastifyReply
) {
    try {
        let { id } = request.params;
        id = parseInt(id);
        const user: User | null = await findUserById(id);
        if (!user) {
          return reply.status(404).send({ message: "User not found" });
        }
        const { likedGames } = user;
        reply.status(200).send({ message: "Successfully fetched User Likes", data: {likedGames} });
      } catch (error) {
          console.log(error);
        reply.status(500).send({ message: "Error getting user Likes" });
      }
}




export async function setLike(
  request: FastifyRequest<{ Params: { id: any }; Body: { likes: number } }>,
  reply: FastifyReply
) {
  try {
    let { id } = request.params;
    id = parseInt(id); 
    const { likes } = request.body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    if(user.likedGames.includes(likes)){
      return reply.status(400).send({ message: "Game already exists in liked games" });
    }

    const newLikedGame : number[] = [];
    newLikedGame.push(...user.likedGames);
    newLikedGame.push(likes);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { likedGames: newLikedGame },
    });

    reply.status(200).send({
      message: "Successfully updated user likes",
      updatedLikes: updatedUser.likedGames,
    });
  } catch (error) {
    console.error("Error setting user likes:", error);
    reply.status(500).send({ message: "Error setting user Likes" });
  }
}

export async function unLike(
  request: FastifyRequest<{ Params: { id: any }; Body: { likes: number } }>,
  reply: FastifyReply
) {
  try {
    let { id } = request.params;
    id = parseInt(id); 
    const { likes } = request.body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }


     const updatedLikes = user.likedGames.filter((id: any) => id !== likes);
     console.log(updatedLikes)

  await prisma.user.update({
    where: { id },
    data: { likedGames: updatedLikes },
  });

  console.log(`Game with ID ${likes} removed from user's liked games`);
  reply.status(200).send({ message: "Successfully removed from liked games", updatedLikes });
  } catch (error) {
    console.error("Error setting user likes:", error);
    reply.status(500).send({ message: "Error setting user Likes" });
  }
}

