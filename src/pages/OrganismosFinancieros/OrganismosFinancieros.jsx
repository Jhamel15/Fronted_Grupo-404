import { useEffect, useState } from "react";
import "./OrganismosFinancieros.css";

const API_URL = import.meta.env.VITE_API_URL;

function OrganismosFinancieros() {
  const [organismos, setOrganismos] = useState([]);
  const [gestion, setGestion] = useState("");
  const [codigoOrganismo, setCodigoOrganismo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [sigla, setSigla] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  const cargarOrganismos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/organismos-fin`);
      const data = await res.json();
      setOrganismos(data);
    } catch (error) {
      console.error("Error al cargar organismos:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  useEffect(() => {
    cargarOrganismos();
  }, []);

  const limpiar = () => {
    setGestion("");
    setCodigoOrganismo("");
    setDescripcion("");
    setSigla("");
    setSeleccionado(null);
  };

  const seleccionar = (org) => {
    setSeleccionado(org);
    setGestion(org.gestion ?? "");
    setCodigoOrganismo(org.codigoOrganismo ?? "");
    setDescripcion(org.descripcion ?? "");
    setSigla(org.sigla ?? "");
  };

  const nuevo = async () => {
    if (!gestion || !codigoOrganismo || !descripcion.trim() || !sigla.trim()) {
      alert("Complete todos los campos");
      return;
    }

    await fetch(`${API_URL}/api/organismos-fin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gestion: Number(gestion),
        codigoOrganismo: Number(codigoOrganismo),
        descripcion,
        sigla,
      }),
    });

    limpiar();
    cargarOrganismos();
  };

  const editar = async () => {
    if (!seleccionado) {
      alert("Primero seleccione un organismo financiero");
      return;
    }

    await fetch(`${API_URL}/api/organismos-fin/${seleccionado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gestion: Number(gestion),
        codigoOrganismo: Number(codigoOrganismo),
        descripcion,
        sigla,
      }),
    });

    limpiar();
    cargarOrganismos();
  };

  const eliminar = async () => {
    if (!seleccionado) {
      alert("Primero seleccione un organismo financiero");
      return;
    }

    const confirmar = window.confirm(
      "¿Está seguro de eliminar este organismo financiero?"
    );

    if (!confirmar) return;

    await fetch(`${API_URL}/api/organismos-fin/${seleccionado.id}`, {
      method: "DELETE",
    });

    limpiar();
    cargarOrganismos();
  };

  return (
    <div className="organismos-container">
      <div className="organismos-title">
        <h2>ADMINISTRACIÓN DE ORGANISMOS FINANCIEROS</h2>
      </div>

      <div className="organismos-card">
        <div className="organismos-form">
          <input
            type="number"
            placeholder="Gestión"
            value={gestion}
            onChange={(e) => setGestion(e.target.value)}
          />

          <input
            type="number"
            placeholder="Código organismo"
            value={codigoOrganismo}
            onChange={(e) => setCodigoOrganismo(e.target.value)}
          />

          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <input
            type="text"
            placeholder="Sigla"
            value={sigla}
            onChange={(e) => setSigla(e.target.value)}
          />
        </div>

        <table className="organismos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>GESTIÓN</th>
              <th>CÓDIGO</th>
              <th>DESCRIPCIÓN</th>
              <th>SIGLA</th>
            </tr>
          </thead>

          <tbody>
            {organismos.map((org) => (
              <tr
                key={org.id}
                onClick={() => seleccionar(org)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    seleccionado?.id === org.id ? "#b7d9f2" : "",
                }}
              >
                <td>{org.id}</td>
                <td>{org.gestion}</td>
                <td>{org.codigoOrganismo}</td>
                <td>{org.descripcion}</td>
                <td>{org.sigla}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="organismos-actions">
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

export default OrganismosFinancieros;