const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

interface RecentGame {
    id: number;
    userId: number;
    gameId: number;
    playedAt: Date;
    game: Game;
}

interface Game {
    id: number;
    name: string;
}

exports.getRecentGames = async (userId: number): Promise<Game[]> => {
    const recentGames: RecentGame[] = await prisma.userRecentGame.findMany({
        where: {
            userId: parseInt(userId.toString())
        },
        include: {
            game: true
        },
        orderBy: {
            playedAt: 'desc'
        },
        take: 4
    });
    
    return recentGames.map(entry => entry.game);
};

interface AddRecentGameParams {
    userId: number;
    gameId: number;
}

interface RecentGameEntry {
    id: number;
    userId: number;
    gameId: number;
    playedAt: Date;
}

exports.addRecentGame = async (userId: number, gameId: number): Promise<Game[]> => {
    userId = parseInt(userId.toString());
    gameId = parseInt(gameId.toString());
    
    const existingEntry: RecentGameEntry | null = await prisma.userRecentGame.findUnique({
        where: {
            userId_gameId: {
                userId,
                gameId
            }
        }
    });
    
    if (existingEntry) {
        await prisma.userRecentGame.update({
            where: {
                id: existingEntry.id
            },
            data: {
                playedAt: new Date()
            }
        });
    } else {
        await prisma.userRecentGame.create({
            data: {
                userId,
                gameId
            }
        });
        
        const count: number = await prisma.userRecentGame.count({
            where: {
                userId
            }
        });
        
        if (count > 4) {
            const oldestGame: RecentGameEntry | null = await prisma.userRecentGame.findFirst({
                where: {
                    userId
                },
                orderBy: {
                    playedAt: 'asc'
                }
            });
            
            if (oldestGame) {
                await prisma.userRecentGame.delete({
                    where: {
                        id: oldestGame.id
                    }
                });
            }
        }
    }
    
    return await exports.getRecentGames(userId);
};