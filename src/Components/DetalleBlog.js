import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './detalleblog.css';
import Comentario from './Comentario.js'; // Importa el componente Comentario

export default function View() {
  const [form, setForm] = useState({
    titulo: "",
    contenido: "",
    categoria: "",
    fechaCreacion: "",
    fechaActualizacion: ""
  });
  const params = useParams();
  const { user } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:3000/Blog/${params.id.toString()}`);

      if (!response.ok) {
        const message = `SE HA PRODUCIDO UN ERROR: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const blog = await response.json();
      if (!blog) {
        window.alert(`Blog with id ${id} not found`);
        return;
      }

      setForm(blog);
    }

    fetchData();

    return;
  }, [params.id]);

  async function deleteBlog() {
    await fetch(`http://localhost:3000/Blog/${params.id}`, {
      method: "DELETE"
    });

    // Redirect to blog list after deleting
    window.location.href = "/";
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <div className="detalles-blogs-contenedor">
        <div className="body">
            <h3>Detalles del Blog</h3>
            <div className="form-group">
              <label>Autor</label>
              <p>{user.name}</p>
            </div>
            <div className="form-group">
              <label>Titulo</label>
              <p>{form.titulo}</p>
            </div>
            <div className="form-group">
              <label>Contenido</label>
              <p>{form.contenido}</p>
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <p>{form.categoria}</p>
            </div>
            <div className="form-group">
              <div className="button-container">
                <Link className="btn btn-link btn-edit" to={`/edit/${params.id}`}>Editar Blog</Link>
                <button className="btn btn-link btn-delete" onClick={deleteBlog}>Eliminar Blog</button>
                <Link className="btn btn-link btn-volver" to="/blogs/">Volver</Link>
              </div>
            </div>
        </div>
      </div>

      {/* Renderiza el componente Comentario aquí */}
      <Comentario />
    </div>
  );
}
