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

namespace ReconBank.FrontUser.PubSub.EventTypeHandlers
{
    public interface IOperationWasMadeEventTypeHandler : IEventTypeHandler
    {
    }

    public class OperationWasMadeEventTypeHandler : EventTypeHandlerBase, IOperationWasMadeEventTypeHandler
    {
        private readonly IServiceProvider _serviceProvider;

        private readonly ILogger<OperationWasMadeEventTypeHandler> _logger;

        public OperationWasMadeEventTypeHandler(ILogger<OperationWasMadeEventTypeHandler> logger, IServiceProvider serviceProvider)
        {
            this._serviceProvider = serviceProvider;
            this._logger = logger;
        }

        public override async Task<SubscriberClient.Reply> HandleAsync(PubsubMessage message, CancellationToken cancellationToken)
        {
            var operation = JsonSerializer.Deserialize<Operation>(message.Data.ToArray(), JsonSerializationOptions.GetDefaultOptions());

            using (IServiceScope scope = this._serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<BankDbContext>();

                using (var transaction = dbContext.Database.BeginTransaction())
                {
                    var originBalance = await dbContext.Balance.SingleAsync(b => b.UserId == operation.OriginId);
                    var amountToUdpdateOriginalBalance = operation.AmountInCents;

                    if (operation.DestinationId.HasValue)
                    {
                        amountToUdpdateOriginalBalance *= -1;

                        var destinationBalance = await dbContext.Balance.SingleAsync(b => b.UserId == operation.DestinationId);
                        destinationBalance.AmountInCents += Math.Abs(operation.AmountInCents);
                        dbContext.Update(destinationBalance);
                    }

                    originBalance.AmountInCents += amountToUdpdateOriginalBalance;
                    dbContext.Update(originBalance);

                    dbContext.Operations.Add(operation);

                    await dbContext.SaveChangesAsync();
                    transaction.Commit();
                }
                this._logger.LogInformation("Operation with Id {0} was created, and balance was updated.", operation.Id);

                return SubscriberClient.Reply.Ack;
            }

        }
    }
}