import { FastifyInstance } from 'fastify';
import {
    createGameSchema,
    getGameSchema,
    getGamesSchema,
} from '../controller/schemas/game';
import {
    createGameHandler,
    getAllGamesHandler,
    getGameHandler,
    getGameSearch,
} from '../controller/handlers/game';
import { get } from 'http';

const createGameOptions = {
    schema: createGameSchema,
    handler: createGameHandler,
};

const getGameOptions = {
    schema: getGameSchema,
    handler: getGameHandler,
};

const getGamesOptions = {
    schema: getGamesSchema,
    handler: getAllGamesHandler,
};

const gameRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
    fastify.post('/api/games', createGameOptions);
    fastify.get('/api/games/:id', getGameOptions);
    fastify.get('/api/games', getGamesOptions);
    fastify.get('/api/games/search', getGameSearch);

    done();
};

export default gameRoutes;
