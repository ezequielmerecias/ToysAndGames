using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddInitData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO products VALUES('Barbie Developer', 'Es un juguete bien chido', 12, 'Mattel', 25.99)");
            migrationBuilder.Sql("INSERT INTO products VALUES('xyc', null, 4, 'Marvel', 75.50)");
            migrationBuilder.Sql("INSERT INTO products VALUES('abc', 'Juguete de apendizaje', 18, 'Nintendo', 99.99 )");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
