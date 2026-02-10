using System.ComponentModel.DataAnnotations;

namespace Agilean.Domain
{
    public class Produto
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Descricao { get; set; }

        [Required, Range(0.01, double.MaxValue)]
        public decimal Preco { get; set; }

        [Required, Range(0, int.MaxValue)]
        public int Estoque { get; set; }

        [Required, MaxLength(50)]
        public string Categoria { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? ImagemUrl { get; set; }
        
        public bool Ativo { get; set; } = true;

        public DateTime DataCadastro { get; set; } = DateTime.UtcNow;
    }
}
