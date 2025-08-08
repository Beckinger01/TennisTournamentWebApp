
interface PlayerCardProps {
    player: string;
    onDelete: () => void;
}

const PlayerCard = ({ player, onDelete }: PlayerCardProps) => {

    return (
        <div className='bg-blackT rounded-lg flex border border-white flex-col items-center justify-around p-4 min-w-60 max-w-60 min-h-52'>
            <h1 className='text-4xl text-white font-bold text-center'>{player}</h1>
            <button onClick={onDelete} className='rounded-full bg-red-600 px-2 text-white'>X</button>
        </div>
    )
}

export default PlayerCard