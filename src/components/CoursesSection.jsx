import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useSearch from '../hooks/useSearch'
import { API_URLS } from '../config/constants'
import SearchBar from './SearchBar'
import FilterBar from './FilterBar'
import ResultsGrid from './ResultsGrid'
import CourseCard from './CourseCard'
import CourseDetails from './CourseDetails'
import Modal from './Modal'

const SEARCH_FIELDS = ['title', 'instructor', 'description']

/**
 * @param {{ limit?: number }} props - nombre max de formations affichées (toutes si absent)
 */
function CoursesSection({ limit }) {
  const { data, isLoading, error } = useFetch(API_URLS.courses)
  const { query, setQuery, filters, updateFilter, resetFilters, results } = useSearch(
    data?.courses,
    SEARCH_FIELDS
  )
  const [selectedCourse, setSelectedCourse] = useState(null)

  const visibleCourses = limit ? results.slice(0, limit) : results

  return (
    <section className="items-section items-section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Nos formations</h2>
          {limit && <Link to="/formations">Voir toutes les formations</Link>}
        </div>

        <div className="section-toolbar">
          <SearchBar value={query} onChange={setQuery} placeholder="Rechercher une formation..." />
          <FilterBar
            categories={data?.categories}
            levels={data?.levels}
            technologies={data?.technologies}
            values={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />
        </div>

        <ResultsGrid
          isLoading={isLoading}
          error={error}
          items={visibleCourses}
          totalCount={results.length}
          itemLabel="formation"
          emptyMessage="Aucune formation ne correspond à votre recherche."
          renderItem={(course) => (
            <CourseCard course={course} onShowDetails={setSelectedCourse} />
          )}
        />
      </div>

      <Modal
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.title}
      >
        {selectedCourse && <CourseDetails course={selectedCourse} />}
      </Modal>
    </section>
  )
}

export default CoursesSection
