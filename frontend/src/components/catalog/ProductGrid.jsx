import ProductCard from './ProductCard.jsx'

const ProductGrid = ({ products, onOpenEdit, onOpenDelete }) => (
  <section className="cards-grid">
    {products.map((produto, index) => (
      <ProductCard
        key={produto.id}
        produto={produto}
        index={index}
        onOpenEdit={() => onOpenEdit(produto)}
        onOpenDelete={() => onOpenDelete(produto)}
      />
    ))}
  </section>
)

export default ProductGrid
