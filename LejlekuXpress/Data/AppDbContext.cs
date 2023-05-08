using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;

namespace LejlekuXpress.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) :base(options)
        {
            
        }

        public DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            var configuration = builder.Build();
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
