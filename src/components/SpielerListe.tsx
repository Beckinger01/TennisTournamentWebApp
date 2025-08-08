import { usePlayers } from '../context/PlayerContext';
import PlayerCard from './Cards/PlayerCard';

const SpielerListe = () => {
    const { players, deletePlayer } = usePlayers();
    return (
        <div>
            <div className='flex gap-4 flex-wrap justify-center'>
                {players.map((player, index) => (
                    <PlayerCard
                        key={index}
                        player={player.playerName}
                        onDelete={() => deletePlayer(player.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default SpielerListe