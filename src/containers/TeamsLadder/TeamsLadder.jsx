import styles from "./TeamsLadder.module.scss";

const TeamsLadder = ({
  allTeamsData,
  setTeamA,
  setTeamB,
  setShowGameSelect,
  setShowTeamsLadder,
}) => {
  const ladderByPoints = allTeamsData.sort((a, b) => b.points - a.points);

  // Resetting data to create a new game.
  const handleNewGameClick = () => {
    setTeamA(null);
    setTeamB(null);
    setShowTeamsLadder(false);
    setShowGameSelect(true);
  };

  return (
    <div className={styles.TeamsLadder}>
      <div className={styles.TeamsLadder_header}>
        <h2>Leaderboard</h2>
        <p>WSA WORLD CUP</p>
      </div>
      <div className={styles.TeamsLadder_body}>
        <div className={styles.TeamsLadder_body_sponsor}>
          <div className={styles.TeamsLadder_body_sponsor_text}>
            <small>Brought to you by</small>
          </div>
          <div className={styles.TeamsLadder_body_sponsor_image}>
            <img
              src="https://images.ctfassets.net/8j5aqoy0ts8s/4jySPaEh2mr01RvfkuQoKf/4fe9e1602b683afb023d7a475f19bda1/logo-guideline-2_2x_170912_043411.png"
              alt="sponsor image"
            />
          </div>
        </div>

        <div className={styles.TeamsLadder_body_ladder}>
          <div className={styles.TeamsLadder_body_ladder_header}>
            <div className={styles.TeamsLadder_body_ladder_header_names}>
              <p>Rank</p>
            </div>
            <div className={styles.TeamsLadder_body_ladder_header_scores}>
              <h4>P</h4>
              <p>W</p>
              <p>D</p>
              <p>L</p>
            </div>
          </div>
          {ladderByPoints.map((team, index) => {
            return (
              <div
                key={team.id}
                className={styles.TeamsLadder_body_ladder_rows}
              >
                <div className={styles.TeamsLadder_body_ladder_rows_names}>
                  <h4>{index + 1}</h4>
                  <img src={team.img} alt={`flag of ${team.name}`} />
                  <h4>{team.name}</h4>
                </div>
                <div className={styles.TeamsLadder_body_ladder_rows_scores}>
                  <h4>{team.points}</h4>
                  <p>{team.wins}</p>
                  <p>{team.draws}</p>
                  <p>{team.loses}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className={styles.TeamsLadder_btn_primary}
        onClick={handleNewGameClick}
      >
        New Game
      </button>
    </div>
  );
};

export default TeamsLadder;
