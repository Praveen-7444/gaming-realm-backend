import { FastifyInstance } from "fastify";
import {
  loginUserHandler,
  logoutUserHandler,
  registerUserHandler,
} from "../controller/handlers/auth.controller";

async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/signup", registerUserHandler);

  fastify.post("/login", loginUserHandler);

  fastify.post("/logout", logoutUserHandler);
}

export default authRoutes;
