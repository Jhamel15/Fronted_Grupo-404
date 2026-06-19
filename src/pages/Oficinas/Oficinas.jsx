import './Oficinas.css'

function Oficinas() {

  const oficinas = [
    {
      id: 1,
      oficina: "Central",
      descripcion: "Principal"
    },
    {
      id: 2,
      oficina: "Norte",
      descripcion: "Secundaria"
    }
  ]

  return (
    <div className="oficinas-container">

      <div className="titulo-oficinas">
        ADMINISTRACIÓN DE OFICINAS
      </div>

      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>OFICINA</th>
              <th>DESCRIPCIÓN</th>
            </tr>
          </thead>

          <tbody>
            {
              oficinas.map((oficina) => (
                <tr key={oficina.id}>
                  <td>{oficina.id}</td>
                  <td>{oficina.oficina}</td>
                  <td>{oficina.descripcion}</td>
                </tr>
              ))
            }
          </tbody>

        </table>

        <div className="botones">
          <button>Nuevo</button>
          <button>Editar</button>
          <button>Eliminar</button>
          <button>Seleccionar</button>
          <button>Salir</button>
        </div>

      </div>

    </div>
  )
}

export default Oficinas