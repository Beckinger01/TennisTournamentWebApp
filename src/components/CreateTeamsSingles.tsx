import { useState } from 'react';
import { usePlayers } from '../context/PlayerContext';

interface Player {
    playerName: string;
    pointsAll: number;
    winCount: number;
}

const CreateTeamsSingles = () => {

    const[playerName, setPlayerName] = useState<string>("");

    const { addPlayer } = usePlayers();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        const newPlayer: Player = {
            playerName,
            pointsAll: 0,
            winCount: 0,
        };

        addPlayer(newPlayer);
        setPlayerName("");
    }

    return (
        <div className=" bg-blackT rounded-lg p-5">
            <form onSubmit={handleSubmit}>
                <div className='flex gap-4 pb-4'>
                    <div className='text-white'>
                        <label className='text-2xl font-bold'>Spieler: </label>
                        <input
                            className='bg-transparent rounded-lg border p-1'
                            type='text'
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button className='w-full font-bold text-xl text-white border-2 border-green-600 rounded-full p-2 hover:border-green-400' type='submit'>Spieler hinzufügen</button>
            </form>
        </div>
    )
};

export default CreateTeamsSingles