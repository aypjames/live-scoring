import { useState } from "react";
import "./App.css";
import GameSelect from "./containers/GameSelect/GameSelect";
import GameScoring from "./containers/GameScoring/GameScoring";
import TeamsLadder from "./containers/TeamsLadder/TeamsLadder";

import { league } from "./data/teams";

const App = () => {
  const [allTeamsData, setAllTeamsData] = useState(league);
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [showGameSelect, setShowGameSelect] = useState(true);
  const [showTeamsLadder, setShowTeamsLadder] = useState(false);

  return (
    <div className="App">
      {showGameSelect && (
        <GameSelect
          allTeamsData={allTeamsData}
          teamA={teamA}
          setTeamA={setTeamA}
          teamB={teamB}
          setTeamB={setTeamB}
          setShowGameSelect={setShowGameSelect}
        />
      )}

      {!teamA && !teamB ? null : (
        <GameScoring
          teamA={teamA}
          setTeamA={setTeamA}
          teamB={teamB}
          setTeamB={setTeamB}
          allTeamsData={allTeamsData}
          setAllTeamsData={setAllTeamsData}
          setShowGameSelect={setShowGameSelect}
          setShowTeamsLadder={setShowTeamsLadder}
        />
      )}

      {showTeamsLadder && (
        <TeamsLadder
          allTeamsData={allTeamsData}
          setTeamA={setTeamA}
          setTeamB={setTeamB}
          setShowGameSelect={setShowGameSelect}
          setShowTeamsLadder={setShowTeamsLadder}
        />
      )}
    </div>
  );
};

export default App;
