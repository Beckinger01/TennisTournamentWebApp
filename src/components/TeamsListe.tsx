import { useTeams } from '../context/TeamsContext';
import TeamCard from './Cards/TeamCard';

const TeamsListe = () => {
    const {teams, deleteTeam} = useTeams();
    return (
        <div>
            <div className='flex gap-4 flex-wrap justify-center'>
                {teams.map((team, index) => (
                    <TeamCard
                        key={index}
                        teamName={team.teamName}
                        spieler={team.spieler}
                        onDelete={() => deleteTeam(team.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default TeamsListe