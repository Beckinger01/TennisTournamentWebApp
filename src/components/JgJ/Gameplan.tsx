import { useState, useEffect } from "react";
import { useTeams } from "../../context/TeamsContext";

interface Team {
  id: string;
  teamName: string;
  spieler: string[];
  pointsAll: number;
  winCount: number;
}

interface Match {
  id: string;
  team1: Team;
  team2: Team;
  punkte1: number;
  punkte2: number;
}

const Gameplan = () => {
  const { teams, setWinCount, setPointsAll } = useTeams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [doneMatches, setDoneMatches] = useState<Match[]>([]);
  const [points1, setPoints1] = useState<number>(0);
  const [points2, setPoints2] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const sortMatches = (): Match[] => {
    const allMatches: Match[] = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        allMatches.push({
          id: `${teams[i].id}-vs-${teams[j].id}`,
          team1: teams[i],
          team2: teams[j],
          punkte1: 0,
          punkte2: 0,
        });
      }
    }
    return allMatches;
  };

  useEffect(() => {
    if (teams && teams.length > 0 && matches.length === 0 && doneMatches.length === 0) {
      const sortedMatches = sortMatches();
      setMatches(sortedMatches);
    }
  }, [teams, matches.length, doneMatches.length]);

  const handleCounter1 = () => {
    setPoints1(prev => prev >= 6 ? 0 : prev + 1);
  };

  const handleCounter2 = () => {
    setPoints2(prev => prev >= 6 ? 0 : prev + 1);
  };

  const handleSavePoints = () => {
    setError("");

    if (matches.length === 0) {
      setError("Kein aktuelles Spiel verfügbar!");
      return;
    }

    if (points1 === points2) {
      setError("Es kann kein Unentschieden geben!");
      return;
    }

    if (points1 < 3 && points2 < 3) {
      setError("Es wurden nicht genug Punkte gespielt!");
      return;
    }

    const matchCur = matches[0];

    if (points1 > points2) {
      setWinCount(matchCur.team1.id);
      setPointsAll(matchCur.team1.id, points1);
      setPointsAll(matchCur.team2.id, points2);
    } else {
      setWinCount(matchCur.team2.id);
      setPointsAll(matchCur.team1.id, points1);
      setPointsAll(matchCur.team2.id, points2);
    }

    matchCur.punkte1 = points1;
    matchCur.punkte2 = points2;

    setMatches(prev => prev.slice(1));
    setDoneMatches(prev => [...(prev || []), matchCur]);
    setPoints1(0);
    setPoints2(0);
  };

  if (!teams || teams.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-orange-900 bg-opacity-40 backdrop-blur-sm rounded-2xl border border-orange-200 border-opacity-30">
        <div className="text-orange-100 text-lg font-medium">Keine Teams verfügbar...</div>
      </div>
    );
  }

  return (
    <div className="bg-orange-900 bg-opacity-40 backdrop-blur-sm border border-orange-200 border-opacity-30 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-orange-100 mb-2 tracking-wide">
          🎾 ROLAND GARROS
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-4 rounded"></div>
        <p className="text-orange-200 text-lg font-medium">
          {teams.length} Teams • Jeder gegen Jeden
        </p>
      </div>

      {/* Current Match */}
      <div className="bg-red-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-red-300 border-opacity-20">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-red-100 mb-2">Aktuelles Match</h3>
          <div className="text-red-200 text-sm">
            {matches.length} Matches verbleibend
          </div>
        </div>

        {matches.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6 items-center">
              {/* Team 1 */}
              <div className="text-center">
                <div className="bg-orange-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-4 border border-orange-300 border-opacity-20">
                  <h1 className="text-2xl font-bold text-orange-100 mb-2">
                    {matches[0].team1.teamName}
                  </h1>
                  <p className="text-orange-200 text-sm mb-4">
                    {matches[0].team1.spieler.join(" / ")}
                  </p>
                  <button 
                    onClick={handleCounter1}
                    className="text-5xl font-bold text-orange-100 hover:text-white hover:scale-110 transition-all duration-200 bg-orange-700 bg-opacity-50 rounded-xl px-6 py-3 border border-orange-300 border-opacity-30"
                  >
                    {points1}
                  </button>
                </div>
              </div>

              {/* VS */}
              <div className="text-center">
                <div className="text-3xl font-bold text-red-100 bg-red-800 bg-opacity-60 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-red-300 border-opacity-30">
                  VS
                </div>
              </div>

              {/* Team 2 */}
              <div className="text-center">
                <div className="bg-orange-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-4 border border-orange-300 border-opacity-20">
                  <h1 className="text-2xl font-bold text-orange-100 mb-2">
                    {matches[0].team2.teamName}
                  </h1>
                  <p className="text-orange-200 text-sm mb-4">
                    {matches[0].team2.spieler.join(" / ")}
                  </p>
                  <button 
                    onClick={handleCounter2}
                    className="text-5xl font-bold text-orange-100 hover:text-white hover:scale-110 transition-all duration-200 bg-orange-700 bg-opacity-50 rounded-xl px-6 py-3 border border-orange-300 border-opacity-30"
                  >
                    {points2}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={handleSavePoints}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-3 px-8 rounded-xl border border-red-300 border-opacity-30 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🏆 Ergebnis speichern
              </button>
            </div>

            {error && (
              <div className="bg-red-800 bg-opacity-60 backdrop-blur-sm border border-red-400 border-opacity-40 rounded-lg p-3 text-center">
                <span className="text-red-200 font-medium">{error}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-2xl font-bold text-red-100">Turnier beendet!</p>
            <p className="text-red-200 mt-2">Alle Matches wurden gespielt</p>
          </div>
        )}
      </div>

      {/* Upcoming Matches */}
      {matches.length > 1 && (
        <div className="bg-orange-800 bg-opacity-40 backdrop-blur-sm rounded-xl p-6 mb-6 border border-orange-200 border-opacity-20">
          <h3 className="text-xl font-bold text-orange-100 mb-4 flex items-center">
            📅 Kommende Matches
          </h3>
          <div className="space-y-3">
            {matches.slice(1, 4).map((match, index) => (
              <div key={match.id} className="bg-orange-900 bg-opacity-50 rounded-lg p-3 border border-orange-300 border-opacity-20">
                <div className="flex items-center justify-between">
                  <span className="text-orange-200 font-medium">
                    {match.team1.teamName} vs {match.team2.teamName}
                  </span>
                  <span className="text-orange-300 text-sm">
                    Match {index + 2}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Matches */}
      {doneMatches.length > 0 && (
        <div className="bg-green-900 bg-opacity-40 backdrop-blur-sm rounded-xl p-6 border border-green-200 border-opacity-20">
          <h3 className="text-xl font-bold text-green-100 mb-4 flex items-center">
            ✅ Abgeschlossene Matches
          </h3>
          <div className="space-y-3">
            {doneMatches.map((match, index) => (
              <div key={match.id} className="bg-green-800 bg-opacity-50 rounded-lg p-4 border border-green-300 border-opacity-20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-green-100 font-medium">
                      {match.team1.teamName} vs {match.team2.teamName}
                    </span>
                    <div className="text-green-200 text-sm mt-1">
                      Match {index + 1}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-100">
                      {match.punkte1} : {match.punkte2}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gameplan;