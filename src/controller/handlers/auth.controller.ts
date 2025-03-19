import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail } from "../../services/user.service";
import { CreateUserInput } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export async function registerUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = request.body as CreateUserInput;

    const existingUser = await findUserByEmail(body.email);
    if (existingUser) {
      return reply.status(400).send({ message: "User already exists" });
    }

    const user = await createUser(body);

    const { name, email, username } = user;
    reply.status(201).send({ message: "User created successfully", user: { name, email, username } });
  } catch (error) {
    reply.status(500).send({ message: "Error registering user" });
  }
}

export async function loginUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body as { email: string; password: string };

    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET  as string, { expiresIn: "1h" });
    reply.setCookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
      maxAge: 3600, 
    }).send({ message: "Login successful", token });
  } catch (error) {
    reply.status(500).send({ message: "Error logging in" });
  }
}


export async function logoutUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.clearCookie("token").send({ message: "Logout successful" });
}