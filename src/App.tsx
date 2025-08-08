import { PlayersProvider } from "./context/PlayerContext";
import { TeamsProvider } from "./context/TeamsContext";
import AppContent from "./LandingPage";

function App() {
  return (
    <TeamsProvider>
      <PlayersProvider>
        <AppContent />
      </PlayersProvider>
    </TeamsProvider>
  )
}

export default App;