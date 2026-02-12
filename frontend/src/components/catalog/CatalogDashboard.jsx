import { formatPrice } from '../../models/productModel.jsx'

const CatalogDashboard = ({ summary }) => {
  if (!summary) return null

  const cards = [
    {
      label: 'Produtos cadastrados',
      value: summary.total,
      meta: `${summary.active} ativos`,
    },
    {
      label: 'Valor total em estoque',
      value: formatPrice(summary.totalStockValue),
      meta: 'Soma de preco x estoque',
    },
    {
      label: 'Estoque baixo',
      value: summary.lowStock,
      meta: 'Abaixo de 10 unidades',
    },
    {
      label: 'Produto mais caro',
      value: summary.mostExpensive ? formatPrice(summary.mostExpensive.preco) : '—',
      meta: summary.mostExpensive?.nome ?? 'Sem produtos',
    },
    {
      label: 'Produto mais barato',
      value: summary.cheapest ? formatPrice(summary.cheapest.preco) : '—',
      meta: summary.cheapest?.nome ?? 'Sem produtos',
    },
  ]

  return (
    <section className="dashboard">
      {cards.map((card) => (
        <article key={card.label} className="dashboard-card">
          <p className="dashboard-label">{card.label}</p>
          <h3 className="dashboard-value">{card.value}</h3>
          <p className="dashboard-meta">{card.meta}</p>
        </article>
      ))}
    </section>
  )
}

export default CatalogDashboard
