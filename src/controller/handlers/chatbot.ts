import { genres } from '../../lib/data/data';
import { SendChatRequestBody } from '../../lib/types/chatbot';
import { FastifyReply, FastifyRequest } from 'fastify';

export const sendChatHandler = async (
    request: FastifyRequest<{ Body: SendChatRequestBody }>,
    reply: FastifyReply
) => {
    const { message, currentMenu } = request.body;

    let chatbotReply: any = [];

    if (currentMenu === 'main') {
        console.log(currentMenu);
        const filteredGenre = genres.find(
            (genre) => genre.id === Number(message.trim())
        );
        chatbotReply = filteredGenre;
    } else if (
        currentMenu === 'Mind Games' ||
        'Kids Games' ||
        'Multi Player' ||
        'Single Player'
    ) {
        const chosenGame = genres.find((genre) => genre.name === currentMenu)
            ?.games[Number(message) - 1];

        chatbotReply = chosenGame;
    }

    reply.send(JSON.stringify({ chatReply: chatbotReply }));
};
