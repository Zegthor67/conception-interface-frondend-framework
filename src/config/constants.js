const API_BASE_URL = 'https://webcraft-api.vercel.app/data'

export const API_URLS = {
  projects: `${API_BASE_URL}/projects.json`,
  courses: `${API_BASE_URL}/courses.json`,
}

export const NAV_LINKS = [
  { path: '/', label: 'Accueil' },
  { path: '/projets', label: 'Projets' },
  { path: '/formations', label: 'Formations' },
  { path: '/inscription', label: 'Inscription' },
]

export const HOME_ITEMS_LIMIT = 6
