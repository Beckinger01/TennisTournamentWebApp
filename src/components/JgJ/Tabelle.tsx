import { useTeams } from "../../context/TeamsContext";

const Tabelle = () => {

    const { teams } = useTeams();
    const sortedTeams = [...teams].sort((a, b) => {
        if (b.winCount !== a.winCount) return b.winCount - a.winCount;
        return b.pointsAll - a.pointsAll;
    });

    return (
        <div className="bg-orange-900 bg-opacity-40 backdrop-blur-sm border border-orange-200 border-opacity-30 rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-orange-100 mb-2 tracking-wide">
                    🏆 RANGLISTE
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded"></div>
            </div>

            <div className="overflow-hidden rounded-xl border border-orange-200 border-opacity-20">
                <table className="w-full">
                    <thead>
                        <tr className="bg-red-800 bg-opacity-60 backdrop-blur-sm">
                            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-red-100 border-b border-red-300 border-opacity-20">
                                Rang
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-red-100 border-b border-red-300 border-opacity-20">
                                Team
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-red-100 border-b border-red-300 border-opacity-20">
                                Siege
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-red-100 border-b border-red-300 border-opacity-20">
                                Punkte
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTeams.map((team, idx) => {
                            const isFirst = idx === 0;
                            return (
                                <tr
                                    key={team.id}
                                    className={`${isFirst
                                            ? 'bg-yellow-800 bg-opacity-60'
                                            : idx % 2 === 0
                                                ? 'bg-orange-800 bg-opacity-30'
                                                : 'bg-orange-900 bg-opacity-50'
                                        } backdrop-blur-sm border-b border-orange-200 border-opacity-10 hover:bg-orange-700 hover:bg-opacity-40 transition-colors duration-200`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${isFirst
                                                ? 'bg-yellow-500 text-yellow-900'
                                                : 'bg-orange-600 bg-opacity-60 text-orange-100'
                                            }`}>
                                            {idx + 1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className={`font-bold text-lg ${isFirst ? 'text-yellow-200' : 'text-orange-100'}`}>
                                                {team.teamName}
                                                {isFirst && <span className="ml-2">👑</span>}
                                            </div>
                                            <div className="text-orange-300 text-sm">
                                                {team.spieler.join(" / ")}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className={`text-2xl font-bold ${isFirst ? 'text-yellow-200' : 'text-orange-100'}`}>
                                            {team.winCount}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className={`text-xl font-semibold ${isFirst ? 'text-yellow-200' : 'text-orange-200'}`}>
                                            {team.pointsAll}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tabelle;