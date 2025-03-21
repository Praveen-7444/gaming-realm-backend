import { FastifyInstance } from "fastify";
import {
  getLike,
  getPreference,
  setLike,
  setPreference,
  unLike,
} from "../controller/handlers/user.controller";
import { authorizationGuard } from "../middleware/auth.middleware";
import { deleteUser, getUser } from "../controller/handlers/user.controller";

async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/:id", getUser);

  fastify.delete("/:id", deleteUser);

  // fastify.addHook("preHandler",authorizationGuard)

  fastify.get("/:id/preference", getPreference);
  fastify.put("/:id/preference", setPreference);
  fastify.get("/:id/like", getLike);
  fastify.post("/:id/like", setLike);
  fastify.delete("/:id/like", unLike);

  // to get the list of all users
  fastify.get("/", async (request, reply) => {
    // const users = await fastify.prisma.user.findMany();
    // reply.send(users);
    console.log("users");
    reply.send("users");
  });

  fastify.get("/:id/stats", async (request, reply) => {
    console.log("stats");
    reply.send("stats");
  });

  fastify.get("games/:id/stats", async (request, reply) => {
    console.log("games");
    reply.send("games");
  });
}

export default userRoutes;
