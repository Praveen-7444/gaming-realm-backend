import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function authorizationGuard(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const publicRoutes = ["/login", "/signup"]; 
  const currentPath = request.url;

  if (publicRoutes.includes(currentPath)) {
    return;
  }

  try {
    const token = request.cookies.token;

    if (!token) {
      return reply.redirect("api/auth/login");
    }

    jwt.verify(token, process.env.JWT_SECRET as string);

  } catch (error) {
    console.log("Unauthorized access attempt: ", error);
    return reply.redirect("api/auth/login");
  }
}
