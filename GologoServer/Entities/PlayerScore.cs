using GologoServer.DTOs;
using GologoServer.Entities.Interfaces;

namespace GologoServer.Entities
{
    public class PlayerScore : IMapper<PlayerScoreDTO>
    {
        public PlayerScore() { }

        public PlayerScore(string? name, int shotsFired, int enemysKilled)
        {
            Name = name;
            ShotsFired = shotsFired;
            EnemiesKilled = enemysKilled;
        }

        public PlayerScore(PlayerScoreDTO score)
        {
            Name = score.Name;
            ShotsFired = score.ShotsFired;
            EnemiesKilled = score.EnemiesKilled;
        }

        public int PlayerScoreId { get; set; }
        public string? Name { get; set; }
        public int ShotsFired { get; set; }
        public int EnemiesKilled { get; set; }

        public PlayerScoreDTO Map()
        {
            return new PlayerScoreDTO() {
                Name = this.Name,
                ShotsFired = this.ShotsFired,
                EnemiesKilled = this.EnemiesKilled,
            };
        }
    }
}
