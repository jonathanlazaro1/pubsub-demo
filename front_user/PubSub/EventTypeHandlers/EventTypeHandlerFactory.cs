using System;
using Microsoft.Extensions.DependencyInjection;

namespace ReconBank.FrontUser.PubSub.EventTypeHandlers
{
    public interface IEventTypeHandlerFactory
    {
        IEventTypeHandler GetHandlerByEventType(EventType eventType);
    }

    public class EventTypeHandlerFactory : IEventTypeHandlerFactory
    {
        private readonly IServiceProvider _serviceProvider;

        public EventTypeHandlerFactory(IServiceProvider serviceProvider)
        {
            this._serviceProvider = serviceProvider;
        }

        public IEventTypeHandler GetHandlerByEventType(EventType eventType)
        {
            switch (eventType)
            {
                case EventType.UserWasCreated:
                    return this._serviceProvider.GetService<IUserWasCreatedEventTypeHandler>();
                case EventType.OperationWasMade:
                    return this._serviceProvider.GetService<IOperationWasMadeEventTypeHandler>();
                default:
                    throw new ArgumentOutOfRangeException($"Unable to find a suitable handler from event type {eventType}");
            }
        }
    }
}