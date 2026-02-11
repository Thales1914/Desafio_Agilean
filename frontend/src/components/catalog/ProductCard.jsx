import { formatPrice, getStockInfo, productGradients } from '../../models/productModel.jsx'

const ProductCard = ({ produto, index, onOpenEdit, onOpenDelete }) => {
  const stock = getStockInfo(produto)

  return (
    <article className={`product-card ${!produto.ativo ? 'is-inactive' : ''}`}>
      <div
        className="product-image"
        style={{ background: productGradients[index % productGradients.length] }}
      >
        {produto.imagemUrl && (
          <img
            src={produto.imagemUrl}
            alt={produto.nome}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        )}
      </div>
      <div className="product-body">
        <h3 className="product-name">{produto.nome}</h3>
        <p className="product-price">{formatPrice(produto.preco)}</p>
        <div className="product-meta">
          <span className="badge badge-soft">{produto.categoria}</span>
          <span className={stock.className}>
            <span className="badge-icon">{stock.icon}</span>
            {stock.label}
          </span>
        </div>
        <div className="card-actions">
          <button className="btn btn-secondary" type="button" onClick={onOpenEdit}>
            Editar
          </button>
          <button className="btn btn-danger" type="button" onClick={onOpenDelete}>
            Excluir
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
