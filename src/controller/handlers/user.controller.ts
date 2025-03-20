import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail } from "../../services/user.service";
import { CreateUserInput } from "../schemas/user.schema";


export async function getPreference(
  request: FastifyRequest,
  reply: FastifyReply
) {
//   try {
//     const body = request.body as CreateUserInput;

//     const existingUser = await findUserByEmail(body.email);
//     if (existingUser) {
//       return reply.status(400).send({ message: "User already exists" });
//     }

//     const user = await createUser(body);

//     const { name, email, username } = user;
//     reply.status(201).send({ message: "User created successfully", user: { name, email, username } });
//   } catch (error) {
//     reply.status(500).send({ message: "Error registering user" });
//   }
}


export async function setPreference(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
  //   try {
  //     const body = request.body as CreateUserInput;
  
  //     const existingUser = await findUserByEmail(body.email);
  //     if (existingUser) {
  //       return reply.status(400).send({ message: "User already exists" });
  //     }
  
  //     const user = await createUser(body);
  
  //     const { name, email, username } = user;
  //     reply.status(201).send({ message: "User created successfully", user: { name, email, username } });
  //   } catch (error) {
  //     reply.status(500).send({ message: "Error registering user" });
  //   }
  }