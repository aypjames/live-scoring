import { useEffect, useState } from "react";
import styles from "./GameClock.module.scss";

const GameClock = ({
  gameMinute,
  setGameMinute,
  gameSeconds,
  setGameSeconds,
  clockActive,
  setGameEnd,
}) => {
  const stagesOfGames = [
    "",
    "GAME START",
    "1ST HALF",
    "HALF-TIME",
    "2ND HALF",
    "GAME END",
  ];
  const [intervalId, setIntervalId] = useState(0);
  const [gameStage, setGameStage] = useState(stagesOfGames);

  useEffect(() => {
    const stageReduced = gameStage.filter((stage) => stage !== gameStage[0]);
    setGameStage(stageReduced);

    if (clockActive) {
      const newIntervalId = setInterval(() => {
        setGameSeconds((gameSeconds) => {
          if (gameSeconds === 59) {
            setGameMinute((gameMinute) => gameMinute + 1);
            return 0;
          } else {
            return gameSeconds + 1;
          }
        });
      }, 1000);
      setIntervalId(newIntervalId);
    } else {
      if (gameStage[0] === "2ND HALF") {
        setGameEnd(true);
      }

      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(0);
        if (gameStage[0] === "1ST HALF") {
          setGameMinute(45);
          setGameSeconds(0);
        }
        return;
      }
    }
  }, [clockActive]);

  return (
    <>
      <h3 className={styles.GameClock_timer}>
        {gameMinute === 0 ? 0 : ""}
        {gameMinute}:{gameSeconds < 10 ? 0 : ""}
        {gameSeconds}
      </h3>
      <h5 className={styles.GameClock_stage}>{gameStage[0]}</h5>
    </>
  );
};

export default GameClock;
