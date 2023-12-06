import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Importa el hook useAuth0 de Auth0
import { useParams, Link } from "react-router-dom";
import './perfiluser.css';
const UserProfile = () => {
  // Usa el hook useAuth0 para acceder a la información del usuario y a las funciones de autenticación proporcionadas por Auth0
  const { user, isAuthenticated } = useAuth0();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    bio: "",
    interests: "",
    socialLinks: {
      instagram: "",
      facebook: "",
      x: ""
    },
  });
  const [message, setMessage] = useState("");
  // Usa el hook useEffect para actualizar el estado del formulario cuando cambia el objeto user
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prevState) => ({
        ...prevState,
        email: user.email,
      }));
    }
  }, [isAuthenticated, user]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "instagram" || name === "facebook" || name === "x") {
      setFormData((prevState) => ({
        ...prevState,
        socialLinks: {
          ...prevState.socialLinks,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSaveChanges = () => {
    // Aquí puedes agregar la lógica para guardar los cambios en el perfil del usuario
    // Por ejemplo, puedes usar un arreglo para almacenar temporalmente la información del usuario
    let tempData = [];
    tempData.push(formData);
    console.log(tempData); // Muestra la información del usuario almacenada en el arreglo
    setMessage("Cambios guardados correctamente");
    setEditMode(false);
  };
  return (
    <div>
      {/* Renderiza condicionalmente la información del usuario solo si el usuario ha iniciado sesión */}
      {isAuthenticated ? (
        <div>
          {/* Muestra la foto y el nombre del usuario */}
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          {editMode ? (
            <div>
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <br />
              <label htmlFor="bio">Biografía:</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
              <br />
              <label htmlFor="interests">Intereses:</label>
              <input
                type="text"
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
              />
              <br />
              <label htmlFor="instagram">Enlace a Instagram:</label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.socialLinks.instagram}
                onChange={handleInputChange}
              />
              <br />
              <label htmlFor="facebook">Enlace a Facebook:</label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                value={formData.socialLinks.facebook}
                onChange={handleInputChange}
              />
              <br />
              <label htmlFor="x">Enlace a X:</label>
              <input
                type="text"
                id="x"
                name="x"
                value={formData.socialLinks.x}
                onChange={handleInputChange}
              />
              <br />
              <button onClick={handleSaveChanges}>Guardar cambios</button>

              
              <Link className="btn btn-link btn-volver" to="/Blogs/">Volver</Link>
            </div>
          ) : (
            <>
            <div className="boxx">
              Correo electrónico: {formData.email}
            </div>
            
            <div className="boxb">
              Biografía: {formData.bio}
            </div>
            <div className="box">
              Intereses: {formData.interests}
            </div>
            <div className="box">
              Instagram: {formData.socialLinks.instagram}
            </div>
            <div className="box">
              Facebook: {formData.socialLinks.facebook}
            </div>
            <div className="box">
              X: {formData.socialLinks.x}
            </div>
            <div>
              <button onClick={() => setEditMode(true)}>Editar perfil</button>
                <Link className="btn btn-link btn-volver" to="/blogs/">Volver</Link>
            </div>
            </>
          )}
          {message && <p>{message}</p>}
        </div>
      ) : (
        // Muestra un mensaje para que los usuarios inicien sesión si no han iniciado sesión
        <p>Inicia sesión para ver tu perfil</p>
      )}
    </div>
  );
};

export default UserProfile;

