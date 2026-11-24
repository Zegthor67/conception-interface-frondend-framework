# Portail WebCraft Solutions - version React

Évaluation E2 (groupe 2) : reprise du portail fait au E1, mais cette fois avec React.
Le site affiche les projets de l'agence et les formations, à partir des deux API données dans le sujet, et propose un formulaire d'inscription.

## Lancer le projet

Il faut Node.js installé.

```
npm install
npm run dev
```

Puis ouvrir l'adresse affichée dans le terminal (en général http://localhost:5173).

Pour faire la version de prod : `npm run build`.

## Technos utilisées

- React 18
- React Router 6
- Vite pour lancer et builder le projet
- Bootstrap 5 (juste le CSS, pas de librairie de composants) + mon fichier App.css

## Les pages

| Route | Page |
| --- | --- |
| `/` | Accueil : hero, 6 projets et 6 formations avec recherche et filtres |
| `/projets` | Tous les projets |
| `/formations` | Toutes les formations |
| `/inscription` | Formulaire d'inscription |
| `/inscription/:courseId` | Même formulaire mais la formation est déjà choisie (on y arrive depuis la modal d'une formation) |
| autre chose | Page 404 |

## Organisation du dossier src

```
src/
├── App.jsx              routes + header/footer autour
├── App.css              tout le style du site
├── main.jsx
├── config/
│   └── constants.js     URLs des API, liens du menu, nombre de cartes sur l'accueil
├── hooks/
│   ├── useFetch.jsx     chargement d'une API (data, isLoading, error)
│   └── useSearch.jsx    recherche texte + filtres sur une liste
├── utils/
│   └── validation.js    fonctions de validation du formulaire
├── pages/
│   ├── Home.jsx
│   ├── ProjectsPage.jsx
│   ├── CoursesPage.jsx
│   ├── InscriptionPage.jsx
│   └── NotFound.jsx
└── components/
    ├── Header.jsx, Footer.jsx, Hero.jsx, Loader.jsx
    ├── SearchBar.jsx, FilterBar.jsx, Modal.jsx
    ├── ProjectCard.jsx, CourseCard.jsx, TechList.jsx
    ├── ProjectDetails.jsx, CourseDetails.jsx
    ├── ProjectsSection.jsx, CoursesSection.jsx, ResultsGrid.jsx
    └── InscriptionForm.jsx, FormField.jsx, InscriptionSuccess.jsx
```

J'ai ajouté quelques composants en plus de ceux demandés dans le sujet, surtout pour ne pas avoir de code en double et garder des fichiers courts (moins de 150 lignes).

## Comment ça marche

**Les sections Projets et Formations**

`ProjectsSection` et `CoursesSection` chargent chacune leur API avec `useFetch`. Comme ça la page d'accueil n'a rien à passer en props, et je peux réutiliser la même section sur l'accueil (avec une limite de 6 cartes) et sur les pages `/projets` et `/formations` (sans limite).

Dans chaque section on retrouve les mêmes composants :
- `SearchBar` pour la recherche en temps réel
- `FilterBar` pour les filtres. Il affiche un select pour chaque liste qu'on lui donne : catégories + technologies pour les projets, et en plus les niveaux pour les formations
- `ResultsGrid` qui affiche soit le loader, soit l'erreur, soit "aucun résultat", soit la grille de cartes
- `Modal` pour voir le détail d'un projet ou d'une formation (le contenu est passé en children)

**Les hooks**

- `useFetch(url)` fait le fetch, gère le chargement et les erreurs (si l'API ne répond pas, un message s'affiche au lieu des cartes). La requête est annulée si on change de page avant la fin.
- `useSearch(items, searchFields)` garde le texte recherché et les filtres choisis, et renvoie la liste filtrée. Il sert pour les projets et pour les formations.

**Le formulaire d'inscription**

Les règles de validation sont dans `utils/validation.js` et pas dans le composant. Un champ est vérifié quand on le quitte, puis tout le formulaire à l'envoi. Il n'y a pas de back-end donc à l'envoi on affiche juste un message de confirmation.

Seules les formations disponibles (`available: true`) sont proposées dans la liste.

## Utilisation de l'IA

J'ai utilisé une IA (Claude) sur quelques passages où je bloquais ou que je ne savais pas faire proprement :

- `hooks/useFetch.jsx` : l'annulation de la requête avec `AbortController`. Sans ça, quand on changeait de page avant la fin du chargement, React essayait de mettre à jour un composant qui n'existait plus. L'IA m'a expliqué le principe et le fait d'ignorer l'erreur `AbortError`.
- `utils/validation.js` : les expressions régulières, surtout celle du téléphone qui accepte les formats `0612345678`, `06 12 34 56 78` et `+33...`. Je les ai testées ensuite avec plusieurs numéros.
- `components/FormField.jsx` : l'idée de la prop `as` pour qu'un seul composant affiche un input, un select ou un textarea. Je l'ai fait pour passer le formulaire sous les 150 lignes.

J'ai mis des commentaires dans le code sur ces trois passages pour expliquer ce que fait chaque partie.

## Nommage

- composants en PascalCase (`ProjectCard`, `SearchBar`)
- variables et fonctions en camelCase (`isLoading`, `handleSubmit`)
- constantes en majuscules (`API_URLS`, `NAV_LINKS`)
- indentation à 2 espaces
