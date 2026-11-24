import Hero from '../components/Hero'
import ProjectsSection from '../components/ProjectsSection'
import CoursesSection from '../components/CoursesSection'
import { HOME_ITEMS_LIMIT } from '../config/constants'

function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection limit={HOME_ITEMS_LIMIT} />
      <CoursesSection limit={HOME_ITEMS_LIMIT} />
    </>
  )
}

export default Home
