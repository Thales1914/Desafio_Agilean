using Agilean.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers (precisa disso para mapear ProdutosController)
builder.Services.AddControllers();

// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// EF Core + SQLite (pega a connection string do appsettings.json)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS (libera o frontend local)
// Se seu React for Vite: http://localhost:5173
const string CorsPolicy = "Frontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
    );
});

var app = builder.Build();

// Swagger só em Development (padrão "bonito" de projeto)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

// Aplica a policy do CORS
app.UseCors(CorsPolicy);

// Mapeia os controllers (sem isso, /api/produtos não aparece)
app.MapControllers();

app.Run();
