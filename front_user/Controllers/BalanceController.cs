using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReconBank.FrontUser.Configuration;
using ReconBank.FrontUser.Db;
using ReconBank.FrontUser.Models;

namespace ReconBank.FrontUser.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BalanceController : ControllerBase
    {
        private readonly PublisherApiConfiguration _publisherApiConfiguration;

        private readonly BankDbContext _dbContext;

        private readonly HttpClient _httpClient = new HttpClient();

        public BalanceController(PublisherApiConfiguration publisherApiConfiguration, BankDbContext dbContext)
        {
            this._publisherApiConfiguration = publisherApiConfiguration;
            this._dbContext = dbContext;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetBalanceByUserId(Guid userId)
        {
            var balance = await this._dbContext.Balance.SingleOrDefaultAsync(b => b.UserId == userId);
            if (balance == null)
            {
                return NotFound();
            }
            return Ok(balance);
        }

        [HttpGet("{userId}/stats")]
        public async Task<IActionResult> GetStatsByUserId(Guid userId)
        {
            var stats = new UserStats();
            var balance = await this._dbContext.Balance.SingleOrDefaultAsync(b => b.UserId == userId);
            if (balance == null)
            {
                return NotFound();
            }
            stats.Balance = balance;

            var operations = await this._dbContext
                .Operations
                .Where(o => o.OriginId == userId || o.DestinationId == userId)
                .ToListAsync();

            stats.OperationsCount = operations.Where(o => o.OriginId == userId).Count();

            stats.OutgoingAmountInCents = operations
                .Where(o => o.OriginId == userId)
                .Sum((o) =>
                {
                    if (o.DestinationId == userId)
                    {
                        return 0;
                    }

                    if (o.AmountInCents > 0)
                    {
                        return o.DestinationId.HasValue
                            ? o.AmountInCents
                            : 0;
                    }

                    return Math.Abs(o.AmountInCents);
                });

            stats.IncomingAmountInCents = operations
                .Sum((o) =>
                {
                    if (o.OriginId == userId)
                    {
                        return (o.AmountInCents > 0 && !o.DestinationId.HasValue)
                        ? o.AmountInCents
                        : 0;
                    }
                    return o.DestinationId == userId
                        ? o.AmountInCents
                        : 0;
                });

            return Ok(stats);
        }

        [HttpGet("{userId}/operations")]
        public async Task<IActionResult> GetOperationsByUserId(Guid userId)
        {
            var operations = await this._dbContext
                .Operations
                .Where(o => o.OriginId == userId || o.DestinationId == userId)
                .Include(o => o.Origin)
                .Include(o => o.Destination)
                .OrderByDescending(o => o.Timestamp)
                .ToListAsync();

            return Ok(operations);
        }

        [HttpPost("operation")]
        public async Task<IActionResult> CreateOperationAsync([FromBody] CreateOperationRequest request)
        {
            var queryString = $"origin_id={request.OriginId}&amount_in_cents={request.AmountInCents}&own_titularity={request.OwnTitularity}";
            if (request.DestinationId.HasValue)
            {
                queryString += $"&destination_id={request.DestinationId}";
            }

            var response = await this._httpClient.PostAsync($"{this._publisherApiConfiguration.Address}/v1/balance/operation-was-made?{queryString}", null);
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }

            throw new Exception($"Failed to create operation with status {response.StatusCode}");
        }
    }
}