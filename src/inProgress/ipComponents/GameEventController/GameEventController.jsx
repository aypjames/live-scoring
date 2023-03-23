import { startTransition, useState } from "react";
import styles from "./GameEventController.module.scss";

const GameEventController = ({
  teamDetails,
  teamScore,
  setTeamScore,
  setShowPlayerSelect,
  setGameEventType,
  setSelectedTeam,
  isControllerActive,
}) => {
  // List of players initially playing on the field.
  const startingLineup = teamDetails.players.filter(
    (player) => player.lineUp === "Active"
  );

  // List of players initially on the bench.
  const startingSubs = teamDetails.players.filter(
    (player) => player.lineUp === "Substitute"
  );

  // List of possible events in the game.
  const gameEvents = ["Goal", "Yellow Card", "Red Card", "Substitution"];

  const handleGameEvent = (e) => {
    // trigger select for goal scorer
    const gameEvent = e.target.value;
    setShowPlayerSelect(true);
    setGameEventType(gameEvent);
    setSelectedTeam(teamDetails);

    if (gameEvent == "Goal") {
      setTeamScore(teamScore + 1);
    }
  };

  return (
    <div className={styles.GameEventController}>
      <h4>{teamDetails.shorthand}</h4>
      <h1>{teamScore}</h1>
      <div className={styles.GameEventController_btns}>
        {gameEvents.map((btn, index) => (
          <button
            key={index}
            onClick={handleGameEvent}
            value={btn}
            disabled={isControllerActive}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameEventController;
