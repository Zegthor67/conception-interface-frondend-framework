import { useMemo, useState } from 'react'

// Valeurs des filtres au départ (rien de sélectionné)
const INITIAL_FILTERS = {
  category: '',
  level: '',
  technology: '',
}

/**
 * Hook qui gère la recherche texte et les filtres d'une liste.
 * Il sert pour les projets et pour les formations, ce qui évite
 * d'écrire deux fois la même logique dans les sections.
 *
 * @param {object[]} items - la liste complète (projets ou formations)
 * @param {string[]} searchFields - les champs dans lesquels on cherche le texte
 * @returns {{
 *   query: string,
 *   setQuery: (value: string) => void,
 *   filters: { category: string, level: string, technology: string },
 *   updateFilter: (name: string, value: string) => void,
 *   resetFilters: () => void,
 *   results: object[]
 * }}
 */
function useSearch(items = [], searchFields = ['title']) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  const updateFilter = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const resetFilters = () => {
    setQuery('')
    setFilters(INITIAL_FILTERS)
  }

  // On recalcule la liste seulement si la recherche, les filtres ou les données changent
  const results = useMemo(() => {
    const search = query.trim().toLowerCase()

    return items.filter((item) => {
      // Le texte doit apparaître dans au moins un des champs choisis
      const matchesSearch =
        search === '' ||
        searchFields.some((field) =>
          String(item[field] || '').toLowerCase().includes(search)
        )

      const matchesCategory = !filters.category || item.category === filters.category
      const matchesLevel = !filters.level || item.level === filters.level
      // technologies est un tableau dans les deux API
      const matchesTechnology =
        !filters.technology || item.technologies?.includes(filters.technology)

      return matchesSearch && matchesCategory && matchesLevel && matchesTechnology
    })
  }, [items, query, filters, searchFields])

  return { query, setQuery, filters, updateFilter, resetFilters, results }
}

export default useSearch
