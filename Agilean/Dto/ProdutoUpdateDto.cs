using System.ComponentModel.DataAnnotations;

namespace Agilean.Dto;

public class ProdutoUpdateDto
{
    [Required, MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Descricao { get; set; }

    [Required, Range(0.01, double.MaxValue)]
    public decimal Preco { get; set; }

    [Required, Range(0, int.MaxValue)]
    public int Estoque { get; set; }

    [Required, MaxLength(80)]
    public string Categoria { get; set; } = string.Empty;

    [MaxLength(2048)]
    public string? ImagemUrl { get; set; }

    public bool Ativo { get; set; } = true;
}
