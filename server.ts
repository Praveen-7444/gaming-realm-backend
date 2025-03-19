import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import fastifyJwt from '@fastify/jwt';

const fastify = Fastify();
const prisma = new PrismaClient();

fastify.register(require('@fastify/jwt'), {
  secret: 'supersecret'
})

declare module 'fastify' {
export interface FastifyInstance {
  authenticate: any;
}
}

fastify.get('/users', async (request, reply) => {
  const users = await prisma.user.findMany();
  console.log("connected")
  reply.send(users);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});

