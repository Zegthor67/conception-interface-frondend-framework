import CoursesSection from '../components/CoursesSection'

function CoursesPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>Nos formations</h1>
          <p>Choisissez la formation qui vous correspond et inscrivez-vous en ligne.</p>
        </div>
      </div>
      <CoursesSection />
    </>
  )
}

export default CoursesPage
