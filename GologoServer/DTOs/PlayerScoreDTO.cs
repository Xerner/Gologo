namespace GologoServer.DTOs
{
    public class PlayerScoreDTO
    {
        public string? Name { get; set; }
        public int ShotsFired { get; set; }
        public int EnemiesKilled { get; set; }
    }

    public class PlayerScoreDTOWrapper
    {
        public PlayerScoreDTO? Score { get; set; }
        public int expectedEnemies { get; set; }
    }
}
