const gameSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        src: { type: 'string' },
        alt: { type: 'string' },
        desc: { type: 'string' },
        category: { type: 'string' },
        videoSrc: { type: 'string' },
        recentlyPlayedSrc: { type: 'string' },
        gameUrl: { type: 'string' },
        highestScore: { type: 'number' },
    },
};

export const createGameSchema = {
    body: {
        items: gameSchema,
        required: [
            'id',
            'name',
            'src',
            'alt',
            'desc',
            'category',
            'videoSrc',
            'recentlyPlayedSrc',
            'gameUrl',
        ],
    },
    response: {
        201: {
            type: 'string',
        },
    },
};

export const getGameSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
    },
    response: {
        200: {
            item: gameSchema,
        },
    },
};

export const getGamesSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
    },
    response: {
        200: {
            items: gameSchema,
        },
    },
};
