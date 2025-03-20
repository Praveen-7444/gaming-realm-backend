import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function authorizationGuard(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const publicRoutes = ["/profile", "/signup"]; 
  const currentPath = request.url;
  console.log(currentPath)
  if (publicRoutes.includes(currentPath)) {
    return;
  }

  try {
    console.log(request.cookies);
    const token = request.cookies.token;

    if (!token) {
      console.log("Unauthorized access attempt: no token");
      return reply.redirect("http://localhost:3000/profile");
    }

    jwt.verify(token, process.env.JWT_SECRET as string);

  } catch (error) {
    console.log("Unauthorized access attempt: ", error);
    return reply.redirect("http://localhost:3000/profile");
  }
}
