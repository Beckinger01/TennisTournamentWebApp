import { useState } from 'react';
import { useTeams } from '../context/TeamsContext';

interface Team {
    teamName: string;
    spieler: string[];
    pointsAll: number;
    winCount: number;
}

const CreateTeamsDoubles = () => {

    const [teamName, setTeamName] = useState<string>("");
    const [spieler1, setSpieler1] = useState<string>("");
    const [spieler2, setSpieler2] = useState<string>("");

    const { addTeam } = useTeams();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        const newTeam: Team = {
            teamName,
            spieler: [spieler1, spieler2],
            pointsAll: 0,
            winCount: 0,
        };

        addTeam(newTeam);
        setTeamName("");
        setSpieler1("");
        setSpieler2("");
    }

    return (
        <div className=" sandgradient rounded-lg p-5">
            <form onSubmit={handleSubmit}>
                <div className='text-white pb-4'>
                    <label className='text-2xl font-bold'>Teamname: </label>
                    <input
                        className='bg-transparent rounded-lg border w-full p-1'
                        type='text'
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                    />
                </div>
                <div className='flex gap-4 pb-4'>
                    <div className='text-white'>
                        <label className='text-2xl font-bold'>Spieler 1: </label>
                        <input
                            className='bg-transparent rounded-lg border p-1'
                            type='text'
                            value={spieler1}
                            onChange={(e) => setSpieler1(e.target.value)}
                            required
                        />
                    </div>
                    <div className='text-white'>
                        <label className='text-2xl font-bold'>Spieler 2: </label>
                        <input
                            className='bg-transparent rounded-lg border p-1'
                            type='text'
                            value={spieler2}
                            onChange={(e) => setSpieler2(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button className='w-full font-bold text-xl text-white border-2 border-green-600 rounded-full p-2 hover:border-green-400' type='submit'>Team hinzufügen</button>
            </form>
        </div>
    )
};

export default CreateTeamsDoubles