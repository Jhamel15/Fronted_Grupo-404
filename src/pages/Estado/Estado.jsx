import './Estado.css'

function Estado() {
  const estados = [
    { id: 1, nombre: 'Bueno' },
    { id: 2, nombre: 'Regular' },
    { id: 3, nombre: 'Malo' },
    { id: 4, nombre: 'En mantenimiento' }
  ]

  return (
    <section className="estado-container">
      <div className="estado-header">
        <h2>ADMINISTRACIÓN DE ESTADOS</h2>
      </div>

      <div className="estado-card">
        <table className="estado-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ESTADO</th>
            </tr>
          </thead>

          <tbody>
            {estados.map((estado) => (
              <tr key={estado.id}>
                <td>{estado.id}</td>
                <td>{estado.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="estado-actions">
          <button className="btn">Nuevo</button>
          <button className="btn">Editar</button>
          <button className="btn">Eliminar</button>
          <button className="btn">Seleccionar</button>
          <button className="btn">Salir</button>
        </div>
      </div>
    </section>
  )
}

export default Estado