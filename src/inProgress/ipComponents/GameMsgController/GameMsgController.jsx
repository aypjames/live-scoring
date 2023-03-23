import { useEffect, useState } from "react";

const GameMsgController = ({
  timeline,
  setTimeline,
  selectedTeam,
  gameEventType,
  setShowPlayerSelect,
  teamAName,
  teamBName,
  teamAScore,
  teamBScore,
  gameMinute,
}) => {
  // List of players initially playing on the field.
  let startingLineup = selectedTeam.players.filter(
    (player) => player.lineUp === "Active"
  );

  // List of players initially on the bench.
  let startingSubs = selectedTeam.players.filter(
    (player) => player.lineUp === "Substitute"
  );

  const [playersOnField, setPlayersOnField] = useState(startingLineup);
  const [playersOnBench, setPlayersOnBench] = useState(startingSubs);
  const [playerSelectedOne, setPlayerSelectedOne] = useState(
    selectedTeam.players[0].name
  );
  const [playerSelectedTwo, setPlayerSelectedTwo] = useState(
    startingSubs[0].name
  );

  useEffect(() => {
    setPlayersOnField(startingLineup);
    setPlayersOnBench(startingSubs);
  }, [selectedTeam]);

  let labelText = "";
  if (gameEventType == "Goal") {
    labelText = "Goal scorer";
  } else if (gameEventType == "Yellow Card" || gameEventType == "Red Card") {
    labelText = "Booked player";
  } else if (gameEventType == "Substitution") {
    labelText = "Player to bench";
  }

  // List for dropdown for players - e.g. Players on Bench can't score goals, however all players can get a yellow or red card at anytime.
  let playersList =
    gameEventType === "Goal" || gameEventType === "Substitution"
      ? playersOnField
      : selectedTeam.players;

  const handlePlayerSelect = (e) => {
    const player = e.target.value;
    const selectReference = e.target.name;

    //benchList select refers to the second select and it will only be used for instances of player substitution.
    if (selectReference == "benchList") {
      setPlayerSelectedTwo(player);
    } else {
      setPlayerSelectedOne(player);
    }
  };

  const handlePostClick = () => {
    let newTimelineMsg = "";
    const team = selectedTeam.shorthand;
    const playerOne = playerSelectedOne;
    const PlayerTwo = playerSelectedTwo;

    if (gameEventType == "Goal") {
      newTimelineMsg = `${gameMinute}' -- Goal to ${team} - ${playerSelectedOne}. ${teamAName} ${teamAScore} - ${teamBScore} ${teamBName}`;
    } else if (gameEventType === "Yellow Card") {
      newTimelineMsg = `${gameMinute}' -- ${gameEventType} to ${playerSelectedOne} (${team})`;
    } else if (gameEventType === "Red Card") {
      newTimelineMsg = `${gameMinute}' -- ${gameEventType} to ${playerSelectedOne} (${team})`;
      // #### need to change active players and bench players TO DO #####
    } else if (gameEventType == "Substitution") {
      newTimelineMsg = `${gameMinute}' -- ${gameEventType} (${team}) - IN: ${playerSelectedTwo} <-> OUT: ${playerSelectedOne}`;

      // ##### TO DO - UPDATING OF PLAYERS! #####
      //   // Updating players on field List
      //   const playerLeavingBench = playersOnBench.filter(
      //     (player) => player.name === playerSelectedTwo
      //   );
      //   const updatedFieldPlayers = playersOnField.filter(
      //     (player) => player.name !== playerSelectedOne
      //   );

      //   console.log("playerLeavingBench", playerLeavingBench);
      //   console.log("updatedFieldPlayers", updatedFieldPlayers);
      //   setPlayersOnField([...updatedFieldPlayers, playerLeavingBench[0]]);

      //   // Updating players on Bench List
      //   const playerComingFromField = playersOnField.filter(
      //     (player) => player.name === playerSelectedOne
      //   );
      //   const updatedBenchPlayers = playersOnBench.filter(
      //     (player) => player.name !== playerSelectedTwo
      //   );
      //   setPlayersOnBench([...updatedBenchPlayers, playerComingFromField[0]]);
    }
    setTimeline([newTimelineMsg, ...timeline]);
    setShowPlayerSelect(false);
  };

  return (
    <>
      <div>
        <label htmlFor="playersList">{labelText}: </label>
        <select
          name="playersList"
          id="playersList"
          onChange={handlePlayerSelect}
        >
          {playersList.map((player, index) => {
            return (
              <option key={index} value={player.name}>
                {player.name}
              </option>
            );
          })}
        </select>
      </div>

      <br />
      {gameEventType == "Substitution" && (
        <div>
          <label htmlFor="benchList">Player to field: </label>
          <select name="benchList" id="benchList" onChange={handlePlayerSelect}>
            {playersOnBench.map((player, index) => {
              return (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <button onClick={handlePostClick}>Post</button>
    </>
  );
};

export default GameMsgController;
