import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const PORT: number = Number(process.env.PORT) || 3000;
const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

const startServer = async () => {
    try {
        await fastify.listen({ port: PORT });
        fastify.log.info(`Server listening on ${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

fastify.get('/', async (request, reply) => {
    reply.send({ hello: 'world' });
});

fastify.register(require('./src/routes/chatbot.ts'));
fastify.register(require('./src/routes/game.ts'))
startServer();
