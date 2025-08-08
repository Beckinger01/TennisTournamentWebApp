import { useLocalStorage } from '@uidotdev/usehooks';
import { createContext, useContext, ReactNode } from 'react';

interface Player {
    id: string;
    playerName: string;
    pointsAll: number;
    winCount: number;
}

interface PlayersContextType {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    addPlayer: (player: Omit<Player, 'id'>) => void;
    deletePlayer: (playerId: string) => void;
    deleteAll: () => void;
    setWinCount: (playerId: string) => void;
    setPointsAll: (playerId: string, increment: number) => void;
    isLoaded: boolean;
}

const PlayersContext = createContext<PlayersContextType | null>(null);

const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
    const [players, setPlayers] = useLocalStorage<Player[]>("players_singles", []);

    const addPlayer = (playerData: Omit<Player, 'id'>) => {
        const newPlayer: Player = {
            ...playerData,
            id: generateId()
        };
        setPlayers(prev => [...prev, newPlayer]);
    };

    const deletePlayer = (playerId: string) => {
        setPlayers(prev => prev.filter(player => player.id !== playerId));
    };

    const deleteAll = () => {
        setPlayers([]);
    };

    const setWinCount = (playerId: string) => {
        setPlayers(prev =>
            prev.map(player =>
                player.id === playerId
                    ? { ...player, winCount: player.winCount + 1 }
                    : player
            )
        );
    };

    const setPointsAll = (playerId: string, increment: number) => {
        setPlayers(prev =>
            prev.map(player =>
                player.id === playerId
                    ? { ...player, pointsAll: player.pointsAll + increment }
                    : player)
        );
    };

    return (
        <PlayersContext.Provider value={{
            players,
            setPlayers,
            addPlayer,
            deletePlayer,
            deleteAll,
            setWinCount,
            setPointsAll,
            isLoaded: true
        }}>
            {children}
        </PlayersContext.Provider>
    );
};

export const usePlayers = () => {
    const context = useContext(PlayersContext);
    if (!context) {
        throw new Error('usePlayers must be used within PlayersProvider');
    }
    return context;
};