import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-title">Bienvenue chez WebCraft Solutions</h1>
        <p className="hero-text">
          Agence web et centre de formation. Retrouvez ici nos derniers projets
          clients et toutes nos formations au développement web.
        </p>

        <div className="hero-buttons">
          <Link to="/projets" className="btn btn-yellow btn-lg">
            Nos projets
          </Link>
          <Link to="/formations" className="btn btn-outline-light btn-lg">
            Nos formations
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero