import { useEffect, useState } from "react";
import "./Estado.css";

const API_URL = import.meta.env.VITE_API_URL;

function Estado() {
  const [estados, setEstados] = useState([]);
  const [nombre, setNombre] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  const obtenerId = (estado) => estado.codestado ?? estado.id;
  const obtenerNombre = (estado) =>
    estado.nomestado ?? estado.nombre ?? estado.estado ?? "";

  const cargarEstados = async () => {
    try {
      const res = await fetch(`${API_URL}/api/estado`);
      const data = await res.json();
      setEstados(data);
    } catch (error) {
      console.error("Error al cargar estados:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  useEffect(() => {
    cargarEstados();
  }, []);

  const nuevo = async () => {
    if (!nombre.trim()) {
      alert("Escribe el nombre del estado");
      return;
    }

    await fetch(`${API_URL}/api/estado`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomestado: nombre }),
    });

    limpiar();
    cargarEstados();
  };

  const seleccionar = (estado) => {
    setSeleccionado(estado);
    setNombre(obtenerNombre(estado));
  };

  const editar = async () => {
    if (!seleccionado) {
      alert("Primero selecciona un estado");
      return;
    }

    const id = obtenerId(seleccionado);

    await fetch(`${API_URL}/api/estado/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomestado: nombre }),
    });

    limpiar();
    cargarEstados();
  };

  const eliminar = async () => {
    if (!seleccionado) {
      alert("Primero selecciona un estado");
      return;
    }

    const id = obtenerId(seleccionado);

    const confirmar = window.confirm("¿Está seguro de eliminar este estado?");
    if (!confirmar) return;

    await fetch(`${API_URL}/api/estado/${id}`, {
      method: "DELETE",
    });

    limpiar();
    cargarEstados();
  };

  const limpiar = () => {
    setNombre("");
    setSeleccionado(null);
  };

  return (
    <div className="estado-container">
      <div className="estado-title">
        <h2>ADMINISTRACIÓN DE ESTADOS</h2>
      </div>

      <div className="estado-card">
        <input
          type="text"
          placeholder="Nombre del estado"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{
            marginBottom: "15px",
            padding: "8px",
            width: "320px",
            border: "1px solid #777",
          }}
        />

        <table className="estado-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ESTADO</th>
            </tr>
          </thead>

          <tbody>
            {estados.map((estado) => {
              const id = obtenerId(estado);
              const nombreEstado = obtenerNombre(estado);

              return (
                <tr
                  key={id}
                  onClick={() => seleccionar(estado)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      seleccionado && obtenerId(seleccionado) === id
                        ? "#b7d9f2"
                        : "",
                  }}
                >
                  <td>{id}</td>
                  <td>{nombreEstado}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="estado-actions">
          <button className="btn" onClick={nuevo}>
            Nuevo
          </button>
          <button className="btn" onClick={editar}>
            Editar
          </button>
          <button className="btn" onClick={eliminar}>
            Eliminar
          </button>
          <button className="btn" onClick={limpiar}>
            Seleccionar
          </button>
          <button className="btn" onClick={limpiar}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}

export default Estado;
