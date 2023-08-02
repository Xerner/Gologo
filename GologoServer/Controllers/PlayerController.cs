using GologoServer.DTOs;
using GologoServer.Entities;
using GologoServer.Services;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace GologoServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlayerController : ControllerBase
    {

        private readonly IPlayerScoreService _playerScoreService;
        private readonly ILogger<PlayerController> _logger;
        //private readonly MercuryContext _mercuryContext;

        public PlayerController(IPlayerScoreService playerScoreService, ILogger<PlayerController> logger)
        {
            _playerScoreService = playerScoreService;
            _logger = logger;
        }

        /// <summary>
        /// Get player scores asynchronously by returning the DTO wrapped in a JsonResult
        /// </summary>
        [HttpGet]
        [Route("Scores")]
        public async Task<IActionResult> GetScores()
        {
            var results = await _playerScoreService.GetPlayerScores();
            return new JsonResult(results);
        }

        /// <summary>
        /// Get player scores asynchronously by returning the DTO wrapped in a JsonResult
        /// </summary>
        [HttpGet]
        [Route("ScoresEF")]
        public async Task<IActionResult> GetScoresEF()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [Route("UpdateScores")]
        public async Task<IActionResult> UpdateScores(PlayerScoreDTOWrapper scoreWrapper)
        {
            PlayerScoreDTO newScore = scoreWrapper.Score;
            int expectedEnemies = scoreWrapper.expectedEnemies;
            try
            {
                if (newScore == null)
                {
                    var err = new ErrorDTO() { Message = "Invalid score", Details = "Score is null" };
                    return new BadRequestObjectResult(err);
                }
                if (newScore.Name == "")
                {
                    var err = new ErrorDTO() { Message = "Invalid score", Details = "Invalid name" };
                    return new BadRequestObjectResult(err);
                }
                if (newScore.EnemiesKilled != expectedEnemies)
                {
                    var err = new ErrorDTO() { Message = "Invalid score", Details = "Not enough enemies killed" };
                    return new BadRequestObjectResult(err);
                }

                var newScores = await _playerScoreService.UpdateScores(newScore);
                return Ok(newScores);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating player scores");
                var err = new ErrorDTO() { Message = ex.Message, Details = ex.TargetSite?.DeclaringType?.Name };
                return new BadRequestObjectResult(err);
            }
        }
    }
}
