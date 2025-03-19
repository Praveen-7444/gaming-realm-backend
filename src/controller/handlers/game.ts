import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GameType } from '../../lib/types/types';
import { getGameResponse } from '../../lib/types/game';

const prisma = new PrismaClient();

export const createGameHandler = async (
    req: FastifyRequest<{ Body: GameType }>,
    reply: FastifyReply
) => {
    try {
        await prisma.game.create({ data: req.body });
    } catch (err) {
        reply.status(400).send({ message: err });
        return;
    } finally {
        await prisma.$disconnect();
    }

    reply.status(201).send('New game created successfully');
};

export const getGameHandler = async (
    req: FastifyRequest<{ Params: getGameResponse }>,
    reply: FastifyReply
) => {
    try {
        const game = await prisma.game.findUnique({
            where: { id: req.params.id },
        });

        if (!game) {
            throw new Error('Game not found');
        }
        reply.send(game);
    } catch (err) {
        reply.status(404).send({ message: err });
    } finally {
        await prisma.$disconnect();
    }
};

export const getAllGamesHandler = async (
    _req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const games = await prisma.game.findMany();
        reply.send(games);
    } catch (err) {
        reply.status(500).send({ message: err });
    } finally {
        await prisma.$disconnect();
    }
};

export const updateGameHandler = async (
    req: FastifyRequest<{ Body: GameType }>,
    reply: FastifyReply
) => {
    try {
        const game = await prisma.game.update({
            where: { id: req.body.id },
            data: req.body,
        });
        reply.send(game);
    } catch (err) {
        reply.status(404).send({ message: err });
    } finally {
        await prisma.$disconnect();
    }
};

export const deleteGameHandler = async (
    req: FastifyRequest<{ Body: getGameResponse }>,
    reply: FastifyReply
) => {
    try {
        const game = await prisma.game.delete({
            where: { id: req.body.id },
        });
        reply.send(game);
    } catch (err) {
        reply.status(404).send({ message: err });
    } finally {
        await prisma.$disconnect();
    }
};
