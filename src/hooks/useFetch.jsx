import { useEffect, useState } from 'react'

/**
 * Hook qui charge des données JSON depuis une URL.
 * On l'utilise pour les deux API (projets et formations) pour ne pas
 * réécrire le même fetch + try/catch dans chaque composant.
 *
 * @param {string} url - adresse de l'API à appeler
 * @returns {{ data: object|null, isLoading: boolean, error: string|null }}
 */
function useFetch(url) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Permet d'annuler la requête si le composant est démonté avant la réponse
    const controller = new AbortController()

    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Erreur ${response.status} lors du chargement`)
        }

        const json = await response.json()
        setData(json)
      } catch (err) {
        // Une requête annulée n'est pas une vraie erreur, on l'ignore
        if (err.name !== 'AbortError') {
          setError(err.message || 'Impossible de charger les données')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url])

  return { data, isLoading, error }
}

export default useFetch
