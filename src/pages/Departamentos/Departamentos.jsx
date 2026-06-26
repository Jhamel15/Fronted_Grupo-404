import { useEffect, useState } from "react";
import "./Departamentos.css";

const API_URL = import.meta.env.VITE_API_URL;

function Departamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [sigla, setSigla] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  const cargarDepartamentos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/departamentos`);
      const data = await res.json();
      setDepartamentos(data);
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  useEffect(() => {
    cargarDepartamentos();
  }, []);

  const limpiar = () => {
    setId("");
    setCodigo("");
    setNombre("");
    setSigla("");
    setSeleccionado(null);
  };

  const seleccionar = (depto) => {
    setSeleccionado(depto);
    setId(depto.id ?? "");
    setCodigo(depto.codigo ?? "");
    setNombre(depto.nombre ?? "");
    setSigla(depto.sigla ?? "");
  };

  const nuevo = async () => {
    if (!id || !codigo.trim() || !nombre.trim() || !sigla.trim()) {
      alert("Complete todos los campos");
      return;
    }

    await fetch(`${API_URL}/api/departamentos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        codigo,
        nombre,
        sigla,
      }),
    });

    limpiar();
    cargarDepartamentos();
  };

  const editar = async () => {
    if (!seleccionado) {
      alert("Seleccione un departamento");
      return;
    }

    await fetch(`${API_URL}/api/departamentos/${seleccionado.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: seleccionado.id,
        codigo,
        nombre,
        sigla,
      }),
    });

    limpiar();
    cargarDepartamentos();
  };

  const eliminar = async () => {
    if (!seleccionado) {
      alert("Seleccione un departamento");
      return;
    }

    const confirmar = window.confirm(
      "¿Está seguro de eliminar este departamento?"
    );

    if (!confirmar) return;

    await fetch(`${API_URL}/api/departamentos/${seleccionado.id}`, {
      method: "DELETE",
    });

    limpiar();
    cargarDepartamentos();
  };

  return (
    <div className="departamentos-container">
      <div className="departamentos-title">
        <h2>ADMINISTRACIÓN DE DEPARTAMENTOS</h2>
      </div>

      <div className="departamentos-card">
        <div className="departamentos-form">
          <input
            type="number"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={!!seleccionado}
          />

          <input
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          <input
            type="text"
            placeholder="Nombre del departamento"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Sigla"
            value={sigla}
            onChange={(e) => setSigla(e.target.value)}
          />
        </div>

        <table className="departamentos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>CÓDIGO</th>
              <th>DEPARTAMENTO</th>
              <th>SIGLA</th>
            </tr>
          </thead>

          <tbody>
            {departamentos.map((depto) => (
              <tr
                key={depto.id}
                onClick={() => seleccionar(depto)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    seleccionado?.id === depto.id ? "#b7d9f2" : "",
                }}
              >
                <td>{depto.id}</td>
                <td>{depto.codigo}</td>
                <td>{depto.nombre}</td>
                <td>{depto.sigla}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="departamentos-actions">
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

export default Departamentos;