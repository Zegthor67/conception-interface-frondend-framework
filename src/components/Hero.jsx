import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">
      {/* Formes décoratives animées en arrière-plan */}
      <div className="hero-shape hero-shape-1"></div>
      <div className="hero-shape hero-shape-2"></div>

      <div className="container hero-content">
        <p className="hero-subtitle">Agence web & centre de formation</p>
        <h1 className="hero-title">
          On conçoit vos projets web
          <br />
          et on forme vos équipes
        </h1>
        <p className="hero-text">
          Découvrez nos réalisations pour nos clients et nos formations pour
          monter en compétences sur les technologies du web.
        </p>

        <div className="hero-buttons">
          <Link to="/projets" className="btn btn-light btn-lg">
            Voir nos projets
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
