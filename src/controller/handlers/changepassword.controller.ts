import { FastifyReply, FastifyRequest } from "fastify";
import { findUserByEmail, updateUserPassword } from "../../services/user.service";
import bcrypt from "bcrypt";

export async function changePasswordHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email, oldPassword, newPassword } = request.body as {
      email: string;
      oldPassword: string;
      newPassword: string;
    };

    const user = await findUserByEmail(email);
    if (!user) {
      return reply.status(400).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return reply.status(400).send({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(email, hashedPassword);

    reply.status(200).send({ message: "Password changed successfully" });
  } catch (error) {
    reply.status(500).send({ message: "Error changing password" });
  }
}
