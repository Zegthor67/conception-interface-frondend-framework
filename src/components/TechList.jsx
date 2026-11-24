/**
 * Liste de badges pour afficher des technologies.
 * Utilisée dans les cartes et dans les détails (projets et formations).
 *
 * @param {{ technologies?: string[] }} props
 */
function TechList({ technologies = [] }) {
  return (
    <ul className="tech-list">
      {technologies.map((tech) => (
        <li key={tech} className="tech-badge">
          {tech}
        </li>
      ))}
    </ul>
  )
}

export default TechList
