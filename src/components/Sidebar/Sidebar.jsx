import './Sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>MENU PRINCIPAL</h2>

      <Link to="/estado">Estado</Link>
      <Link to="/meses">Meses</Link>
      <Link to="/oficinas">Oficinas</Link>
      <Link to="/organismos-financieros">Organismos Financieros</Link>
      <Link to="/usuarios">Usuarios</Link>
      <Link to="/tipos-baja">Tipos de Baja</Link>
      <Link to="/departamentos">Departamentos</Link>
    </aside>
  )
}

export default Sidebar