import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify();
const prisma = new PrismaClient();

fastify.get('/users', async (request, reply) => {
  const users = await prisma.user.findMany();
  reply.send(users);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
