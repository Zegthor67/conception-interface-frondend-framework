import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { API_URLS } from '../config/constants'
import Loader from '../components/Loader'
import InscriptionForm from '../components/InscriptionForm'

function InscriptionPage() {
  const { courseId } = useParams()
  const { data, isLoading, error } = useFetch(API_URLS.courses)

  const availableCourses = data ? data.courses.filter((course) => course.available) : []

  // On ne présélectionne la formation de l'URL que si elle existe et qu'il reste de la place
  const isValidCourse = availableCourses.some((course) => String(course.id) === courseId)
  const initialCourseId = isValidCourse ? courseId : ''

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>Inscription à une formation</h1>
          <p>Remplissez le formulaire, on revient vers vous sous 48h.</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="inscription-box">
          {isLoading && <Loader message="Chargement des formations..." />}

          {error && (
            <div className="alert alert-danger">
              Impossible de charger la liste des formations ({error}).
            </div>
          )}

          {data && (
            <InscriptionForm
              key={initialCourseId}
              courses={availableCourses}
              initialCourseId={initialCourseId}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default InscriptionPage
