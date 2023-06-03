using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LejlekuXpress.Migrations
{
    /// <inheritdoc />
    public partial class addedIsReviewedColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsReviewed",
                table: "Product",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsReviewed",
                table: "Product");
        }
    }
}
