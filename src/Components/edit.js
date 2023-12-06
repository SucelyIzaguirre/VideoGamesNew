/*El siguiente código servirá como componente de edición para nuestros registros. Utilizará un
 diseño similar al componente create y eventualmente enviará un comando de actualización a nuestro
  servidor. 
  
  El componente recupera el registro existente de la base de datos utilizando el ID proporcionado en el parámetro de ruta y 
  muestra un formulario con los campos precargados con los valores actuales del registro. Cuando el usuario envía el formulario,
   el componente envía una solicitud PATCH a la ruta /record/:id del servidor para actualizar el registro en la base de datos
  */
   import React, { useState, useEffect } from "react";
   import { useParams, useNavigate } from "react-router";
   
   import './edit.css';
   
   export default function Edit() {
     const [form, setForm] = useState({
       titulo: "",
       contenido: "",
       categoria: "",
       fechaCreacion: "",
       fechaActualizacion: ""
     });
     const params = useParams();
     const navigate = useNavigate();
   
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
           navigate("/");
           return;
         }
   
         setForm(blog);
       }
   
       fetchData();
   
       return;
     }, [params.id, navigate]);
   
     // These methods will update the state properties.
     function updateForm(value) {
       return setForm((prev) => {
         return { ...prev, ...value };
       });
     }
   
     async function onSubmit(e) {
       e.preventDefault();
       const editedBlog = {
         titulo: form.titulo,
         contenido: form.contenido,
         categoria: form.categoria,
         fechaCreacion: form.fechaCreacion,
         fechaActualizacion: form.fechaActualizacion
       };
   
       // This will send a post request to update the data in the database.
       await fetch(`http://localhost:3000/Blog/${params.id}`, {
         method: "PATCH",
         body: JSON.stringify(editedBlog),
         headers: {
           'Content-Type': 'application/json'
         },
       });
       
       navigate("/blogs/", { state: { message: "¡Blog satisfactoriamente actualizado!" } });
     }
   
     // This following section will display the table with the records of individuals.
     return (
       <div className="body">
         <h3>Edita tú Blog</h3>
         <form onSubmit={onSubmit}>
           <div className="form-group">
             <label>Titulo:</label>
             <input
               type="text"
               className="form-control"
               value={form.titulo}
               onChange={(e) => updateForm({ titulo: e.target.value })}
             />
           </div>
           <div className="form-group">
             <label>Contenido:</label>
             {/* Increase the number of rows to make the textarea taller */}
             <textarea
               rows={10} // Change this value to adjust the height of the textarea
               className="form-control"
               value={form.contenido}
               onChange={(e) => updateForm({ contenido: e.target.value })}
             />
           </div>
           <div className="form-group">
             <label>Categoria:</label>
             <input
               type="text"
               className="form-control"
               value={form.categoria}
               onChange={(e) => updateForm({ categoria: e.target.value })}
             />
           </div>
           <br />
           <div className="form-group">
             {/* Updated button text for better readability */}
             <input type="submit" value="Editar Blog" className="btn btn-primary" />
           </div>
         </form>
       </div>
       
     );
   }
   