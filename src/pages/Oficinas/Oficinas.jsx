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
    Tabla Oficinas
</div>

    <div className="botones">
    <button className="btn-nuevo">Nuevo</button>
    <button className="btn-editar">Editar</button>
    <button className="btn-eliminar">Eliminar</button>
</div>

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

    </div>
  )
}

export default Oficinas