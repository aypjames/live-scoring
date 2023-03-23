import { useState } from "react";
import styles from "./GameScoring.module.scss";
import GameClock from "../../components/GameClock/GameClock";

const GameScoring = ({
  teamA,
  setTeamA,
  teamB,
  setTeamB,
  allTeamsData,
  setAllTeamsData,
  setShowGameSelect,
  setShowTeamsLadder,
}) => {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [gameMinute, setGameMinute] = useState(0);
  const [gameSeconds, setGameSeconds] = useState(0);
  const [clockActive, setClockActive] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [gameMsgs, setGameMsgs] = useState([]);

  // Removing last score and last game message from team.
  const handleRemovePoint = (pointAllocation) => {
    if (teamAScore === 0 && teamBScore === 0) {
      return;
    }

    let text = "Are you sure you want to remove the goal?";

    if (confirm(text) == true) {
      let lastMsgRemoved = [];

      if (pointAllocation === "teamAPoints") {
        if (teamAScore > 0) {
          setTeamAScore(teamAScore - 1);
        }
        const onlyTeamAMsgs = gameMsgs.filter(
          (msg) => msg.source === teamA.name
        );
        const lastTeamAMsg = onlyTeamAMsgs[0];
        lastMsgRemoved = gameMsgs.filter((msg) => msg !== lastTeamAMsg);
      } else {
        if (teamBScore > 0) {
          setTeamBScore(teamBScore - 1);
        }
        const onlyTeamBMsgs = gameMsgs.filter(
          (msg) => msg.source === teamB.name
        );
        const lastTeamBMsg = onlyTeamBMsgs[0];
        lastMsgRemoved = gameMsgs.filter((msg) => msg !== lastTeamBMsg);
      }
      setGameMsgs(lastMsgRemoved);
    }
  };

  // Adding score to team and creating new game message.
  const handleAddPoint = (pointAllocation) => {
    let newTitle = "";
    let newComment = "";
    let msgSource = "";

    if (pointAllocation === "teamAPoints") {
      setTeamAScore(teamAScore + 1);
      newTitle = `${gameMinute}' Goal to ${teamA.name}!`;
      newComment = `${teamA.countryCode} ${teamAScore + 1} : ${teamBScore} ${
        teamB.countryCode
      }`;
      msgSource = teamA.name;
    } else {
      setTeamBScore(teamBScore + 1);
      newTitle = `${gameMinute}' Goal to ${teamB.name}!`;
      newComment = `${teamA.countryCode} ${teamAScore} : ${teamBScore + 1} ${
        teamB.countryCode
      }`;
      msgSource = teamB.name;
    }

    setGameMsgs([
      { title: newTitle, comment: newComment, source: msgSource },
      ...gameMsgs,
    ]);
  };

  // Activating and deactivating game clock.
  const handleStartGame = () => {
    setClockActive(!clockActive);
  };

  // Updating game results to teams data.
  const handleScoreSubmission = () => {
    const winPoints = 3;
    const drawPoints = 1;
    const filteredTeamsData = allTeamsData.filter(
      (team) => team !== teamA && team !== teamB
    );

    if (teamAScore === teamBScore) {
      teamA.points = teamA.points + drawPoints;
      teamA.draws = teamA.draws + 1;

      teamB.points = teamB.points + drawPoints;
      teamB.draws = teamB.draws + 1;
    } else if (teamAScore > teamBScore) {
      teamA.points = teamA.points + winPoints;
      teamA.wins = teamA.wins + 1;

      teamB.loses = teamB.loses + 1;
    } else {
      teamB.points = teamB.points + winPoints;
      teamB.wins = teamB.wins + 1;

      teamA.loses = teamA.loses + 1;
    }
    setAllTeamsData([...filteredTeamsData, teamA, teamB]);

    setTeamA(null);
    setTeamB(null);
    setShowGameSelect(false);
    setShowTeamsLadder(true);
  };

  // Resetting data for team A and team B selection and displaying first page.
  const handleTeamsSelectionReset = () => {
    setTeamA(null);
    setTeamB(null);
    setShowGameSelect(true);
  };

  return (
    <>
      {teamA && teamB && (
        <div className={styles.GameScoring}>
          <div className={styles.GameScoring_header}>
            <div className={styles.GameScoring_nav}>
              <span
                className="material-symbols-outlined"
                onClick={handleTeamsSelectionReset}
              >
                arrow_back_ios
              </span>
              <span className="material-symbols-outlined">settings</span>
            </div>
            <h2>Live Score</h2>
            <p>WSA WORLD CUP</p>
          </div>
          <div className={styles.GameScoring_tournieImg}>
            <img
              src="https://media.licdn.com/dms/image/C560BAQGOKfvKlURjLg/company-logo_200_200/0/1583459124960?e=2147483647&v=beta&t=-EtpocKp6rRct2SrsepRbCPOdmnIr2R1usgNjA2U90w"
              alt="WSA Logo"
            />
          </div>

          <div className={styles.GameScoring_pointsSystem}>
            <div className={styles.GameScoring_pointsSystem_rowOne}>
              <img src={teamA.img} alt={`flag of ${teamA.name}`} />
              <div className={styles.GameScoring_pointsSystem_rowOne_clock}>
                <GameClock
                  gameMinute={gameMinute}
                  setGameMinute={setGameMinute}
                  gameSeconds={gameSeconds}
                  setGameSeconds={setGameSeconds}
                  clockActive={clockActive}
                  setGameEnd={setGameEnd}
                />
              </div>
              <img src={teamB.img} alt={`flag of ${teamB.name}`} />
            </div>
            <div className={styles.GameScoring_pointsSystem_rowTwo}>
              <div className={styles.GameScoring_pointsSystem_rowTwo_content}>
                <h4>{teamA.name}</h4>
                <h1>{teamAScore}</h1>
                {clockActive && (
                  <div
                    className={
                      styles.GameScoring_pointsSystem_rowTwo_content_btns
                    }
                  >
                    <button
                      className={styles.secondaryBtn}
                      onClick={() => handleRemovePoint("teamAPoints")}
                      disabled={!clockActive}
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <button
                      className={styles.primaryBtn}
                      onClick={() => handleAddPoint("teamAPoints")}
                      disabled={!clockActive}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.GameScoring_pointsSystem_rowTwo_content}>
                <h4>{teamB.name}</h4>
                <h1>{teamBScore}</h1>
                {clockActive && (
                  <div
                    className={
                      styles.GameScoring_pointsSystem_rowTwo_content_btns
                    }
                  >
                    <button
                      className={styles.secondaryBtn}
                      onClick={() => handleRemovePoint("teamBPoints")}
                      disabled={!clockActive}
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <button
                      className={styles.primaryBtn}
                      onClick={() => handleAddPoint("teamBPoints")}
                      disabled={!clockActive}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {!gameEnd && (
              <div>
                <button
                  className={styles.GameScoring_btn_primary}
                  onClick={handleStartGame}
                >
                  {clockActive ? "Stop Clock" : "Start Clock"}
                </button>
              </div>
            )}
            {gameEnd && (
              <div>
                <button
                  className={styles.GameScoring_btn_secondary}
                  onClick={handleScoreSubmission}
                >
                  View Ladder
                </button>
              </div>
            )}
          </div>

          <div className={styles.GameScoring_gameMsgs}>
            {gameMsgs.map((msg, index) => {
              return (
                <div className={styles.GameScoring_gameMsgs_msg} key={index}>
                  <h4>{msg.title}</h4>
                  <p>{msg.comment}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default GameScoring;
