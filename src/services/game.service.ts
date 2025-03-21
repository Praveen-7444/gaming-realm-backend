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


