using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LejlekuXpress.Migrations
{
    /// <inheritdoc />
    public partial class addeduserIdtoshipping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ShippingAddress",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ShippingAddress_UserId",
                table: "ShippingAddress",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShippingAddress_User_UserId",
                table: "ShippingAddress",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShippingAddress_User_UserId",
                table: "ShippingAddress");

            migrationBuilder.DropIndex(
                name: "IX_ShippingAddress_UserId",
                table: "ShippingAddress");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ShippingAddress");
        }
    }
}
