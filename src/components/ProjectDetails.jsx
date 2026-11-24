import TechList from './TechList'

/**
 * @param {{ project: object }} props
 */
function ProjectDetails({ project }) {
  return (
    <div className="item-details">
      <img src={project.image} alt={project.title} className="item-details-img" />

      <p>{project.description}</p>

      <ul className="details-infos">
        <li><strong>Client :</strong> {project.client}</li>
        <li><strong>Catégorie :</strong> {project.category}</li>
        <li><strong>Année :</strong> {project.year}</li>
        <li><strong>Durée :</strong> {project.duration}</li>
      </ul>

      <h3>Fonctionnalités</h3>
      <ul>
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <h3>Technologies</h3>
      <TechList technologies={project.technologies} />

      <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-danger mt-3">
        Voir le site
      </a>
    </div>
  )
}

export default ProjectDetails
