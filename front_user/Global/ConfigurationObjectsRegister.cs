using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ReconBank.FrontUser.Configuration;

namespace ReconBank.FrontUser
{
    public static class ConfigurationObjectsRegister
    {
        private static T BindConfigurationObjectBySection<T>(string sectionName, IServiceProvider serviceProvider) where T : class
        {
            var configuration = serviceProvider.GetRequiredService<IConfiguration>();

            var configObject = Activator.CreateInstance<T>();
            configuration.Bind(sectionName, configObject);

            return configObject;
        }

        public static IServiceCollection RegisterConfigurationObjects(this IServiceCollection services)
        {
            services.AddSingleton((serviceProvider) => BindConfigurationObjectBySection<PubSubConfiguration>("PubSub", serviceProvider));
            services.AddSingleton((serviceProvider) => BindConfigurationObjectBySection<PublisherApiConfiguration>("PublisherApi", serviceProvider));

            return services;
        }
    }
}