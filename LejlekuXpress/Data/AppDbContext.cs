using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LejlekuXpress.Data
{
    public class AppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration configuration) :base(options)
        {
            _configuration = configuration;
        }

        public DbSet<User> User { get; set; }

        public DbSet<Roles> Roles { get; set; }

        public DbSet<Country> Country { get; set; }

        public DbSet<ShippingAddress> ShippingAddress { get; set; }


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"))
        //        .LogTo(Console.WriteLine, LogLevel.Information);
        //}


    }
}
