export type GameType = {
    id: number;
    name: string;
    src: string;
    alt: string;
    desc: string;
    category: string;
    videoSrc: string;
    recentlyPlayedSrc: string;
    gameUrl: string;
};

export interface GenreType {
    id: number;
    name: string;
    src: string;
    games: {
        name: string;
        id: number;
    }[];
}
