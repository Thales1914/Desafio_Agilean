const DeleteConfirmModal = ({
  deleteTarget,
  deleteStatus,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  if (!deleteTarget) return null

  return (
    <div className="modal-overlay">
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3>Confirmar Exclusao</h3>
          <button className="icon-button" type="button" onClick={onClose}>
            x
          </button>
        </div>

        <p className="confirm-text">Tem certeza que deseja excluir "{deleteTarget.nome}"?</p>

        {deleteStatus && <div className="status status-error">{deleteStatus}</div>}

        <div className="form-actions">
          <button className="btn btn-ghost" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Excluir Produto'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
