import styles from "./GameSelect.module.scss";

const GameSelect = ({
  allTeamsData,
  teamA,
  setTeamA,
  teamB,
  setTeamB,
  setShowGameSelect,
}) => {
  // Handing selection of Team A and Team B for the match.
  const handleTeamSelect = (selectedTeamId) => {
    let teamDetails = allTeamsData.find((team) => team.id === selectedTeamId);

    if (teamA && teamB) {
      return;
    } else if (teamA) {
      setTeamB(teamDetails);
      setShowGameSelect(false);
    } else if (!teamA) {
      setTeamA(teamDetails);
    }
  };

  return (
    <div className={styles.GameSelect}>
      <div className={styles.GameSelect_header}>
        <h2>Match Select</h2>
        <p>WSA WORLD CUP</p>
      </div>
      <p className={styles.GameSelect_subTitle}>
        Pick two teams to start a new game!
      </p>
      <div className={styles.GameSelect_list}>
        {allTeamsData.map((team, index) => (
          <button
            key={team.id}
            onClick={() => handleTeamSelect(team.id)}
            disabled={team === teamA || team === teamB}
          >
            {<img src={team.img} alt={`flag of ${team.name}`} />}
            <h3>{team.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSelect;
