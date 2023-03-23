import styles from "./Leaderboard.module.scss";

const Leaderboard = ({ teamsData }) => {
  const dataSortedByPointsDesc = teamsData.sort((a, b) => b.points - a.points);

  return (
    <>
      <h3 className={styles.Leaderboard_title}>Leaderboard</h3>
      <table className={styles.Leaderboard_table}>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
        </tr>

        {dataSortedByPointsDesc.map((team, index) => {
          return (
            <tr key={team.id}>
              <th className={styles.Leaderboard_table_value}>{index + 1}</th>
              <th
                className={`${styles.Leaderboard_table_value} ${styles.textAlignCenter}`}
              >
                {team.name}
              </th>
              <th className={styles.Leaderboard_table_value}>{team.points}</th>
              <th className={styles.Leaderboard_table_value}>{team.wins}</th>
              <th className={styles.Leaderboard_table_value}>{team.draws}</th>
              <th className={styles.Leaderboard_table_value}>{team.loses}</th>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default Leaderboard;
