import { FastifyInstance } from "fastify";
import {
  loginUserHandler,
  logoutUserHandler,
  registerUserHandler,
} from "../controller/handlers/auth.controller";
import { authorizationGuard } from "../middleware/auth.middleware";
import {changePasswordHandler} from "../controller/handlers/changepassword.controller"

async function authRoutes(fastify: FastifyInstance) {

  fastify.addHook("preHandler",authorizationGuard)
  
  fastify.post("/signup", registerUserHandler);

  fastify.post("/login", loginUserHandler);

  fastify.post("/logout", logoutUserHandler);

  fastify.post("/change-password", changePasswordHandler);

}

export default authRoutes;
