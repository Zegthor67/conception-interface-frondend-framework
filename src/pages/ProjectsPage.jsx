import ProjectsSection from '../components/ProjectsSection'

function ProjectsPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>Nos réalisations</h1>
          <p>Tous les projets que nous avons réalisés pour nos clients.</p>
        </div>
      </div>
      <ProjectsSection />
    </>
  )
}

export default ProjectsPage
