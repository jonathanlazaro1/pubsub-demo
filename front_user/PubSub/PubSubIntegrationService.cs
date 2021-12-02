using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.PubSub.V1;
using Microsoft.Extensions.Hosting;
using ReconBank.FrontUser.Configuration;

namespace ReconBank.FrontUser.PubSub
{
    public class PubSubIntegrationService : BackgroundService
    {
        private readonly IMessageHandler _messageHandler;

        private readonly SubscriberClient _client;

        public PubSubIntegrationService(PubSubConfiguration pubSubConfiguration, IMessageHandler messageHandler)
        {
            this._messageHandler = messageHandler;

            var subscriptionName = SubscriptionName.FromProjectSubscription(pubSubConfiguration.ProjectId, pubSubConfiguration.SubscriptionId);

            _client = SubscriberClient.Create(subscriptionName,
                new SubscriberClient.ClientCreationSettings()
                    .WithEmulatorDetection(Google.Api.Gax.EmulatorDetection.EmulatorOnly));
        }


        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _client.StartAsync((message, cancellationToken) =>
            {
                return this._messageHandler.HandleAsync(message, cancellationToken);
            });

            return Task.CompletedTask;
        }

        public override Task StopAsync(CancellationToken cancellationToken)
        {
            _client.StopAsync(cancellationToken);

            return base.StopAsync(cancellationToken);
        }
    }
}