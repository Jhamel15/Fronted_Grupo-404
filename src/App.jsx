import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'

import Home from './pages/Home/Home'
import Estado from './pages/Estado/Estado'
import Meses from './pages/Meses/Meses'
import Oficinas from './pages/Oficinas/Oficinas'
import OrganismosFinancieros from './pages/OrganismosFinancieros/OrganismosFinancieros'
import Usuarios from './pages/Usuarios/Usuarios'
import TiposBaja from './pages/TiposBaja/TiposBaja'
import Departamentos from './pages/Departamentos/Departamentos'

import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/estado" element={<Estado />} />
        <Route path="/meses" element={<Meses />} />
        <Route path="/oficinas" element={<Oficinas />} />
        <Route
          path="/organismos-financieros"
          element={<OrganismosFinancieros />}
        />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/tipos-baja" element={<TiposBaja />} />
        <Route path="/departamentos" element={<Departamentos />} />
      </Routes>
    </Layout>
  )
}

export default App