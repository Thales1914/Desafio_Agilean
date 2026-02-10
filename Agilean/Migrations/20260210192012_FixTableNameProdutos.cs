using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Agilean.Migrations
{
    /// <inheritdoc />
    public partial class FixTableNameProdutos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Produtcs",
                table: "Produtcs");

            migrationBuilder.RenameTable(
                name: "Produtcs",
                newName: "Produtos");

            migrationBuilder.RenameColumn(
                name: "imagemUrl",
                table: "Produtos",
                newName: "ImagemUrl");

            migrationBuilder.AlterColumn<string>(
                name: "Descricao",
                table: "Produtos",
                type: "TEXT",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 500);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Produtos",
                table: "Produtos",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Produtos",
                table: "Produtos");

            migrationBuilder.RenameTable(
                name: "Produtos",
                newName: "Produtcs");

            migrationBuilder.RenameColumn(
                name: "ImagemUrl",
                table: "Produtcs",
                newName: "imagemUrl");

            migrationBuilder.AlterColumn<string>(
                name: "Descricao",
                table: "Produtcs",
                type: "TEXT",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Produtcs",
                table: "Produtcs",
                column: "Id");
        }
    }
}
