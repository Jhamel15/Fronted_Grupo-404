
import { useEffect, useState } from "react";
import "./TiposBaja.css"; 

const API_URL = import.meta.env.VITE_API_URL;

function TiposBaja() {
  const [tiposBaja, setTiposBaja] = useState([
    { id: 1, nombre: "Venta", descripcion: "Baja por venta" },
    { id: 2, nombre: "Robo", descripcion: "Baja por robo" },
    { id: 3, nombre: "Deterioro", descripcion: "Baja por deterioro" }
  ]);
  
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState(""); 
  const [seleccionado, setSeleccionado] = useState(null);

  const obtenerId = (tipo) => tipo.codtipobaja ?? tipo.codTipoBaja ?? tipo.id ?? "";
  const obtenerNombre = (tipo) => tipo.nomtipobaja ?? tipo.nomTipoBaja ?? tipo.nombre ?? tipo.tipo ?? "";
  const obtenerDescripcion = (tipo) => tipo.destipobaja ?? tipo.desTipoBaja ?? tipo.descripcion ?? "";

  const cargarTiposBaja = async () => {
    try {
      const res = await fetch(API_URL + "/api/tiposbaja");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTiposBaja(data);
        }
      }
    } catch (error) {
      console.error("Error al cargar desde el servidor:", error);
    }
  };

  useEffect(() => {
    cargarTiposBaja();
  }, []);

  const nuevo = async () => {
    if (!nombre.trim() || !descripcion.trim()) {
      alert("Escribe el nombre y la descripción");
      return;
    }
    const nuevoRegistro = {
      id: tiposBaja.length > 0 ? Math.max(...tiposBaja.map(t => obtenerId(t))) + 1 : 1,
      nombre: nombre,
      descripcion: descripcion
    };
    setTiposBaja([...tiposBaja, nuevoRegistro]);
    limpiar();
  };

  const seleccionar = (tipo) => {
    setSeleccionado(tipo);
    setNombre(obtenerNombre(tipo));
    setDescripcion(obtenerDescripcion(tipo));
  };

  const editar = async () => {
    if (!seleccionado) {
      alert("Primero selecciona un tipo de baja");
      return;
    }
    const id = obtenerId(seleccionado);
    const actualizados = tiposBaja.map((t) => 
      obtenerId(t) === id ? { ...t, nombre: nombre, descripcion: descripcion } : t
    );
    setTiposBaja(actualizados);
    limpiar();
  };

  const eliminar = async () => {
    if (!seleccionado) {
      alert("Primero selecciona un tipo de baja");
      return;
    }
    const id = obtenerId(seleccionado);
    const confirmar = window.confirm("¿Está seguro de eliminar este tipo de baja?");
    if (!confirmar) return;
    
    const filtrados = tiposBaja.filter((t) => obtenerId(t) !== id);
    setTiposBaja(filtrados);
    limpiar();
  };

  const limpiar = () => {
    setNombre("");
    setDescripcion("");
    setSeleccionado(null);
  };

  return (
    <div className="baja-container">
      <div className="baja-title">
        <h2>ADMINISTRACIÓN DE TIPOS DE BAJA</h2>
      </div>

      <div className="baja-card">
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px", justifyContent: "flex-start", width: "100%" }}>
          <input 
            type="text" 
            placeholder="Nombre del tipo de baja" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            style={{ width: "220px", padding: "6px", border: "1px solid #777" }}
          />
          <input 
            type="text" 
            placeholder="Descripción de la baja" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            style={{ width: "280px", padding: "6px", border: "1px solid #777" }}
          />
        </div>
        
        <table className="baja-table" border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>ID</th>
              <th style={{ width: "40%" }}>TIPO</th>
              <th style={{ width: "40%" }}>DESCRIPCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {tiposBaja.map((tipo) => {
              const id = obtenerId(tipo);
              const nombreTipo = obtenerNombre(tipo);
              const descTipo = obtenerDescripcion(tipo);
              const estaSeleccionado = seleccionado && obtenerId(seleccionado) === id;

              return (
                <tr
                  key={id}
                  onClick={() => seleccionar(tipo)}
                  className={estaSeleccionado ? "baja-fila-seleccionada" : ""}
                >
                  <td style={{ textAlign: "center" }}>{id}</td>
                  <td>{nombreTipo}</td>
                  <td>{descTipo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Caja de botones con las clases estilizadas */}
        <div className="baja-actions-container">
          <div className="baja-actions">
            <button className="btn-baja" onClick={nuevo}>Nuevo</button>
            <button className="btn-baja" onClick={editar}>Editar</button>
            <button className="btn-baja" onClick={eliminar}>Eliminar</button>
            <button className="btn-baja" onClick={limpiar}>Seleccionar</button>
            <button className="btn-baja" onClick={() => window.history.back()}>Salir</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TiposBaja;