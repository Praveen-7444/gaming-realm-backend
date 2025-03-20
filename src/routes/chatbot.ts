import { FastifyInstance } from 'fastify';
import { sendChatSchema } from '../controller/schemas/chatbot';
import { sendChatHandler } from '../controller/handlers/chatbot';

const sendChatOptions = {
    schema: sendChatSchema,
    handler: sendChatHandler,
};

const chatRoutes = (
    fastify: FastifyInstance,
    _: unknown,
    done: () => void
): void => {
    fastify.post('/api/chatbot/sendchat', sendChatOptions);
    done();
};

export default chatRoutes;
