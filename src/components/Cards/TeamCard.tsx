
interface TeamCardProps {
    teamName: string;
    spieler: string[];
    onDelete: () => void;
}

const TeamCard = ({ teamName, spieler, onDelete }: TeamCardProps) => {

    return (
        <div className='sandbildCard rounded-lg flex border border-white flex-col items-center justify-between p-4 min-w-60 max-w-60 min-h-52'>
            <h1 className='text-4xl text-white font-bold text-center'>{teamName}</h1>
            <div className='flex'>
                {spieler.map((spielerName, index) => (
                    <span key={index} className=' text-3xl text-white'>
                        {spielerName}
                        {index !== spieler.length - 1 ? '/' : ''}
                    </span>
                ))}
            </div>
            <button onClick={onDelete} className='rounded-full bg-red-600 px-2 text-white'>X</button>
        </div>
    )
}

export default TeamCard