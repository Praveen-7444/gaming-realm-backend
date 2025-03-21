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
        // let filteredGenre = null;

        // if (Number(message.trim())) {
        //     filteredGenre = genres.find(
        //         (genre) => genre.id === Number(message.trim())
        //     );
        // } else {
        //     const regex =
        //         /\b(Mind Games|Kids Games|Single Player|Multi Player)\b/gi;

        //     const match = message.match(regex);
        //     if (match) {
        //         console.log('Matched:', match[0]);
        //         filteredGenre = genres.find((genre) => genre.name === match[0]);
        //     }
        // }

        // if (filteredGenre === null) {
        //     console.log('No match found.');
        // }

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
