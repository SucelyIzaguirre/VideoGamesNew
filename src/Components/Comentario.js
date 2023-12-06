import { useNavigate } from "react-router";
import React, { useState } from "react";
import "./comentario.css";

function Comentario() {
  const [form, setForm] = useState({
    autorComentario: "",
    contenidoComentario: "",
    fechaCreacionComentario: new Date().toISOString(),
    fechaActualizacionComentario: new Date().toISOString(),
  });
  const [comentarios, setComentarios] = useState([]);
  const navigate = useNavigate();
  const [respuesta, setRespuesta] = useState({
    comentarioId: null,
    autorRespuesta: "",
    contenidoRespuesta: "",
  });
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  function toggleOrden() {
    setOrdenAscendente((prevOrden) => !prevOrden);
  }

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!form.autorComentario || !form.contenidoComentario) {
      alert("Por favor completa todos los campos obligatorios (autor y contenido)");
      return;
    }

    const fechaCreacionComentario = new Date().toISOString();
    const newComentario = {
      autorComentario: form.autorComentario,
      contenidoComentario: form.contenidoComentario,
      fechaCreacionComentario: fechaCreacionComentario,
    };

    try {
      await fetch("http://localhost:3000/Blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComentario),
      });

      alert("¡Tu comentario ha sido publicado exitosamente!");
      navigate("./");
    } catch (error) {
      alert("Ocurrió un error al publicar tu comentario. Por favor intenta nuevamente.");
      console.error(error);
      return;
    }

    setComentarios((prevComentarios) => [...prevComentarios, newComentario]);
    setForm({
      autorComentario: "",
      contenidoComentario: "",
    });
  }

  function handleResponderClick(comentarioId) {
    setRespuesta((prevRespuesta) => ({
      ...prevRespuesta,
      comentarioId,
    }));
  }

  function handleCancelarClick() {
    setRespuesta({
      comentarioId: null,
      autorRespuesta: "",
      contenidoRespuesta: "",
    });
  }

  async function handleResponderSubmit(e, comentarioId) {
    e.preventDefault();

    if (!respuesta.autorRespuesta || !respuesta.contenidoRespuesta) {
      alert("Por favor completa todos los campos obligatorios (autor y contenido)");
      return;
    }

    const fechaCreacionRespuesta = new Date().toISOString();
    const newRespuesta = {
      autorRespuesta: respuesta.autorRespuesta,
      contenidoRespuesta: respuesta.contenidoRespuesta,
      fechaCreacionRespuesta,
      comentarioId,
    };

    try {
      await fetch(`http://localhost:3000/Blog/${comentarioId}/respuestas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRespuesta),
      });

      alert("¡Tu respuesta ha sido publicada exitosamente!");

      setRespuesta({
        comentarioId: null,
        autorRespuesta: "",
        contenidoRespuesta: "",
      });

      setComentarios((prevComentarios) =>
        prevComentarios.map((comentario) => {
          if (comentario.fechaCreacionComentario === comentarioId) {
            return {
              ...comentario,
              respuestas: [...(comentario.respuestas || []), newRespuesta],
            };
          }
          return comentario;
        })
      );
      
    } catch (error) {
      alert("Ocurrió un error al publicar tu respuesta. Por favor intenta nuevamente.");
      console.error(error);
      return;
    }
  }

  function updateRespuesta(value) {
    setRespuesta((prev) => ({
      ...prev,
      ...value,
    }));
  }

  return (
    <div className="contenedor">
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Comentarios</h3>

      {/* Botón para cambiar el orden */}
      <button onClick={toggleOrden} className="btn-orden">
        {ordenAscendente ? "Ordenar Descendente" : "Ordenar Ascendente"}
      </button>

      <div className="caja-comentarios">
        {comentarios
          .slice()
          .sort((a, b) => {
            const dateA = new Date(a.fechaCreacionComentario);
            const dateB = new Date(b.fechaCreacionComentario);
            return ordenAscendente ? dateA - dateB : dateB - dateA;
          })
          .map((comentario) => (
            <div className="comentario" key={comentario.fechaCreacionComentario}>
              <div className="info-usuario">
                <div className="foto-usuario"></div>
                <p>{comentario.autorComentario}</p>
              </div>
              <p>{comentario.contenidoComentario}</p>
              <p className="fecha-publicacion">
                Publicado el: {new Date(comentario.fechaCreacionComentario).toLocaleString()}
              </p>
              <button onClick={() => handleResponderClick(comentario.fechaCreacionComentario)}>
                Responder
              </button>
              
              {respuesta.comentarioId === comentario.fechaCreacionComentario && (
                <div className="respuesta-form">
                  <form onSubmit={(e) => handleResponderSubmit(e, comentario.fechaCreacionComentario)}>
                    <div className="autor-respuesta">
                      <label htmlFor="autor-respuesta">Autor</label>
                      <input
                        type="text"
                        className="form-control"
                        id="autor-respuesta"
                        value={respuesta.autorRespuesta}
                        onChange={(e) => updateRespuesta({ autorRespuesta: e.target.value })}
                      />
                    </div>
                    <div className="contenido-respuesta">
                      <label htmlFor="contenido-respuesta">Contenido</label>
                      <textarea
                        className="form-control"
                        id="contenido-respuesta"
                        rows="3"
                        value={respuesta.contenidoRespuesta}
                        onChange={(e) => updateRespuesta({ contenidoRespuesta: e.target.value })}
                        placeholder="Escribe tu respuesta"
                      ></textarea>
                    </div>
                    <div className="botones-respuesta">
                      <button type="submit" className="btn btn-primary">
                        Publicar
                      </button>
                      <button type="button" onClick={handleCancelarClick}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Mostrar las respuestas del comentario */}
              {comentario.respuestas && comentario.respuestas.map((respuesta) => (
                <>
                  <div className="linea-respuesta"></div>
                  <div className="respuesta" key={respuesta.fechaCreacionRespuesta}>
                    <div className="info-usuario">
                      <div className="foto-usuario"></div>
                      <p>{respuesta.autorRespuesta}</p>
                    </div>
                    <p>{respuesta.contenidoRespuesta}</p>
                    <p className="fecha-publicacion">
                      Publicado el: {new Date(respuesta.fechaCreacionRespuesta).toLocaleString()}
                    </p>
                  </div>
                </>
              ))}
            </div>
          ))}
      </div>

      <form onSubmit={onSubmit}>
        <div className="autor-comentario">
          <label htmlFor="autor">Autor</label>
          <input
            type="text"
            className="form-control"
            id="autor"
            value={form.autorComentario}
            onChange={(e) => updateForm({ autorComentario: e.target.value })}
          />
        </div>
        <div className="contenido-comentario">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            className="form-control"
            id="contenido"
            rows="3"
            value={form.contenidoComentario}
            onChange={(e) => updateForm({ contenidoComentario: e.target.value })}
            placeholder="Escribe tu comentario"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Publicar
        </button>
      </form>
    </div>
  );
}

export default Comentario;
