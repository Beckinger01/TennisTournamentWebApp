import { Link } from "react-router-dom"
import { usePlayers } from "../context/PlayerContext";

const SinglesTournament = () => {
    const { players, deleteAll: deleteAllPlayers } = usePlayers();

    return (
        <>
            <header>
                <div className="p-3 text-white text-lg font-semibold flex gap-3 "><Link to="/" className="">← back</Link><span>|</span><button onClick={deleteAllPlayers} className=" border rounded-lg px-2 bg-red-700">reset</button></div>
            </header>
            <main>
                
            </main>
        </>
    )
}

export default SinglesTournament