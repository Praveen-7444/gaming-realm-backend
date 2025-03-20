import Fastify from 'fastify';
import fastifyCookie from "@fastify/cookie";
import userRoutes from './src/routes/user.route';
import authRoutes from './src/routes/auth.route';
import chatRoutes from './src/routes/chatbot';
import cors from '@fastify/cors';

const PORT: number = Number(process.env.PORT) || 3000;
const fastify = Fastify({ logger: true });



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

fastify.register(cors, {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  });
fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET, 
});
fastify.register(chatRoutes);
fastify.register(userRoutes, { prefix: '/api/users'});
fastify.register(authRoutes, { prefix: '/api/auth'});
startServer();

