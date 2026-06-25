import { useEffect, useState } from "react";
import "./Usuarios.css";

const API_URL = import.meta.env.VITE_API_URL;

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  const cargarUsuarios = async () => {
    try {
      const res = await fetch(`${API_URL}/api/usuarios`);
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const limpiar = () => {
    setNombre("");
    setCorreo("");
    setPassword("");
    setSeleccionado(null);
  };

  const seleccionar = (usuario) => {
    setSeleccionado(usuario);
    setNombre(usuario.nombre ?? "");
    setCorreo(usuario.correo ?? "");
    setPassword(usuario.password ?? "");
  };

  const nuevo = async () => {
    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      alert("Complete todos los campos");
      return;
    }

    await fetch(`${API_URL}/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        correo,
        password,
      }),
    });

    limpiar();
    cargarUsuarios();
  };

  const editar = async () => {
    if (!seleccionado) {
      alert("Seleccione un usuario");
      return;
    }

    await fetch(`${API_URL}/api/usuarios/${seleccionado.codusuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        correo,
        password,
      }),
    });

    limpiar();
    cargarUsuarios();
  };

  const eliminar = async () => {
    if (!seleccionado) {
      alert("Seleccione un usuario");
      return;
    }

    const confirmar = window.confirm("¿Está seguro de eliminar este usuario?");
    if (!confirmar) return;

    await fetch(`${API_URL}/api/usuarios/${seleccionado.codusuario}`, {
      method: "DELETE",
    });

    limpiar();
    cargarUsuarios();
  };

  return (
    <div className="usuarios-container">
      <div className="usuarios-title">
        <h2>ADMINISTRACIÓN DE USUARIOS</h2>
      </div>

      <div className="usuarios-card">
        <div className="usuarios-form">
          <input
            type="text"
            placeholder="Nombre del usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CORREO</th>
              <th>CONTRASEÑA</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr
                key={usuario.codusuario}
                onClick={() => seleccionar(usuario)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    seleccionado?.codusuario === usuario.codusuario
                      ? "#b7d9f2"
                      : "",
                }}
              >
                <td>{usuario.codusuario}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.password}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="usuarios-actions">
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

export default Usuarios;
