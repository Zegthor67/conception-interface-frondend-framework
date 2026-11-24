// Adresses des deux API du portail (les mêmes que pour le E1)
const API_BASE_URL = 'https://webcraft-api.vercel.app/data'

export const API_URLS = {
  projects: `${API_BASE_URL}/projects.json`,
  courses: `${API_BASE_URL}/courses.json`,
}

// Liens affichés dans le header
export const NAV_LINKS = [
  { path: '/', label: 'Accueil' },
  { path: '/projets', label: 'Projets' },
  { path: '/formations', label: 'Formations' },
  { path: '/inscription', label: 'Inscription' },
]

// Nombre de cartes affichées par section sur la page d'accueil
export const HOME_ITEMS_LIMIT = 6
