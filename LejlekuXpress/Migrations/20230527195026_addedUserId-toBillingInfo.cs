using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LejlekuXpress.Migrations
{
    /// <inheritdoc />
    public partial class addedUserIdtoBillingInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "BillingInformation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BillingInformation_UserId",
                table: "BillingInformation",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BillingInformation_User_UserId",
                table: "BillingInformation",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BillingInformation_User_UserId",
                table: "BillingInformation");

            migrationBuilder.DropIndex(
                name: "IX_BillingInformation_UserId",
                table: "BillingInformation");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "BillingInformation");
        }
    }
}
