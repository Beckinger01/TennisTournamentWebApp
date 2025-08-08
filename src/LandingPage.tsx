import { useState } from "react";
import { useTeams } from "./context/TeamsContext";
import { usePlayers } from "./context/PlayerContext";
import TeamsListe from "./components/TeamsListe";
import Logo from "./pic/Logo3.webp";
import { Link } from "react-router-dom";
import CreateTeamsSingles from "./components/CreateTeamsSingles";
import CreateTeamsDoubles from "./components/CreateTeamsDoubles";
import SpielerListe from "./components/SpielerListe";

function AppContent() {
    const [gamemode, setGamemode] = useState<number>();
    const [isStarted, setIsStarted] = useState<boolean>(false);

    const { teams, deleteAll: deleteAllTeams } = useTeams();
    const { players, deleteAll: deleteAllPlayers } = usePlayers();

    const chooseGamemode = (number: number, started: boolean) => {
        setGamemode(number);
        setIsStarted(true);
    };

    const handleDeleteAll = (toDelete: string) => {
        if (toDelete === "players") {
            deleteAllPlayers();
        } else if(toDelete === "teams") {
            deleteAllTeams();
        }else if(toDelete === "all"){
            deleteAllPlayers();
            deleteAllTeams();
        }else{
            console.log("Wrong delete parameter!");
        }
    };

    return (
        <>
            <header>
                <div className="p-3 text-white text-lg font-semibold flex gap-3 "><button onClick={() => setIsStarted(false)} className="">← back</button><span>|</span><button onClick={() => handleDeleteAll("all")} className=" border rounded-lg px-2 bg-red-700">reset</button></div>
                <div className="w-full flex items-center flex-col p-1">
                    <img src={Logo} alt="LogoSVB" width={175} height={175} />
                    <h1 className="text-9xl font-extrabold text-center text-white drop-shadow-2xl text-stroke-1 text-stroke-black">Tennisturnier 2025</h1>
                </div>
            </header>
            <main className="w-full flex items-center flex-col">
                {isStarted ? (
                    gamemode === 0 ? (
                        <>
                            <CreateTeamsSingles />
                            {players.length > 2 ? (
                                <Link to="./SinglesTournament" className="border border-white bg-green-600 rounded-lg p-1 text-white font-bold text-2xl mt-3">Starte Turnier!</Link>
                            ) : (
                                <p className="text-2xl text-white mt-3 font-bold p-1">Nicht genug Spieler registriert!</p>
                            )}
                            <div className="w-11/12 h-1 m-3 bg-blackT"></div>
                            <SpielerListe />
                        </>
                    ) : (
                        <>
                            <CreateTeamsDoubles />
                            {teams.length > 2 ? (
                                <Link to="./DoublesTournament" className="border border-white bg-green-600 rounded-lg p-1 text-white font-bold text-2xl mt-3">Starte Turnier!</Link>
                            ) : (
                                <p className="text-2xl text-white mt-3 font-bold p-1">Nicht genug Teams registriert!</p>
                            )}
                            <div className="w-11/12 h-1 m-3 bg-blackT"></div>
                            <TeamsListe />
                        </>
                    )
                ) : (
                    <>
                        <div className="pt-52 w-full flex gap-10 justify-center">
                            <button onClick={() => chooseGamemode(0, true)} className="py-3 px-4 min-w-60 inline-flex items-center gap-x-2 text-5xl text-center font-medium rounded-lg border border-transparent bg-blackT text-white hover:bg-orange-700 focus:outline-hidden focus:bg-orange-700 backdrop-blur-sm disabled:opacity-50 disabled:pointer-events-none"><span className="w-full text-center">Singles</span></button>
                            <button onClick={() => chooseGamemode(1, true)} className="py-5 px-7 min-w-60 inline-flex items-center gap-x-2 text-5xl text-center font-medium rounded-lg border border-transparent bg-blackT text-white hover:bg-orange-700 focus:outline-hidden focus:bg-orange-700 backdrop-blur-sm disabled:opacity-50 disabled:pointer-events-none"><span className="w-full text-center">Doubles</span></button>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}

export default AppContent;