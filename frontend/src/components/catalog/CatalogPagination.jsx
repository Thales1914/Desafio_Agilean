const buildPages = (current, total) => {
  const maxButtons = 5
  const half = Math.floor(maxButtons / 2)
  let start = Math.max(1, current - half)
  let end = Math.min(total, start + maxButtons - 1)

  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

const CatalogPagination = ({
  page,
  totalPages,
  pageSize,
  pageSizeOptions,
  totalItems,
  rangeStart,
  rangeEnd,
  onPageChange,
  onPageSizeChange,
}) => {
  if (totalItems === 0) return null

  const pages = buildPages(page, totalPages)

  return (
    <section className="pagination">
      <div className="pagination-info">
        Mostrando {rangeStart}-{rangeEnd} de {totalItems}
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </button>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination-button ${pageNumber === page ? 'is-active' : ''}`}
            type="button"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="pagination-button"
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Proxima
        </button>
      </div>
      <label className="pagination-size">
        <span>Por pagina</span>
        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}

export default CatalogPagination
