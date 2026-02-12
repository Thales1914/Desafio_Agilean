# Desafio Agilean - Catalogo de Produtos

Aplicacao full stack para catalogo de produtos, com backend em .NET e frontend em React.

**Repositorio**
- `Agilean/`: backend (.NET + EF Core + SQLite)
- `frontend/`: frontend (React + Vite)

## Tecnologias e bibliotecas

**Backend**
- .NET 8 (API REST)
- Entity Framework Core 8 (Code First)
- SQLite (banco local)
- Swashbuckle (Swagger/OpenAPI)

**Frontend**
- React 19
- Vite 7
- Fetch API (requisicoes HTTP)
- CSS puro (sem framework)

**Por que essas escolhas**
- .NET 8 + EF Core: atende o requisito do desafio e garante produtividade com validacoes e migrations.
- SQLite: simples para rodar localmente e facilita avaliacao.
- Swagger: documentacao e teste rapido dos endpoints.
- React + Vite: setup leve, build rapido e bom DX.
- Fetch API: nativo do navegador, sem dependencia extra.
- CSS puro: maior controle sobre o layout proposto no guia visual.

## Como executar

### Backend
1. `cd Agilean`
2. `dotnet restore`
3. `dotnet run`

O terminal exibira a URL (ex.: `http://localhost:5241`).

**Banco de dados**
- O arquivo SQLite fica em `Agilean/agilean.db`.
- Se o caminho do banco nao existir na sua maquina, ajuste em `Agilean/appsettings.json`.

### Frontend
1. `cd frontend`
2. `npm install`
3. Copie `.env.example` para `.env` e ajuste a API.
4. Defina `VITE_API_URL=http://localhost:5241` no `.env`.
5. `npm run dev`

## Funcionalidades implementadas

**Backend**
- CRUD completo de produtos.
- Filtros por nome, categoria, disponibilidade e ativo.
- Ordenacao por nome, preco, estoque e data de cadastro.
- Validacoes com Data Annotations.
- Endpoint de categorias.

**Frontend**
- Listagem em cards responsivos.
- Busca por nome, filtro por categoria e disponibilidade.
- Ordenacao por nome, preco, estoque e mais recentes.
- Cadastro, edicao e exclusao com modais.
- Validacoes de formulario e mensagens de erro.
- Preview de imagem por URL.
- Indicadores visuais de estoque baixo, sem estoque e produto inativo.

## Decisoes Tecnicas
- Separei o frontend em `views` e `components` para manter a tela principal enxuta.
- Centralizei regras de UI e consumo da API no `useCatalogController` para evitar logica espalhada.
- Criei funcoes de formato e status de estoque em `productModel` para reutilizacao.
- Usei DTOs no backend para isolar o dominio e garantir contratos claros na API.
- Optei por SQLite para rodar sem setup complexo.

## Principais desafios
- Alinhar os filtros e ordenacoes do frontend com a API.
- Garantir validacoes consistentes entre frontend e backend.
- Manter a UI fiel ao guia visual, sem framework de CSS.

## O que eu faria diferente com mais tempo
- Criar testes automatizados (backend e frontend).
- Implementar paginacao e dashboard (opcional do desafio).
- Melhorar acessibilidade dos modais (foco, ESC, ARIA completos).
- Configurar variaveis de ambiente por perfil e CI/CD.

## Estrutura de pastas
- `Agilean/`: API .NET
- `frontend/`: UI React

## Endpoints principais
- `GET /api/produtos`
- `GET /api/produtos/{id}`
- `POST /api/produtos`
- `PUT /api/produtos/{id}`
- `DELETE /api/produtos/{id}`
- `GET /api/produtos/categorias`
