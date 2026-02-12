import CatalogDashboard from '../components/catalog/CatalogDashboard.jsx'
import CatalogFilters from '../components/catalog/CatalogFilters.jsx'
import CatalogPagination from '../components/catalog/CatalogPagination.jsx'
import DeleteConfirmModal from '../components/catalog/DeleteConfirmModal.jsx'
import ProductFormModal from '../components/catalog/ProductFormModal.jsx'
import ProductGrid from '../components/catalog/ProductGrid.jsx'

const CatalogView = ({
  products,
  paginatedProducts,
  categories,
  search,
  category,
  availability,
  sort,
  sortOptions,
  availabilityOptions,
  dashboard,
  pagination,
  isLoading,
  error,
  isFormOpen,
  editingProduct,
  formData,
  formErrors,
  formStatus,
  isSaving,
  deleteTarget,
  deleteStatus,
  isDeleting,
  onSearchChange,
  onCategoryChange,
  onAvailabilityChange,
  onSortChange,
  onOpenCreate,
  onOpenEdit,
  onOpenDelete,
  onCloseForm,
  onFormChange,
  onSubmitForm,
  onCloseDelete,
  onConfirmDelete,
  onPageChange,
  onPageSizeChange,
}) => {
  const isEditing = Boolean(editingProduct)

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Catalogo</p>
          <h1>Catalogo de Produtos</h1>
          <p className="subtitle">
            Gerencie produtos, estoque e disponibilidade de forma simples.
          </p>
        </div>
        <button className="btn btn-primary" type="button" onClick={onOpenCreate}>
          + Novo Produto
        </button>
      </header>

      <CatalogFilters
        search={search}
        category={category}
        categories={categories}
        availability={availability}
        availabilityOptions={availabilityOptions}
        sort={sort}
        sortOptions={sortOptions}
        onSearchChange={onSearchChange}
        onCategoryChange={onCategoryChange}
        onAvailabilityChange={onAvailabilityChange}
        onSortChange={onSortChange}
      />

      {!isLoading && products.length > 0 && <CatalogDashboard summary={dashboard} />}

      {error && <div className="status status-error">{error}</div>}
      {isLoading && <div className="status">Carregando produtos...</div>}
      {!isLoading && !error && products.length === 0 && (
        <div className="status">Nenhum produto encontrado.</div>
      )}

      <ProductGrid
        products={paginatedProducts}
        onOpenEdit={onOpenEdit}
        onOpenDelete={onOpenDelete}
      />

      {!isLoading && !error && (
        <CatalogPagination
          {...pagination}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}

      <ProductFormModal
        isOpen={isFormOpen}
        isEditing={isEditing}
        categories={categories}
        formData={formData}
        formErrors={formErrors}
        formStatus={formStatus}
        isSaving={isSaving}
        onClose={onCloseForm}
        onFormChange={onFormChange}
        onSubmit={onSubmitForm}
      />

      <DeleteConfirmModal
        deleteTarget={deleteTarget}
        deleteStatus={deleteStatus}
        isDeleting={isDeleting}
        onClose={onCloseDelete}
        onConfirm={onConfirmDelete}
      />
    </div>
  )
}

export default CatalogView
