export const sendChatSchema = {
    body: {
        type: 'object',
        required: ['message'],
        properties: {
            message: { type: 'string' },
            userId: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                chatReply: { type: 'string' },
            },
            required: ['chatReply'],
        },
    },
};
