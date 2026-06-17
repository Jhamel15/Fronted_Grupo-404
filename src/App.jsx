import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

import Estado from './pages/Estado'
import Meses from './pages/Meses'
import Oficinas from './pages/Oficinas'
import OrganismosFinancieros from './pages/OrganismosFinancieros'
import Usuarios from './pages/Usuarios'
import TiposBaja from './pages/TiposBaja'
import Departamentos from './pages/Departamentos'

import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/estado" />} />
        <Route path="/estado" element={<Estado />} />
        <Route path="/meses" element={<Meses />} />
        <Route path="/oficinas" element={<Oficinas />} />
        <Route path="/organismos-financieros" element={<OrganismosFinancieros />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/tipos-baja" element={<TiposBaja />} />
        <Route path="/departamentos" element={<Departamentos />} />
      </Routes>
    </Layout>
  )
}

export default App