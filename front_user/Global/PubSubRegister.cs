using Microsoft.Extensions.DependencyInjection;
using ReconBank.FrontUser.PubSub;
using ReconBank.FrontUser.PubSub.EventTypeHandlers;

namespace ReconBank.FrontUser
{
    public static class PubSubRegister
    {
        public static IServiceCollection AddPubSubIntegration(this IServiceCollection services)
        {
            services.AddSingleton<IMessageHandler, MessageHandler>();

            services.AddTransient<IEventTypeHandlerFactory, EventTypeHandlerFactory>();
            services.AddTransient<IUserWasCreatedEventTypeHandler, UserWasCreatedEventTypeHandler>();
            services.AddTransient<IOperationWasMadeEventTypeHandler, OperationWasMadeEventTypeHandler>();

            services.AddHostedService<PubSubIntegrationService>();

            return services;
        }
    }
}