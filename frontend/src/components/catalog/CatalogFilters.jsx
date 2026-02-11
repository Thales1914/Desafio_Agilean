const CatalogFilters = ({
  search,
  category,
  categories,
  availability,
  availabilityOptions,
  sort,
  sortOptions,
  onSearchChange,
  onCategoryChange,
  onAvailabilityChange,
  onSortChange,
}) => (
  <section className="filters">
    <div className="field">
      <span className="field-icon">B</span>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
    <div className="field">
      <span className="field-icon">C</span>
      <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
        <option value="all">Todas as Categorias</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
    <div className="field">
      <span className="field-icon">D</span>
      <select
        value={availability}
        onChange={(event) => onAvailabilityChange(event.target.value)}
      >
        {availabilityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <div className="field">
      <span className="field-icon">O</span>
      <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </section>
)

export default CatalogFilters
