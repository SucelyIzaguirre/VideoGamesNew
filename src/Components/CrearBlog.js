/*El siguiente código servirá como componente de creación para nuestros registros. 
Con este componente, los usuarios pueden crear un nuevo registro. Este componente enviará un 
comando create a nuestro servidor.

El componente define un formulario con campos para ingresar el nombre, la posición y el nivel del nuevo registro. 
Cuando el usuario envía el formulario, el componente envía una solicitud POST a la ruta /record del servidor para agregar
el nuevo registro a la base de datos*/
import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router";
import "./crearblog.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./previewBlog.css";

// Agregué este componente para manejar las etiquetas
function TagsInput({ tags, setTags }) {
  // Esta función se encarga de separar el texto por comas y agregarlo al arreglo de etiquetas.
  function handleTagsChange(e) {
    const value = e.target.value;
    const newTags = value.split(",").map((tag) => tag.trim());
    setTags(newTags);
  }

  // Esta función se encarga de eliminar una etiqueta del arreglo cuando el usuario hace clic en ella.
  function handleTagClick(index) {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  }

  return (
    <div className="tags-input">
      <label htmlFor="tags">Etiquetas</label>
      <input
        type="text"
        id="tags"
        value={tags.join(", ")}
        onChange={handleTagsChange}
      />
      <div className="tags-container">
        {tags.map((tag, index) => (
          <span
            className="tag"
            key={index}
            onClick={() => handleTagClick(index)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  ); 
}

// Agregué este componente para mostrar la vista previa del blog
function BlogPreview({ blog, onEdit, onPublish }) {
  const previewRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  // Esta función se llama cuando el usuario comienza a arrastrar el contenedor
  function handleMouseDown(e) {
    setDragging(true);
    setPosition({
      x: e.clientX - previewRef.current.offsetLeft,
      y: e.clientY - previewRef.current.offsetTop,
    });
  }

  // Esta función se llama cuando el usuario mueve el mouse mientras arrastra el contenedor
  function handleMouseMove(e) {
    if (dragging) {
      previewRef.current.style.left = e.clientX - position.x + "px";
      previewRef.current.style.top = e.clientY - position.y + "px";
    }
  }

  // Esta función se llama cuando el usuario suelta el botón del mouse y deja de arrastrar el contenedor
  function handleMouseUp() {
    setDragging(false);
  }
   
  
  // Agrega los controladores de eventos para arrastrar y soltar al documento
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, position]);

  return (
    <div className="preview-container"  ref={previewRef} onMouseDown={handleMouseDown}  >
    {/* Agrega un botón con una X en la esquina superior derecha del contenedor */}
    <button className="close-button" onClick={onEdit}>X</button>

      <h1>{blog.titulo}</h1>
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: blog.contenido }} />
          {blog.imagen && <img src={blog.imagen} alt="Imagen del blog" />}
        </div>
      <p>Autor:{blog.autor}</p>
      <p>Categoría: {blog.categoria}</p>
      <p>Etiquetas: {blog.tags.join(", ")}</p>
      <button onClick={onEdit}>Seguire editando</button>
      <button onClick={onPublish}>Lo compartire</button>
    </div>
  );
}


export default function Create() {
    const { user, isAuthenticated } = useAuth0();

  const [form, setForm] = useState({
    autor: "",
    titulo: "",
    contenido: "",
    categoria: "",
    fechaCreacion: new Date().toISOString().split("T")[0],
    fechaActualizacion: new Date().toISOString(),
  });
  const navigate = useNavigate();
  // Agregué este estado para guardar las etiquetas
  const [tags, setTags] = useState([]);

  // Agregué este estado para guardar las categorías
  const [categories, setCategories] = useState([]);

  // Agregué este estado para controlar si se muestra o no la vista previa
  const [preview, setPreview] = useState(false);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!form.titulo || !form.contenido || !form.categoria) {
      alert(
        "Por favor completa todos los campos obligatorios (título, contenido y categoría)"
      );
      return;
    }

    // Validación de criterios establecidos
    if (form.titulo.length < 5 || form.titulo.length > 100) {
      alert("EL TITULO DEBE DE CONTENER MAS DE 5 Y MENOS DE 100 CARACTERES");
      return;
    }

    // Establecer la fecha de actualización en la fecha actual del sistema
    const fechaActualizacion = new Date().toISOString().split("T")[0];
    updateForm({ fechaActualizacion });

    // When a post request is sent to the create url, we'll add a new record to the database.
    // Incluí las etiquetas en el objeto newBlog
    // Incluí las etiquetas y las categorías en el objeto newBlog
    const newBlog = {
      ...form,
      autor: user.name, // Establecer el nombre del autor como el nombre de usuario autenticado
      tags: tags.join(", "),
      categories: categories.join(", "),
    };

    try {
    await fetch("http://localhost:3000/Blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });
    
     //Muestra un mensaje de confirmacion y redirige al usuario a la pagina de listblog
      alert("¡Tu blog ha sido publicado exitosamente!");
      navigate("./blogs/ " + form.titulo);
    
    } catch(error) {
       // Muestra un mensaje de error y mantiene al usuario en la página de creación de blogs
      alert("Ocurrió un error al publicar tu blog. Por favor intenta nuevamente.");
      window.alert(error);
      return;
    }

 
    setForm({
      Autor: "",
      Titulo: "",
      contenido: "",
      categoria: "",
      fechaCreacion: new Date().toISOString().split("T")[0],
      fechaActualizacion,
    });
    navigate("/blogs/");
  }

  // Esta función se encarga de separar el texto por comas y agregarlo al arreglo de categorías.
  function handleCategoriesChange(e) {
    const value = e.target.value;
    const newCategories = value.split(",").map((category) => category.trim());
    setCategories(newCategories);
  }

  // Esta función se encarga de eliminar una categoría del arreglo cuando el usuario hace clic en ella.
  function handleCategoryClick(index) {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  }

  //ESTA SECCION ES LA QUE SE MUESTRA AL USUARIO
  return (
    <div>
        <div className="crear-blogs-contenedor">
          {/* Agregué una condición para mostrar el componente BlogPreview si preview es true */}
          {preview && (
            <>
              <BlogPreview
                blog={{ ...form, tags }}
                onEdit={() => setPreview(false)}
                onPublish={onSubmit}
              />
            </>
          )}

          /* FORMULARIO FORMULARIO FORMULARIO */
          <form onSubmit={onSubmit} id = "Formulario">
            <h3> ESCRIBE TÚ HISTORIA </h3>
            <div className="form-group">
            <label htmlFor="autor">Autor</label>
            <input type="text" className="form-control" id="Autor" value={user.name} readOnly   />
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                className="form-control"
                id="Titulo"
                value={form.titulo}
                onChange={(e) => updateForm({ titulo: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contenido">Tu Historia</label>
              <ReactQuill id="Historia" 
                value={form.contenido}
                onChange={(value) => updateForm({ contenido: value })}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoria">Categoría</label>
              <input
                type="text"
                className="form-control"
                id="Categoria"
                value={form.categoria}
                onChange={(e) => {
                  updateForm({ categoria: e.target.value });
                  handleCategoriesChange(e);
                }}
              />
              <div className="categories-container">
                {categories.map((category, index) => (
                  <span
                    className="category"
                    key={index}
                    onClick={() => handleCategoryClick(index)}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>


            {/* Componente de Tags en el formulario */}
            <TagsInput tags={tags} setTags={setTags} />

            
            {/* Cambié el tipo del botón Compartir de submit a button y agregué un controlador de eventos onClick */}
            <div className="form-group">
              <input
                type="button"
                value="Compartir"
                className="btn btn-primary"
                onClick={() => setPreview(true)}
              />
            </div>
          </form>
        </div>
    </div>
  );
}


// /* CODIGO GOOGLE SHEETS */ /* CODIGO GOOGLE SHEETS */
// const formulario = document.getElementById("formulario");
// const registro = document.getElementById("registro");
// const exito = document.getElementById("exito");


// formulario.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     /* ESCRIBIR FILAS */
//   try {
//     const respuesta = await fetch("https://sheet.best/api/sheets/7634bfae-4c78-4705-b1d6-430c929a77a2" , {
//       method: "POST",
//       mode: "cors" ,
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "Autor": formulario.Autor.value,
//         "Titulo": formulario.Titulo.value,
//         "Historia": formulario.Historia.value,
//         "Categoria": formulario.Categoria.value,
//         "Etiqueta": formulario.Etiqueta.value
//       })

//     });

//     const contenido = await respuesta.json();

//   } catch (error) {
//     console.log(error);
//   }

//   /* LEER FILA */
//   try {
//     const respuesta = await fetch("https://sheet.best/api/sheets/7634bfae-4c78-4705-b1d6-430c929a77a2" , {

//     });

//     const contenido = await respuesta.json();
    
//   } catch (error) {
//     console.log(error);
//   }


//   /* ELIMINAR FILA - ELIMINAR FILA */
//   try {
//     const respuesta = await fetch("https://sheet.best/api/sheets/7634bfae-4c78-4705-b1d6-430c929a77a2" , {
//       method: "DELETE",
      

//     });

//     const contenido = await respuesta.json();
    
//   } catch (error) {
//     console.log(error);
//   }

//   /* ACTUALIZAR - ACTUALIZAR */
//   try {
//     const respuesta = await fetch("https://sheet.best/api/sheets/7634bfae-4c78-4705-b1d6-430c929a77a2" , {
//       method: "PATCH",
//       mode: "cors" ,
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "Autor": formulario.Autor.value,
//         "Titulo": formulario.Titulo.value,
//         "Historia": formulario.Historia.value,
//         "Categoria": formulario.Categoria.value,
//         "Etiqueta": formulario.Etiqueta.value
//       })
//     });

//     registro.classList.remove("activo");
//     exito.classList.add("activo");
//   }  catch (error) {
//     console.log(error);
//   }
// });
