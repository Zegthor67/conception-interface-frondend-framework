/**
 * Spinner affiché pendant le chargement des données.
 *
 * @param {{ message?: string }} props
 */
function Loader({ message = 'Chargement...' }) {
  return (
    <div className="loader" role="status">
      <div className="loader-spinner"></div>
      <p className="loader-text">{message}</p>
    </div>
  )
}

export default Loader
