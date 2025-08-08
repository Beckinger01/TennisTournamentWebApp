import { useState } from "react";
import { Link } from "react-router-dom"
import Gameplan from "../components/JgJ/Gameplan";
import Tabelle from "../components/JgJ/Tabelle";
import { TeamsProvider } from "../context/TeamsContext";

const DoublesTournament = () => {
    const [showPopUp, setShowPopup] = useState(false);

    const handleBack = () => {
        setShowPopup(true);
    };

    const cancelBack = () => {
        setShowPopup(false);
    };

    return (
        <TeamsProvider>
            <div className="flex flex-col  items-center h-screen border-4 border-red-700">
                <button onClick={handleBack} className="text-white text-2xl font-semibold w-full text-start">Zurück</button>
                <div className="flex border h-full">
                    <Gameplan />
                    <div className="w-px h-full bg-gray-400 mx-4"></div>
                    <Tabelle />
                </div>
            </div>
            {showPopUp && (
                <div className="popupbackground h-screen w-full fixed inset-0 z-50 items-center flex justify-center">
                    <div className="bg-white">
                        <button onClick={cancelBack}>Abrechen</button>
                        <p>Wirklich verlassen? Dein Fortschritt wird nicht gespeichert!!</p>
                        <Link to="/">Ja</Link>
                    </div>
                </div>
            )}
        </TeamsProvider>
    )
}

export default DoublesTournament