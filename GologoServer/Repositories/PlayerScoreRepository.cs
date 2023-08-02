using SqlKata.Compilers;
using SqlKata.Execution;
using Microsoft.Data.SqlClient;
using GologoServer.Entities;
using GologoServer.Context;
using SqlKata;

namespace GologoServer.Repositories
{
    public class PlayerScoreRepository : IPlayerScoreRepository
    {
        private QueryFactory _db { get; set; }
        private static string _connectionString;

        public PlayerScoreRepository(IConnectionString atlasConnectionString)
        {
            _connectionString = atlasConnectionString.DatabaseConnectionString;
            _db = new QueryFactory(new SqlConnection(_connectionString), new SqlServerCompiler());
        }

        public async Task<IEnumerable<PlayerScore>> GetPlayerScores()
        {
            var results = await _db.Query("dbo.Top10Scores")
                .GetAsync<PlayerScore>();
            return results;
        }

        public async Task<IEnumerable<PlayerScore>> UpdateScores(PlayerScore newScore)
        {
            var insertResults = await _db.Query("dbo.PlayerScores")
                .InsertAsync(new {
                newScore.Name,
                newScore.ShotsFired,
                newScore.EnemiesKilled
            });
            var newScores = await GetPlayerScores();
            var newScoreIds = newScores.Select(score => score.PlayerScoreId);
            var deleteResults = await _db.Query("dbo.PlayerScores")
                .WhereNotIn("PlayerScoreId", newScoreIds)
                .DeleteAsync();
            return newScores;
        }
    }
}

public interface IPlayerScoreRepository
{
    Task<IEnumerable<PlayerScore>> GetPlayerScores();
    Task<IEnumerable<PlayerScore>> UpdateScores(PlayerScore newScore);
}
