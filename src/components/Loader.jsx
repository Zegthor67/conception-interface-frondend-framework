/**
 * @param {{ message?: string }} props
 */
function Loader({ message = 'Chargement...' }) {
  return (
    <div className="loader" role="status">
      <div className="spinner-border loader-spinner"></div>
      <p className="loader-text">{message}</p>
    </div>
  )
}

export default Loader
