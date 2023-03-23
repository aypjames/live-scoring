import styles from "./Gameday.module.scss";
import { useState } from "react";
import GameEventController from "../../components/GameEventController/GameEventController";
import TimeCounter from "../../components/TimeCounter/TimeCounter";
import GameMsgController from "../../components/GameMsgController/GameMsgController";

const Gameday = ({ teamA, teamB }) => {
  const [timeline, setTimeline] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(teamA);
  const [gameEventType, setGameEventType] = useState("Goal");
  const [showPlayerSelect, setShowPlayerSelect] = useState(false);
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [gameMinute, setGameMinute] = useState(0);
  const [gameSeconds, setGameSeconds] = useState(0);
  const [isControllerActive, setIsControllerActive] = useState(true);

  const teamAshorthand = teamA.shorthand;
  const teamBshorthand = teamB.shorthand;

  // const [teamASubsTracker, setTeamASubsTracker] = useState(teamA.players);
  // const [teamBSubsTracker, setTeamBSubsTracker] = useState(teamB.players);

  const gameEvents = ["Goal", "Yellow Card", "Red Card", "Substitution"];

  return (
    <div className={styles.Gameday}>
      <div className={styles.Gameday_header}>
        <div className={styles.Gameday_header_nav}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
          <span className="material-symbols-outlined">settings</span>
        </div>
        <div className={styles.Gameday_header_title}>
          <h3>Finals</h3>
          <p>5-aside World Cup</p>
        </div>
        <div>Logo Image</div>
      </div>

      <div className={styles.Gameday_body}>
        <div className={styles.Gameday_body_top}>
          <div className={styles.Gameday_body_top_teamLogo}>
            <img src={teamA.logo.large} alt={`${teamA.name} logo`} />

            <GameEventController
              teamDetails={teamA}
              teamScore={teamAScore}
              setTeamScore={setTeamAScore}
              setGameEventType={setGameEventType}
              setShowPlayerSelect={setShowPlayerSelect}
              setSelectedTeam={setSelectedTeam}
              isControllerActive={isControllerActive}
            />
          </div>

          <div className={styles.Gameday_body_top_timer}>
            <TimeCounter
              gameMinute={gameMinute}
              setGameMinute={setGameMinute}
              gameSeconds={gameSeconds}
              setGameSeconds={setGameSeconds}
              isControllerActive={isControllerActive}
              setIsControllerActive={setIsControllerActive}
              timeline={timeline}
              setTimeline={setTimeline}
            />
          </div>

          <div className={styles.Gameday_body_top_teamLogo}>
            <img src={teamB.logo.large} alt={`${teamB.name} logo`} />
            <GameEventController
              teamDetails={teamB}
              teamScore={teamBScore}
              setTeamScore={setTeamBScore}
              setGameEventType={setGameEventType}
              setShowPlayerSelect={setShowPlayerSelect}
              setSelectedTeam={setSelectedTeam}
              isControllerActive={isControllerActive}
            />
          </div>
        </div>

        <br />
        {/* <button>End Game</button> */}
        {showPlayerSelect && (
          <GameMsgController
            timeline={timeline}
            setTimeline={setTimeline}
            selectedTeam={selectedTeam}
            gameEventType={gameEventType}
            setShowPlayerSelect={setShowPlayerSelect}
            teamAName={teamAshorthand}
            teamBName={teamBshorthand}
            teamAScore={teamAScore}
            teamBScore={teamBScore}
            gameMinute={gameMinute}
          />
        )}
      </div>

      <div>
        {timeline.map((event, index) => {
          return (
            <p key={index} className={styles.Gameday_body_para}>
              {event} <button>Remove</button>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Gameday;
