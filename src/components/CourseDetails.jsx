import { Link } from 'react-router-dom'
import TechList from './TechList'

/**
 * @param {{ course: object }} props
 */
function CourseDetails({ course }) {
  return (
    <div className="item-details">
      <img src={course.image} alt={course.title} className="item-details-img" />

      <p>{course.description}</p>

      <ul className="details-infos">
        <li><strong>Formateur :</strong> {course.instructor}</li>
        <li><strong>Niveau :</strong> {course.level}</li>
        <li><strong>Durée :</strong> {course.duration}</li>
        <li><strong>Note :</strong> ⭐ {course.rating} ({course.students} élèves)</li>
        <li><strong>Prix :</strong> {course.price} €</li>
      </ul>

      <h3>Programme</h3>
      <ol>
        {course.modules.map((module) => (
          <li key={module}>{module}</li>
        ))}
      </ol>

      <h3>Technologies</h3>
      <TechList technologies={course.technologies} />

      {course.available ? (
        <Link to={`/inscription/${course.id}`} className="btn btn-main mt-3">
          S'inscrire à cette formation
        </Link>
      ) : (
        <p className="text-muted mt-3">Cette formation est complète pour le moment.</p>
      )}
    </div>
  )
}

export default CourseDetails
