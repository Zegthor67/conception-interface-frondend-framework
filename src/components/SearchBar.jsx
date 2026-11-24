/**
 * Champ de recherche réutilisable (projets et formations).
 * Le composant ne garde pas d'état : c'est le parent qui gère la valeur,
 * ce qui permet de filtrer la liste en temps réel à chaque frappe.
 *
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   placeholder?: string
 * }} props
 */
function SearchBar({ value, onChange, placeholder = 'Rechercher...' }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        className="form-control"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar
