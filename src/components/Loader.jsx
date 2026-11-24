/**
 * Spinner affiché pendant le chargement des données.
 * On utilise le spinner de Bootstrap.
 *
 * @param {{ message?: string }} props
 */
function Loader({ message = 'Chargement...' }) {
  return (
    <div className="loader" role="status">
      <div className="spinner-border text-danger"></div>
      <p className="loader-text">{message}</p>
    </div>
  )
}

export default Loader
