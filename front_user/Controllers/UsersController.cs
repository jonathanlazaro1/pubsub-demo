using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReconBank.FrontUser.Configuration;
using ReconBank.FrontUser.Db;

namespace ReconBank.FrontUser.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly PublisherApiConfiguration _publisherApiConfiguration;

        private readonly BankDbContext _dbContext;

        private readonly HttpClient _httpClient = new HttpClient();

        public UsersController(PublisherApiConfiguration publisherApiConfiguration, BankDbContext dbContext)
        {
            this._publisherApiConfiguration = publisherApiConfiguration;
            this._dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsersAsync()
        {
            var users = await this._dbContext.Users.OrderBy(u => u.Name).ToListAsync();
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromQuery] string name)
        {
            var response = await this._httpClient.PostAsync($"{_publisherApiConfiguration.Address}/v1/users/user-was-created?name={name}", null);
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }

            throw new Exception($"Failed to create user with status {response.StatusCode}");
        }
    }
}