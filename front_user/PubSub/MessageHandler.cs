using System;
using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.PubSub.V1;
using Microsoft.Extensions.Logging;
using ReconBank.FrontUser.PubSub.EventTypeHandlers;

namespace ReconBank.FrontUser.PubSub
{
    public interface IMessageHandler
    {
        Task<SubscriberClient.Reply> HandleAsync(PubsubMessage message, CancellationToken cancellationToken);
    }

    public class MessageHandler : IMessageHandler
    {
        private readonly ILogger<MessageHandler> _logger;

        private readonly IEventTypeHandlerFactory _eventTypeHandlerFactory;

        public MessageHandler(ILogger<MessageHandler> logger, IEventTypeHandlerFactory eventTypeHandlerFactory)
        {
            this._logger = logger;
            this._eventTypeHandlerFactory = eventTypeHandlerFactory;
        }

        public async Task<SubscriberClient.Reply> HandleAsync(PubsubMessage message, CancellationToken cancellationToken)
        {
            var eventId = string.Empty;
            try
            {
                eventId = message.Attributes["event_id"];

                var strEventType = message.Attributes["type"];

                if (string.IsNullOrWhiteSpace(strEventType))
                {
                    this._logger.LogWarning("Event #{0} doesn't appear to have a type", eventId);
                    return SubscriberClient.Reply.Ack;
                }

                EventType eventType;
                if (!Enum.TryParse<EventType>(strEventType, out eventType))
                {
                    this._logger.LogWarning("Event type {0} from event #{1} is unknown", strEventType, eventId);
                    return SubscriberClient.Reply.Ack;
                }

                using (var handler = this._eventTypeHandlerFactory.GetHandlerByEventType(eventType))
                {
                    var reply = await handler.HandleAsync(message, cancellationToken);
                    this._logger.LogInformation("Event #{0} was consumed successfully", eventId);
                    return reply;
                }
            }
            catch (System.Exception e)
            {
                this._logger.LogError(e, "Event #{0} was not consumed", eventId);
                return SubscriberClient.Reply.Ack;
            }
        }
    }
}