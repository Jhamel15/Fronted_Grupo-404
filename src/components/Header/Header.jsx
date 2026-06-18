import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="top-bar">SISTEMA DE ACTIVOS FIJOS</div>

      <div className="banner">
        <div className="brand-section">
          <div className="flag-shape"></div>

          <Link to="/" className="logo-link">
            <h1>V.S.I.A.F</h1>
            <p>Sistema de Activos Fijos</p>
          </Link>
        </div>

        <div className="user-section">
          <p><strong>USUARIO:</strong> admin</p>
          <p><strong>ROL:</strong> Administrador</p>
          <p><strong>BACKUPS:</strong> Ninguno</p>
        </div>
      </div>
    </header>
  )
}

export default Header