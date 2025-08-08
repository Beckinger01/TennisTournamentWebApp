import { useLocalStorage } from '@uidotdev/usehooks';
import { createContext, useContext, ReactNode } from 'react';

interface Team {
    id: string;
    teamName: string;
    spieler: string[];
    pointsAll: number;
    winCount: number;
}

interface TeamsContextType {
    teams: Team[];
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
    addTeam: (team: Omit<Team, 'id'>) => void;
    deleteTeam: (teamId: string) => void;
    deleteAll: () => void;
    setWinCount: (teamId: string) => void;
    setPointsAll: (teamId: string, increment: number) => void;
    isLoaded: boolean;
}

const TeamsContext = createContext<TeamsContextType | null>(null);

const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const TeamsProvider = ({ children }: { children: ReactNode }) => {
    const [teams, setTeams] = useLocalStorage<Team[]>("teams_doubles", []);

    const addTeam = (teamData: Omit<Team, 'id'>) => {
        const newTeam: Team = {
            ...teamData,
            id: generateId()
        };
        setTeams(prev => [...prev, newTeam]);
    };

    const deleteTeam = (teamId: string) => {
        setTeams(prev => prev.filter(team => team.id !== teamId));
    };

    const deleteAll = () => {
        setTeams([]);
    };

    const setWinCount = (teamId: string) => {
        setTeams(prev =>
            prev.map(team =>
                team.id === teamId
                    ? { ...team, winCount: team.winCount + 1 }
                    : team
            )
        );
    };

    const setPointsAll = (teamId: string, increment: number) => {
        setTeams(prev =>
            prev.map(team =>
                team.id === teamId
                    ? { ...team, pointsAll: team.pointsAll + increment }
                    : team)
        );
    };

    return (
        <TeamsContext.Provider value={{
            teams,
            setTeams,
            addTeam,
            deleteTeam,
            deleteAll,
            setWinCount,
            setPointsAll,
            isLoaded: true
        }}>
            {children}
        </TeamsContext.Provider>
    );
};

export const useTeams = () => {
    const context = useContext(TeamsContext);
    if (!context) {
        throw new Error('useTeams must be used within TeamsProvider');
    }
    return context;
};