import { useEffect } from 'react'

/**
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   title: string,
 *   children: React.ReactNode
 * }} props
 */
function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    // On bloque le scroll de la page derrière la modal
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation pour que le clic dans la boîte ne ferme pas la modal */}
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header-custom">
          <h2>{title}</h2>
          <button type="button" className="btn-close" aria-label="Fermer" onClick={onClose}></button>
        </div>
        <div className="modal-body-custom">{children}</div>
      </div>
    </div>
  )
}

export default Modal