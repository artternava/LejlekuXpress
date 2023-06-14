using LejlekuXpress.Models;
using Microsoft.EntityFrameworkCore;

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

        public DbSet<Payment> Payment { get; set; }

        public DbSet<Product> Product { get; set; }

        public DbSet<Category> Category { get; set; }

        public DbSet<Wishlist> Wishlist { get; set; }

        public DbSet<Cart> Cart { get; set; }

        public DbSet<CheckOut> CheckOut { get; set; }

        public DbSet<Orders> Orders { get; set; }

        public DbSet<Shabllon> Shabllon { get; set; }
    }
}
