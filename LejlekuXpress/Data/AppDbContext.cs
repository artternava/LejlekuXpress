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

        public DbSet<BillingInformation> BillingInformation { get; set; }

        public DbSet<Product> Product { get; set; }
        public DbSet<ProductOption> ProductOption { get; set; }
        public DbSet<ProductSpecification> ProductSpecification { get; set; }
        public DbSet<ProductImage> ProductImage { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");

            base.OnModelCreating(modelBuilder);
        }
    }
}
