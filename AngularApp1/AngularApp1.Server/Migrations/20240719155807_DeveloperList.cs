using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class DeveloperList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Developers_Games_GameID",
                table: "Developers");

            migrationBuilder.DropIndex(
                name: "IX_Developers_GameID",
                table: "Developers");

            migrationBuilder.DropColumn(
                name: "GameID",
                table: "Developers");

            migrationBuilder.CreateTable(
                name: "DeveloperGame",
                columns: table => new
                {
                    DevelopersId = table.Column<int>(type: "int", nullable: false),
                    GamesGameID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeveloperGame", x => new { x.DevelopersId, x.GamesGameID });
                    table.ForeignKey(
                        name: "FK_DeveloperGame_Developers_DevelopersId",
                        column: x => x.DevelopersId,
                        principalTable: "Developers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeveloperGame_Games_GamesGameID",
                        column: x => x.GamesGameID,
                        principalTable: "Games",
                        principalColumn: "GameID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeveloperGame_GamesGameID",
                table: "DeveloperGame",
                column: "GamesGameID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeveloperGame");

            migrationBuilder.AddColumn<int>(
                name: "GameID",
                table: "Developers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Developers_GameID",
                table: "Developers",
                column: "GameID");

            migrationBuilder.AddForeignKey(
                name: "FK_Developers_Games_GameID",
                table: "Developers",
                column: "GameID",
                principalTable: "Games",
                principalColumn: "GameID");
        }
    }
}
