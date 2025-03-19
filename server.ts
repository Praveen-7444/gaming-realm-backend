import Fastify from 'fastify';
import fastifyCookie from "@fastify/cookie";
import userRoutes from './src/routes/user.route';
import authRoutes from './src/routes/auth.route';


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

fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET, 
});
fastify.register(userRoutes, { prefix: '/api/users'});
fastify.register(authRoutes, { prefix: '/api/auth'});
fastify.register(require('./src/routes/chatbot.ts'));
startServer();
