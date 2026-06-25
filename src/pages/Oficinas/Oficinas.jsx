import { useEffect, useState } from "react";
import "./Oficinas.css";

const API_URL = import.meta.env.VITE_API_URL;

function Oficinas() {
  const [oficinas, setOficinas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  const cargarOficinas = async () => {
    try {
      const res = await fetch(`${API_URL}/api/oficina`);
      const data = await res.json();
      setOficinas(data);
    } catch (error) {
      console.error("Error al cargar oficinas:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  useEffect(() => {
    cargarOficinas();
  }, []);

  const limpiar = () => {
    setNombre("");
    setDescripcion("");
    setEstado("");
    setSeleccionado(null);
  };

  const seleccionar = (oficina) => {
    setSeleccionado(oficina);
    setNombre(oficina.nombre ?? "");
    setDescripcion(oficina.descripcion ?? "");
    setEstado(oficina.estado ?? "");
  };

  const nuevo = async () => {
    if (!nombre.trim() || !descripcion.trim() || !estado.trim()) {
      alert("Complete todos los campos");
      return;
    }

    await fetch(`${API_URL}/api/oficina`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        estado,
      }),
    });

    limpiar();
    cargarOficinas();
  };

  const editar = async () => {
    if (!seleccionado) {
      alert("Seleccione una oficina");
      return;
    }

    await fetch(`${API_URL}/api/oficina/${seleccionado.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        estado,
      }),
    });

    limpiar();
    cargarOficinas();
  };

  const eliminar = async () => {
    if (!seleccionado) {
      alert("Seleccione una oficina");
      return;
    }

    const confirmar = window.confirm("¿Está seguro de eliminar esta oficina?");
    if (!confirmar) return;

    await fetch(`${API_URL}/api/oficina/${seleccionado.id}`, {
      method: "DELETE",
    });

    limpiar();
    cargarOficinas();
  };

  return (
    <div className="oficinas-container">
      <div className="oficinas-title">
        <h2>ADMINISTRACIÓN DE OFICINAS</h2>
      </div>

      <div className="oficinas-card">
        <div className="oficinas-form">
          <input
            type="text"
            placeholder="Nombre de oficina"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <input
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>

        <table className="oficinas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>OFICINA</th>
              <th>DESCRIPCIÓN</th>
              <th>ESTADO</th>
            </tr>
          </thead>

          <tbody>
            {oficinas.map((oficina) => (
              <tr
                key={oficina.id}
                onClick={() => seleccionar(oficina)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    seleccionado?.id === oficina.id ? "#b7d9f2" : "",
                }}
              >
                <td>{oficina.id}</td>
                <td>{oficina.nombre}</td>
                <td>{oficina.descripcion}</td>
                <td>{oficina.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="oficinas-actions">
          <button className="btn" onClick={nuevo}>Nuevo</button>
          <button className="btn" onClick={editar}>Editar</button>
          <button className="btn" onClick={eliminar}>Eliminar</button>
          <button className="btn" onClick={limpiar}>Seleccionar</button>
          <button className="btn" onClick={limpiar}>Salir</button>
        </div>
      </div>
    </div>
  );
}

export default Oficinas;