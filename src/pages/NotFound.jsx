import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/" className="btn btn-main">
        Retour à l'accueil
      </Link>
    </div>
  )
}

export default NotFound
