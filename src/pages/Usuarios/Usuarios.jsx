import React, { useState } from 'react';
import './Usuarios.css';

function Usuarios() {
  // Volvemos a la lista original de usuarios
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      usuario: 'Carla',
      nombre: 'Mamani Condori',
      rol: 'Comunicador'
    },
    {
      id: 2,
      usuario: 'Daniela',
      nombre: 'Coro Gamboa',
      rol: 'Lider'
    },
    {
      id: 3,
      usuario: 'Juan',
      nombre: 'Cruz Ramos',
      rol: 'Operador'
    }
  ]);

  const nuevoUsuario = () => {
    const usuario = prompt('Ingrese el usuario:');
    const nombre = prompt('Ingrese el nombre completo:');
    const rol = prompt('Ingrese el rol:');

    if (!usuario || !nombre || !rol) return;

    setUsuarios([
      ...usuarios,
      {
        id: usuarios.length + 1,
        usuario,
        nombre,
        rol
      }
    ]);
  };

  const editarUsuario = () => {
    const id = Number(prompt('Ingrese el ID a editar:'));
    if (!id) return;

    const nuevosUsuarios = usuarios.map((u) => {
      if (u.id === id) {
        const txtUsuario = prompt('Nuevo usuario:', u.usuario);
        const txtNombre = prompt('Nuevo nombre:', u.nombre);
        const txtRol = prompt('Nuevo rol:', u.rol);

        return {
          ...u,
          usuario: txtUsuario || u.usuario,
          nombre: txtNombre || u.nombre,
          rol: txtRol || u.rol,
        };
      }
      return u;
    });

    setUsuarios(nuevosUsuarios);
  };

  const eliminarUsuario = () => {
    const id = Number(prompt('Ingrese el ID a eliminar:'));
    if (!id) return;

    setUsuarios(
      usuarios.filter((u) => u.id !== id)
    );
  };

  return (
      <div className="baja-content">
        <div className="modulo-banner">
          <h2>ADMINISTRACIÓN DE USUARIOS</h2>
        </div>

        {/* Estructura de la tabla adaptada a Usuarios */}
        <table className="tabla-baja">
          <thead>
            <tr>
              <th className="col-id">ID</th>
              <th className="col-user">USUARIO</th>
              <th className="col-nombre">NOMBRE COMPLETO</th>
              <th className="col-rol">ROL</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.usuario}</td>
                <td>{item.nombre}</td>
                <td>{item.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="contenedor-botones-baja">
          <button type="button" onClick={nuevoUsuario}>Nuevo</button>
          <button type="button" onClick={editarUsuario}>Editar</button>
          <button type="button" onClick={eliminarUsuario}>Eliminar</button>
        </div>
      </div>
  );
}

export default Usuarios