import prisma from "../utility/prisma";
import bcrypt from "bcrypt";
import { CreateUserInput } from "../controller/schemas/user.schema";

export async function createUser(input: CreateUserInput) {

  const hashedPassword = await bcrypt.hash(input.password, 10);
  return await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      username: input.username,
      password: hashedPassword,

    },
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
