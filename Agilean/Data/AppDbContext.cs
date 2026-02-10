using Agilean.Domain;
using Microsoft.EntityFrameworkCore;

namespace Agilean.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Produto> Produtcs => Set<Produto>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produto>(entity =>
            {
                entity.Property(p => p.Preco).HasColumnType("decimal(18,2)");
                entity.Property(p => p.DataCadastro).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
        }
    }
}
