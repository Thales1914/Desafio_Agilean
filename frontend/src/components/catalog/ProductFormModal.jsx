const ProductFormModal = ({
  isOpen,
  isEditing,
  categories,
  formData,
  formErrors,
  formStatus,
  isSaving,
  onClose,
  onFormChange,
  onSubmit,
}) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3>{isEditing ? 'Editar Produto' : 'Novo Produto'}</h3>
          <button className="icon-button" type="button" onClick={onClose}>
            x
          </button>
        </div>

        {formStatus && <div className="status status-error">{formStatus}</div>}

        <form
          className="form-grid"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <label className="form-field">
            Nome do Produto <span className="required">*</span>
            <input
              type="text"
              placeholder="Ex: Notebook Gamer"
              maxLength={100}
              value={formData.nome}
              onChange={(event) => onFormChange('nome', event.target.value)}
            />
            {formErrors.nome && <span className="form-error">{formErrors.nome}</span>}
          </label>

          <label className="form-field">
            Descricao
            <textarea
              rows="3"
              placeholder="Descreva o produto..."
              maxLength={500}
              value={formData.descricao}
              onChange={(event) => onFormChange('descricao', event.target.value)}
            />
            {formErrors.descricao && (
              <span className="form-error">{formErrors.descricao}</span>
            )}
          </label>

          <div className="form-row">
            <label className="form-field">
              Preco (R$) <span className="required">*</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                value={formData.preco}
                onChange={(event) => onFormChange('preco', event.target.value)}
              />
              {formErrors.preco && <span className="form-error">{formErrors.preco}</span>}
            </label>
            <label className="form-field">
              Estoque <span className="required">*</span>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={formData.estoque}
                onChange={(event) => onFormChange('estoque', event.target.value)}
              />
              {formErrors.estoque && (
                <span className="form-error">{formErrors.estoque}</span>
              )}
            </label>
          </div>

          <label className="form-field">
            Categoria <span className="required">*</span>
            <input
              type="text"
              list="category-options"
              placeholder="Selecione..."
              maxLength={80}
              value={formData.categoria}
              onChange={(event) => onFormChange('categoria', event.target.value)}
            />
            <datalist id="category-options">
              {categories.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
            {formErrors.categoria && (
              <span className="form-error">{formErrors.categoria}</span>
            )}
          </label>

          <label className="form-field">
            URL da Imagem
            <input
              type="text"
              placeholder="https://"
              value={formData.imagemUrl}
              onChange={(event) => onFormChange('imagemUrl', event.target.value)}
            />
            {formErrors.imagemUrl && (
              <span className="form-error">{formErrors.imagemUrl}</span>
            )}
          </label>

          {formData.imagemUrl && !formErrors.imagemUrl && (
            <div className="image-preview">
              <img
                src={formData.imagemUrl}
                alt="Preview"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}

          <label className="form-toggle">
            <input
              type="checkbox"
              checked={formData.ativo}
              onChange={(event) => onFormChange('ativo', event.target.checked)}
            />
            Produto ativo
          </label>

          <div className="form-actions">
            <button className="btn btn-ghost" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-success" type="submit" disabled={isSaving}>
              {isSaving
                ? 'Salvando...'
                : isEditing
                  ? 'Atualizar Produto'
                  : 'Salvar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductFormModal
