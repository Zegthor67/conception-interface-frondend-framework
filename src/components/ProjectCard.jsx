import TechList from './TechList'

/**
 * @param {{
 *   project: { title: string, client: string, category: string, year: number,
 *     image: string, description: string, technologies: string[] },
 *   onShowDetails: (project: object) => void
 * }} props
 */
function ProjectCard({ project, onShowDetails }) {
  return (
    <article className="card item-card">
      <img src={project.image} alt={project.title} className="card-img-top item-card-img" />

      <div className="card-body">
        <span className="item-category">{project.category}</span>
        <h3 className="item-title">{project.title}</h3>
        <p className="item-info">
          {project.client} - {project.year}
        </p>
        <p className="item-description">{project.description}</p>
        <TechList technologies={project.technologies} />
      </div>

      <div className="card-footer item-card-footer">
        <button type="button" className="btn btn-danger" onClick={() => onShowDetails(project)}>
          Voir le projet
        </button>
      </div>
    </article>
  )
}

export default ProjectCard
