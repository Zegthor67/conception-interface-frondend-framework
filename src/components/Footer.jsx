import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../config/constants'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div>
          <p className="site-logo">
            WebCraft<span>Solutions</span>
          </p>
          <p className="footer-text">
            Agence web et organisme de formation aux métiers du développement.
          </p>
        </div>

        <ul className="footer-links">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="footer-copyright">
        © {currentYear} WebCraft Solutions - Tous droits réservés
      </p>
    </footer>
  )
}

export default Footer
