import prisma from "../utility/prisma";


export function getPostGameMessage(result: "win" | "lose" | "draw"): string {
    const messages = {
      win: ["You're unstoppable! 🏆", "Amazing win! 🎉", "Victory is yours! 🔥"],
      lose: ["Don't give up! 💪", "Try again! You got this! 🔥", "Tough luck! Better next time!"],
      draw: ["A tough match! 🤝", "That was close! ⚖️", "Evenly matched! Play again?"],
    };
  
    const randomIndex = Math.floor(Math.random() * messages[result].length);
    return messages[result][randomIndex];
}

export async function updateUserScore(userId: number, gameId: number, newScore: number) {
  const game = await prisma.game.findUnique({ where: { id: gameId } });

  if (!game) {
    throw new Error("Game not found");
  }

  const updatedGame = await prisma.game.update({
    where: { id: gameId },
    data: {
      highestScore: newScore > game.highestScore ? newScore : game.highestScore,
    },
  });

  let userRecentGame = await prisma.userRecentGame.findFirst({
    where: { userId, gameId },
  });

  if (!userRecentGame) {
    userRecentGame = await prisma.userRecentGame.create({
      data: { userId, gameId },
    });
  }

  return updatedGame;
}
