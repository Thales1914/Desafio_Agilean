using Agilean.Data;
using Agilean.Domain;
using Agilean.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Agilean.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProdutosController(AppDbContext db) => _db = db;

    //GET: Listagem (filtros + ordenação)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProdutoResponseDto>>> GetAll(
        [FromQuery] string? nome,
        [FromQuery] string? categoria,
        [FromQuery] bool? ativo,
        [FromQuery] bool? disponivel,
        [FromQuery] string? sort
    )
    {
        IQueryable<Produto> query = _db.Produtos.AsNoTracking();

        // Montagem dinâmica da query onde aplica filtros e ordenação conforme parâmetros recebidos
        query = ApplyFilters(query, nome, categoria, ativo, disponivel);
        query = ApplySorting(query, sort);

        var itens = await query.Select(ToDtoExpression()).ToListAsync();
        return Ok(itens);
    }

    //GET: Por Id
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProdutoResponseDto>> GetById(int id)
    {
        var produto = await _db.Produtos.AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);

        return produto is null ? NotFound() : Ok(ToDto(produto));
    }

    //POST: Criar
    [HttpPost]
    public async Task<ActionResult<ProdutoResponseDto>> Create([FromBody] ProdutoCreateDto dto)
    {
        var produto = new Produto
        {
            Nome = dto.Nome.Trim(),
            Descricao = dto.Descricao?.Trim(),
            Preco = dto.Preco,
            Estoque = dto.Estoque,
            Categoria = dto.Categoria.Trim(),
            ImagemUrl = dto.ImagemUrl?.Trim(),
            Ativo = dto.Ativo,
            DataCadastro = DateTime.UtcNow
        };

        _db.Produtos.Add(produto);
        await _db.SaveChangesAsync();

        // Retorna 201 Created + header Location apontando para o GET por Id
        return CreatedAtAction(nameof(GetById), new { id = produto.Id }, ToDto(produto));
    }

    //PUT: Atualizar
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] ProdutoUpdateDto dto)
    {
        var produto = await _db.Produtos.FirstOrDefaultAsync(p => p.Id == id);
        if (produto is null) return NotFound();

        produto.Nome = dto.Nome.Trim();
        produto.Descricao = dto.Descricao?.Trim();
        produto.Preco = dto.Preco;
        produto.Estoque = dto.Estoque;
        produto.Categoria = dto.Categoria.Trim();
        produto.ImagemUrl = dto.ImagemUrl?.Trim();
        produto.Ativo = dto.Ativo;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    //DELETE: Remover
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var produto = await _db.Produtos.FirstOrDefaultAsync(p => p.Id == id);
        if (produto is null) return NotFound();

        _db.Produtos.Remove(produto);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // GET: Categorias
    [HttpGet("categorias")]
    public async Task<ActionResult<IEnumerable<string>>> GetCategorias()
    {
        var categorias = await _db.Produtos.AsNoTracking()
            .Select(p => p.Categoria)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();

        return Ok(categorias);
    }

    // (filtros, ordenação, mapeamento) 

    private static IQueryable<Produto> ApplyFilters(
        IQueryable<Produto> query,
        string? nome,
        string? categoria,
        bool? ativo,
        bool? disponivel)
    {
        if (!string.IsNullOrWhiteSpace(nome))
        {
            var n = nome.Trim().ToLower();
            query = query.Where(p => p.Nome.ToLower().Contains(n));
        }

        if (!string.IsNullOrWhiteSpace(categoria))
        {
            var c = categoria.Trim().ToLower();
            query = query.Where(p => p.Categoria.ToLower() == c);
        }

        if (ativo is not null)
            query = query.Where(p => p.Ativo == ativo.Value);

        if (disponivel is not null)
            query = disponivel.Value
                ? query.Where(p => p.Estoque > 0)
                : query.Where(p => p.Estoque == 0);

        return query;
    }

    private static IQueryable<Produto> ApplySorting(IQueryable<Produto> query, string? sort) =>
        sort switch
        {
            "nome" => query.OrderBy(p => p.Nome),
            "-nome" => query.OrderByDescending(p => p.Nome),
            "preco" => query.OrderBy(p => p.Preco),
            "-preco" => query.OrderByDescending(p => p.Preco),
            "estoque" => query.OrderBy(p => p.Estoque),
            "-estoque" => query.OrderByDescending(p => p.Estoque),
            "datacadastro" => query.OrderBy(p => p.DataCadastro),
            "-datacadastro" => query.OrderByDescending(p => p.DataCadastro),
            _ => query.OrderByDescending(p => p.DataCadastro)
        };

    private static ProdutoResponseDto ToDto(Produto p) => new()
    {
        Id = p.Id,
        Nome = p.Nome,
        Descricao = p.Descricao,
        Preco = p.Preco,
        Estoque = p.Estoque,
        Categoria = p.Categoria,
        ImagemUrl = p.ImagemUrl,
        Ativo = p.Ativo,
        DataCadastro = p.DataCadastro
    };

    private static Expression<Func<Produto, ProdutoResponseDto>> ToDtoExpression() =>
        p => new ProdutoResponseDto
        {
            Id = p.Id,
            Nome = p.Nome,
            Descricao = p.Descricao,
            Preco = p.Preco,
            Estoque = p.Estoque,
            Categoria = p.Categoria,
            ImagemUrl = p.ImagemUrl,
            Ativo = p.Ativo,
            DataCadastro = p.DataCadastro
        };
}
