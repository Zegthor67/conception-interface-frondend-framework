import TechList from './TechList'

/**
 * @param {{
 *   course: { title: string, category: string, level: string, duration: string,
 *     price: number, rating: number, image: string, technologies: string[],
 *     available: boolean },
 *   onShowDetails: (course: object) => void
 * }} props
 */
function CourseCard({ course, onShowDetails }) {
  return (
    <article className="card item-card">
      <img src={course.image} alt={course.title} className="card-img-top item-card-img" />

      <div className="card-body item-card-body">
        <span className="item-category">{course.category}</span>
        {!course.available && <span className="badge bg-secondary ms-2">Complet</span>}
        <h3 className="item-title">{course.title}</h3>
        <p className="item-info">
          {course.level} - {course.duration} - ⭐ {course.rating}
        </p>
        <TechList technologies={course.technologies} />
      </div>

      <div className="card-footer item-card-footer">
        <span className="item-price">{course.price} €</span>
        <button type="button" className="btn btn-main" onClick={() => onShowDetails(course)}>
          Voir la formation
        </button>
      </div>
    </article>
  )
}

export default CourseCard
