import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/clientes')
      .then(res => res.json())
      .then(data => setClientes(data));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clienteAEnviar = {
      ...form,
      telefono: String(form.telefono)
    };
    const res = await fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteAEnviar)
    });
    if (res.ok) {
      const nuevoCliente = await res.json();
      setClientes([...clientes, nuevoCliente]);
      setForm({ nombre: '', correo: '', telefono: '', direccion: '' });
    } else {
      alert('Error al agregar cliente');
    }
  };

  const handleEdit = (cliente) => {
    setEditId(cliente.id);
    setForm({
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
      direccion: cliente.direccion
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const clienteAEnviar = {
      nombre: form.nombre,
      correo: form.correo,
      telefono: form.telefono,
      direccion: form.direccion
    };
    const res = await fetch(`http://localhost:3000/clientes/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteAEnviar)
    });
    if (res.ok) {
      fetch('http://localhost:3000/clientes')
        .then(res => res.json())
        .then(data => setClientes(data));
      setEditId(null);
      setForm({ nombre: '', correo: '', telefono: '', direccion: '' });
    } else {
      alert('Error al actualizar cliente');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas borrar este cliente?')) return;
    const res = await fetch(`http://localhost:3000/clientes/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      setClientes(clientes.filter(u => u.id !== id));
    } else {
      alert('Error al borrar cliente');
    }
  };

  return (
    <div className="app-container">
      <div className="content">
        <h1>Gestión de Clientes</h1>
        <form onSubmit={editId ? handleUpdate : handleSubmit}>
          <input
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            name="correo"
            placeholder="Correo electrónico"
            value={form.correo}
            onChange={handleChange}
            required
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            required
          />
          <input
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
            required
          />
          <button type="submit">{editId ? 'Guardar cambios' : 'Agregar cliente'}</button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({ nombre: '', correo: '', telefono: '', direccion: '' });
              }}
            >
              Cancelar edición
            </button>
          )}
        </form>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre completo</th>
              <th>Correo electrónico</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{u.telefono}</td>
                <td>{u.direccion}</td>
                <td>
                  <center>
                    <button onClick={() => handleEdit(u)}>Editar</button>
                    <button onClick={() => handleDelete(u.id)}>Borrar</button>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;