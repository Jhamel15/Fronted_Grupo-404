import React, { useState } from 'react';
import "./TiposBaja.css";

const initialData = [
  { id: 1, tipo: 'Venta', descripcion: 'Baja por venta' },
  { id: 2, tipo: 'Robo', descripcion: 'Baja por robo' },
  { id: 3, tipo: 'Deterioro', descripcion: 'Baja por deterioro' },
];

function TiposDeBaja() {
  const [data, setData] = useState(initialData);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({ tipo: '', descripcion: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSelect = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const handleNuevo = () => {
    setForm({ tipo: '', descripcion: '' });
    setIsEditing(false);
    setShowForm(true);
    setSelectedId(null);
  };

  return (
    <div className="container-tipos-baja">
      <h2>Tipos de Baja</h2>
      
    <div className="botones">
      <button onClick={handleNuevo} className="btn-nuevo">
        Nuevo 
      </button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={handleNuevo} className="btn-nuevo">
        Editar
      </button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={handleNuevo} className="btn-nuevo">
        Eliminar
      </button>&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
      <table className="tabla-bajas">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr 
              key={item.id} 
              onClick={() => handleSelect(item.id)}
              className={selectedId === item.id ? "fila-seleccionada" : ""}
            >
              <td>{item.id}</td>
              <td>{item.tipo}</td>
              <td>{item.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TiposDeBaja;