import prisma from "../utility/prisma";
import bcrypt from "bcrypt";
import { CreateUserInput } from "../controller/schemas/user.schema";
import { Font, Prisma, Theme } from "@prisma/client";

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

export async function findUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function deleteById(id: number) {
  return await prisma.user.delete({
    where: { id },
  });
}

export async function updateUserById(id: number, data: { userTheme?: Theme; userFont?: Font }) {
  return await prisma.user.update({
    where: { id },
    data: {
      userTheme: data.userTheme,
      userFont: data.userFont,
    },
  });
}

