// Importa los módulos necesarios
import React, { useState, useEffect } from "react";
// Importa el módulo useAuth0 de @auth0/auth0-react
import { useAuth0 } from '@auth0/auth0-react';

// Importa el módulo useNavigate de react-router
import { useNavigate } from "react-router";

// Importa el componente ReactQuill de react-quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // importar los estilos CSS 

import "react-quill/dist/quill.snow.css";
import "./previewBlog.css";

// Componente principal
function App() {
  // Estado para almacenar la lista de blogs
  const [blogs, setBlogs] = useState([]);

  // Estado para almacenar los datos del nuevo blog
  const [newBlog, setNewBlog] = useState({
    autor: "",
    titulo: "",
    contenido: "",
    categoria: "",
  });

  // Efecto para cargar la lista de blogs al cargar el componente
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);

  // Función para manejar cambios en el formulario de nuevo blog
  const handleNewBlogChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  // Función para agregar un nuevo blog
  const handleAddBlog = () => {
    const updatedBlogs = [...blogs, { ...newBlog, id: Date.now().toString() }];
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setNewBlog({
      autor: "",
      titulo: "",
      contenido: "",
      categoria: "",
    });
  };

  // Función para eliminar un blog
  const handleDeleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  return (
    <div>
      {/* Formulario para agregar un nuevo blog */}
      <div>
        <h2>Agregar nuevo blog</h2>
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={newBlog.autor}
          onChange={handleNewBlogChange}
        />
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={newBlog.titulo}
          onChange={handleNewBlogChange}
        />
        <input
          type="text"
          name="contenido"
          placeholder="Contenido"
          value={newBlog.contenido}
          onChange={handleNewBlogChange}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={newBlog.categoria}
          onChange={handleNewBlogChange}
        />
        <button onClick={handleAddBlog}>Agregar Blog</button>
      </div>

      {/* Lista de blogs existentes */}
      <div>
        <h2>Lista de Blogs</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              {blog.titulo} - {blog.autor}{" "}
              <button onClick={() => handleDeleteBlog(blog.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


/* CODIGO GOOGLE SHEETS */ /* CODIGO GOOGLE SHEETS */
const formulario = document.getElementById("formulario");
const registro = document.getElementById("registro");
const exito = document.getElementById("exito");


formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    /* ESCRIBIR FILAS */
  try {
    const respuesta = await fetch("https://sheet.best/api/sheets/7634bfae-4c78-4705-b1d6-430c929a77a2" , {
      method: "POST",
      mode: "cors" ,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "Autor": formulario.Autor.value,
        "Titulo": formulario.Titulo.value,
        "Historia": formulario.Historia.value,
        "Categoria": formulario.Categoria.value,
        "Etiqueta": formulario.Etiqueta.value
      })

    });

    const contenido = await respuesta.json();

  } catch (error) {
    console.log(error);
  }

  /* LEER FILA */
  try {
    const respuesta = await fetch("https://sheet.best/api/sheets/7634bfae-4c78-4705-b1d6-430c929a77a2" , {

    });

    const contenido = await respuesta.json();
    
  } catch (error) {
    console.log(error);
  }


  /* ELIMINAR FILA - ELIMINAR FILA */
  try {
    const respuesta = await fetch("https://sheet.best/api/sheets/7634bfae-4c78-4705-b1d6-430c929a77a2" , {
      method: "DELETE",
      

    });

    const contenido = await respuesta.json();
    
  } catch (error) {
    console.log(error);
  }

  /* ACTUALIZAR - ACTUALIZAR */
  try {
    const respuesta = await fetch("https://sheet.best/api/sheets/7634bfae-4c78-4705-b1d6-430c929a77a2" , {
      method: "PATCH",
      mode: "cors" ,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "Autor": formulario.Autor.value,
        "Titulo": formulario.Titulo.value,
        "Historia": formulario.Historia.value,
        "Categoria": formulario.Categoria.value,
        "Etiqueta": formulario.Etiqueta.value
      })
    });

    registro.classList.remove("activo");
    exito.classList.add("activo");
  }  catch (error) {
    console.log(error);
  }
});