using System;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.PubSub.V1;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ReconBank.FrontUser.Db;
using ReconBank.Models.Balance;
using ReconBank.Models.Serialization;
using ReconBank.Models.Users;

namespace ReconBank.FrontUser.PubSub.EventTypeHandlers
{
    public interface IUserWasCreatedEventTypeHandler : IEventTypeHandler
    {
    }

    public class UserWasCreatedEventTypeHandler : EventTypeHandlerBase, IUserWasCreatedEventTypeHandler
    {
        private readonly IServiceProvider _serviceProvider;

        private readonly ILogger<UserWasCreatedEventTypeHandler> _logger;

        public UserWasCreatedEventTypeHandler(ILogger<UserWasCreatedEventTypeHandler> logger, IServiceProvider serviceProvider)
        {
            this._serviceProvider = serviceProvider;
            this._logger = logger;
        }

        public override async Task<SubscriberClient.Reply> HandleAsync(PubsubMessage message, CancellationToken cancellationToken)
        {
            var user = JsonSerializer.Deserialize<User>(message.Data.ToArray(), JsonSerializationOptions.GetDefaultOptions());

            using (IServiceScope scope = this._serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<BankDbContext>();

                if (await dbContext.Users.AnyAsync(p => p.Id == user.Id))
                {
                    this._logger.LogInformation("User with Id {0} already exists", user.Id);
                    return SubscriberClient.Reply.Ack;
                }
                using (var transaction = dbContext.Database.BeginTransaction())
                {
                    dbContext.Users.Add(user);
                    dbContext.Balance.Add(new Balance
                    {
                        User = user,
                        AmountInCents = 0,
                        LastUpdatedAt = DateTime.Now
                    });

                    await dbContext.SaveChangesAsync();
                    transaction.Commit();
                }
                this._logger.LogInformation("User with Id {0} was created", user.Id);

                return SubscriberClient.Reply.Ack;
            }

        }
    }
}