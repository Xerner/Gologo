using GologoServer.DTOs;
using GologoServer.Entities;
using GologoServer.Repositories;
using System.Linq;

namespace GologoServer.Services
{
    public class PlayerScoreService : IPlayerScoreService
    {
        private readonly IPlayerScoreRepository _playerScoreRepository;

        public PlayerScoreService(IPlayerScoreRepository playerScoreRepository) {
            _playerScoreRepository = playerScoreRepository;
        }

        public async Task<IEnumerable<PlayerScoreDTO>> GetPlayerScores()
        {
            var scores = await _playerScoreRepository.GetPlayerScores();
            IEnumerable<PlayerScoreDTO> playerScoreDTOs = scores.Select((score, index) => score.Map());
            return playerScoreDTOs;
        }

        public async Task<IEnumerable<PlayerScoreDTO>> UpdateScores(PlayerScoreDTO newScore)
        {
            PlayerScore score = new PlayerScore(newScore);
            var playerScores = await _playerScoreRepository.UpdateScores(score);
            var playerScoreDTOs = playerScores.Select(score => score.Map());
            return playerScoreDTOs;
        }
    }
}

public interface IPlayerScoreService
{
    Task<IEnumerable<PlayerScoreDTO>> GetPlayerScores();
    Task<IEnumerable<PlayerScoreDTO>> UpdateScores(PlayerScoreDTO newScore);
}
