using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ReconBank.FrontUser.Db.Migrations
{
    public partial class t_Operations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Operations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    OriginId = table.Column<Guid>(type: "TEXT", nullable: false),
                    DestinationId = table.Column<Guid>(type: "TEXT", nullable: true),
                    OwnTitularity = table.Column<bool>(type: "INTEGER", nullable: false),
                    AmountInCents = table.Column<int>(type: "INTEGER", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Operations_Users_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Operations_Users_OriginId",
                        column: x => x.OriginId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Operations_DestinationId",
                table: "Operations",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_OriginId",
                table: "Operations",
                column: "OriginId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Operations");
        }
    }
}
