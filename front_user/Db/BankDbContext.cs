using System;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ReconBank.Models.Balance;
using ReconBank.Models.Users;

namespace ReconBank.FrontUser.Db
{
    public class BankDbContext : DbContext
    {
        public string DbPath { get; private set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Balance> Balance { get; set; }

        public DbSet<Operation> Operations { get; set; }

        public BankDbContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = $"{path}{System.IO.Path.DirectorySeparatorChar}front_user.db";
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var utcDateConverter = new ValueConverter<DateTime, string>(
                v => v.ToString("o", CultureInfo.InvariantCulture),
                v => DateTime.ParseExact(v, "o", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal).ToUniversalTime()
            );

            modelBuilder
                .Entity<Operation>()
                .Property(e => e.Timestamp)
                .HasConversion(utcDateConverter);

            modelBuilder
                .Entity<Balance>()
                .Property(e => e.LastUpdatedAt)
                .HasConversion(utcDateConverter);
        }
    }
}