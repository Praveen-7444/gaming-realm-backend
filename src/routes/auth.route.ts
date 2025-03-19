import { FastifyInstance } from "fastify";
import {
  loginUserHandler,
  logoutUserHandler,
  registerUserHandler,
} from "../controller/handlers/auth.controller";
import { authorizationGuard } from "../middleware/auth.middleware";

async function authRoutes(fastify: FastifyInstance) {

  fastify.addHook("preHandler",authorizationGuard)
  
  fastify.post("/signup", registerUserHandler);

  fastify.post("/login", loginUserHandler);

  fastify.post("/logout", logoutUserHandler);

}

export default authRoutes;
