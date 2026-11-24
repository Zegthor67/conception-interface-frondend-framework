const FILTER_LABELS = {
  category: 'Toutes les catégories',
  level: 'Tous les niveaux',
  technology: 'Toutes les technologies',
}

/**
 * Affiche un select seulement pour les listes passées en props.
 *
 * @param {{
 *   categories?: string[],
 *   levels?: string[],
 *   technologies?: string[],
 *   values: { category?: string, level?: string, technology?: string },
 *   onFilterChange: (name: string, value: string) => void,
 *   onReset: () => void
 * }} props
 */
function FilterBar({ categories, levels, technologies, values, onFilterChange, onReset }) {
  const filters = [
    { name: 'category', options: categories },
    { name: 'level', options: levels },
    { name: 'technology', options: technologies },
  ].filter((filter) => Array.isArray(filter.options))

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <select
          key={filter.name}
          className="form-select"
          aria-label={FILTER_LABELS[filter.name]}
          value={values[filter.name] || ''}
          onChange={(event) => onFilterChange(filter.name, event.target.value)}
        >
          <option value="">{FILTER_LABELS[filter.name]}</option>
          {filter.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ))}

      <button type="button" className="btn btn-outline-secondary" onClick={onReset}>
        Réinitialiser
      </button>
    </div>
  )
}

export default FilterBar
