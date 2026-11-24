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
    // AbortController sert à annuler le fetch en cours.
    // Si on quitte la page avant la réponse, le composant est démonté et on ne doit
    // plus faire de setState dessus, sinon React affiche un warning.
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
        // Quand on annule, fetch lance une erreur "AbortError".
        // Ce n'est pas un vrai problème donc on ne l'affiche pas à l'utilisateur.
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

    // Fonction de nettoyage : React l'appelle quand le composant est démonté
    // ou quand l'url change, et c'est là qu'on annule la requête
    return () => controller.abort()
  }, [url])

  return { data, isLoading, error }
}

export default useFetch