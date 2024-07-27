﻿// <auto-generated />
using System;
using AngularApp1.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AngularApp1.Server.Migrations
{
    [DbContext(typeof(GamestoreDbContext))]
    [Migration("20240725030004_GameExpansion")]
    partial class GameExpansion
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AngularApp1.Server.Models.Developer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Developers");
                });

            modelBuilder.Entity("AngularApp1.Server.Models.Game", b =>
                {
                    b.Property<int>("GameID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GameID"));

                    b.Property<string>("BannerPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GenreId")
                        .HasColumnType("int");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(4,2)");

                    b.Property<DateOnly>("ReleaseDate")
                        .HasColumnType("date");

                    b.HasKey("GameID");

                    b.HasIndex("GenreId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("AngularApp1.Server.Models.Genre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Genres");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "RPG"
                        },
                        new
                        {
                            Id = 2,
                            Name = "TBS"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Roguelike"
                        },
                        new
                        {
                            Id = 4,
                            Name = "FPS"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Sports"
                        },
                        new
                        {
                            Id = 6,
                            Name = "MOBA"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Hack and Slash"
                        },
                        new
                        {
                            Id = 8,
                            Name = "Third Person Shooter"
                        },
                        new
                        {
                            Id = 9,
                            Name = "Soulslike"
                        },
                        new
                        {
                            Id = 10,
                            Name = "Puzzle"
                        },
                        new
                        {
                            Id = 11,
                            Name = "Grand Strategy"
                        },
                        new
                        {
                            Id = 12,
                            Name = "RTS"
                        },
                        new
                        {
                            Id = 13,
                            Name = "CRPG"
                        },
                        new
                        {
                            Id = 14,
                            Name = "BattleRoyale"
                        });
                });

            modelBuilder.Entity("DeveloperGame", b =>
                {
                    b.Property<int>("DevelopersId")
                        .HasColumnType("int");

                    b.Property<int>("GamesGameID")
                        .HasColumnType("int");

                    b.HasKey("DevelopersId", "GamesGameID");

                    b.HasIndex("GamesGameID");

                    b.ToTable("DeveloperGame");
                });

            modelBuilder.Entity("AngularApp1.Server.Models.Game", b =>
                {
                    b.HasOne("AngularApp1.Server.Models.Genre", "Genre")
                        .WithMany("Games")
                        .HasForeignKey("GenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Genre");
                });

            modelBuilder.Entity("DeveloperGame", b =>
                {
                    b.HasOne("AngularApp1.Server.Models.Developer", null)
                        .WithMany()
                        .HasForeignKey("DevelopersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AngularApp1.Server.Models.Game", null)
                        .WithMany()
                        .HasForeignKey("GamesGameID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AngularApp1.Server.Models.Genre", b =>
                {
                    b.Navigation("Games");
                });
#pragma warning restore 612, 618
        }
    }
}
