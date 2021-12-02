using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ReconBank.FrontUser.Db
{
    public static class DbMigrator
    {
        public static IApplicationBuilder MigrateBankDbContext(this IApplicationBuilder builder)
        {
            using var scope = builder.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            using var ctx = scope.ServiceProvider.GetRequiredService<BankDbContext>();

            ctx.Database.Migrate();

            return builder;
        }
    }
}