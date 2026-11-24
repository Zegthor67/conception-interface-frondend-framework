import Loader from './Loader'

/**
 * Gère le chargement, l'erreur, la liste vide puis la grille de cartes.
 *
 * @param {{
 *   isLoading: boolean,
 *   error: string|null,
 *   items: object[],
 *   renderItem: (item: object) => React.ReactNode,
 *   emptyMessage?: string
 * }} props
 */
function ResultsGrid({ isLoading, error, items, renderItem, emptyMessage = 'Aucun résultat.' }) {
  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Impossible de charger les données ({error}). Réessayez plus tard.
      </div>
    )
  }

  if (items.length === 0) {
    return <p className="empty-message">{emptyMessage}</p>
  }

  return (
    <div className="row g-4">
      {items.map((item) => (
        <div className="col-12 col-md-6 col-lg-4" key={item.id}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

export default ResultsGrid
