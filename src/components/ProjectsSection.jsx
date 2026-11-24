import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useSearch from '../hooks/useSearch'
import { API_URLS } from '../config/constants'
import SearchBar from './SearchBar'
import FilterBar from './FilterBar'
import ResultsGrid from './ResultsGrid'
import ProjectCard from './ProjectCard'
import ProjectDetails from './ProjectDetails'
import Modal from './Modal'

const SEARCH_FIELDS = ['title', 'client', 'description']

/**
 * @param {{ limit?: number }} props - nombre max de projets affichés (tous si absent)
 */
function ProjectsSection({ limit }) {
  const { data, isLoading, error } = useFetch(API_URLS.projects)
  const { query, setQuery, filters, updateFilter, resetFilters, results } = useSearch(
    data?.projects,
    SEARCH_FIELDS
  )
  const [selectedProject, setSelectedProject] = useState(null)

  const visibleProjects = limit ? results.slice(0, limit) : results

  return (
    <section className="items-section">
      <div className="container">
        <div className="section-header">
          <h2>Nos projets</h2>
          {limit && <Link to="/projets">Voir tous les projets</Link>}
        </div>

        <div className="section-toolbar">
          <SearchBar value={query} onChange={setQuery} placeholder="Rechercher un projet..." />
          <FilterBar
            categories={data?.categories}
            technologies={data?.technologies}
            values={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />
        </div>

        <ResultsGrid
          isLoading={isLoading}
          error={error}
          items={visibleProjects}
          totalCount={results.length}
          itemLabel="projet"
          emptyMessage="Aucun projet ne correspond à votre recherche."
          renderItem={(project) => (
            <ProjectCard project={project} onShowDetails={setSelectedProject} />
          )}
        />
      </div>

      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && <ProjectDetails project={selectedProject} />}
      </Modal>
    </section>
  )
}

export default ProjectsSection