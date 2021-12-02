﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ReconBank.FrontUser.Db;

namespace ReconBank.FrontUser.Db.Migrations
{
    [DbContext(typeof(BankDbContext))]
    partial class BankDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("ReconBank.Models.Balance.Balance", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("AmountInCents")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("LastUpdatedAt")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Balance");
                });

            modelBuilder.Entity("ReconBank.Models.Balance.Operation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("AmountInCents")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("DestinationId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("OriginId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("OwnTitularity")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("DestinationId");

                    b.HasIndex("OriginId");

                    b.ToTable("Operations");
                });

            modelBuilder.Entity("ReconBank.Models.Users.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ReconBank.Models.Balance.Balance", b =>
                {
                    b.HasOne("ReconBank.Models.Users.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("ReconBank.Models.Balance.Operation", b =>
                {
                    b.HasOne("ReconBank.Models.Users.User", "Destination")
                        .WithMany()
                        .HasForeignKey("DestinationId");

                    b.HasOne("ReconBank.Models.Users.User", "Origin")
                        .WithMany()
                        .HasForeignKey("OriginId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Destination");

                    b.Navigation("Origin");
                });
#pragma warning restore 612, 618
        }
    }
}
