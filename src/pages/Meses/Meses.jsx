
import { useEffect, useState } from "react";
import "./Meses.css";

const API_URL = import.meta.env.VITE_API_URL;

function Meses() {
  const [meses, setMeses] = useState([]);
  const [nommes, setNommes] = useState("");
  const [numero, setNumero] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  const cargarMeses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/meses`);
      const data = await res.json();
      setMeses(data);
    } catch (error) {
      console.error("Error al cargar meses:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  useEffect(() => {
    cargarMeses();
  }, []);

  const limpiar = () => {
    setNommes("");
    setNumero("");
    setSeleccionado(null);
  };

  const seleccionar = (mes) => {
    setSeleccionado(mes);
    setNommes(mes.nommes ?? "");
    setNumero(mes.numero ?? "");
  };

  const nuevo = async () => {
    if (!nommes.trim() || !numero) {
      alert("Complete todos los campos");
      return;
    }

    await fetch(`${API_URL}/api/meses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nommes,
        numero: Number(numero),
      }),
    });

    limpiar();
    cargarMeses();
  };

  const editar = async () => {
    if (!seleccionado) {
      alert("Seleccione un mes");
      return;
    }

    await fetch(`${API_URL}/api/meses/${seleccionado.codmes}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nommes,
        numero: Number(numero),
      }),
    });

    limpiar();
    cargarMeses();
  };

  const eliminar = async () => {
    if (!seleccionado) {
      alert("Seleccione un mes");
      return;
    }

    const confirmar = window.confirm("¿Está seguro de eliminar este mes?");
    if (!confirmar) return;

    await fetch(`${API_URL}/api/meses/${seleccionado.codmes}`, {
      method: "DELETE",
    });

    limpiar();
    cargarMeses();
  };

  return (
    <div className="meses-container">
      <div className="meses-title">
        <h2>ADMINISTRACIÓN DE MESES</h2>
      </div>

      <div className="meses-card">
        <div className="meses-form">
          <input
            type="text"
            placeholder="Nombre del mes"
            value={nommes}
            onChange={(e) => setNommes(e.target.value)}
          />

          <input
            type="number"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>

        <table className="meses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>MES</th>
              <th>NÚMERO</th>
            </tr>
          </thead>

          <tbody>
            {meses.map((mes) => (
              <tr
                key={mes.codmes}
                onClick={() => seleccionar(mes)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    seleccionado?.codmes === mes.codmes ? "#b7d9f2" : "",
                }}
              >
                <td>{mes.codmes}</td>
                <td>{mes.nommes}</td>
                <td>{mes.numero}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="meses-actions">
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

export default Meses;