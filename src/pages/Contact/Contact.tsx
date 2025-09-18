import "./Contaxt.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Map from "../../components/Map/Map";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

type FormData = {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  sexo: string;
  valoracion: string;
  email: string;
  comentario: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

export default function () {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    sexo: "",
    valoracion: "",
    email: "",
    comentario: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validate(): Errors {
    const newErrors: Errors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.apellido.trim())
      newErrors.apellido = "El apellido es obligatorio.";
    if (!formData.fechaNacimiento)
      newErrors.fechaNacimiento = "Seleccione su fecha de nacimiento.";
    if (!formData.sexo) newErrors.sexo = "Seleccione una opción.";
    if (!formData.valoracion)
      newErrors.valoracion = "Seleccione una valoración.";
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido.";
    }

    return newErrors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Datos enviados:", formData);
    setShowModal(true); // mostramos el modal
  }

  return (
    <>
      <Header />
      <div className="main">
        <div className="presentation-container">
          <div className="contact-description-container">
            <h2 className="contact-title">¿Qué es descubri-2?</h2>
            <p className="contact-text">
              Soy Maximiliano Giménez, estudiante de Ingeniería en Informática
              en la UNAJ. Esta página tiene como objetivo facilitar el
              descubrimiento de contenido relacionado con el espacio y la
              ciencia. Gracias a React y la API APOD de la NASA, permite
              explorar imágenes y videos diarios del cosmos. Cuenta con búsqueda
              y filtros, validaciones en los formularios, un sistema de
              favoritos y un historial, para que puedas guardar y volver a
              descubrir lo que más te interese. Acá vas a poder aprender sobre
              nuevos planetas, cometas y eventos fascinantes como eclipses y
              lanzamientos espaciales.
            </p>
          </div>

          <div className="map-container">
            <p className="map-title">¿Dónde me podes encontrar?</p>
            <div id="map">
              <Map></Map>
            </div>
            <div className="map-description">
              <p>
                Podés encontrarme en la Universidad Nacional Arturo Jauretche,
                un espacio que se convirtió en mi segundo hogar desde que
                comencé la carrera. Es acá donde nacen muchas de mis ideas y
                proyectos, donde enfrento desafíos que me impulsan a mejorar
                cada día, y donde me rodeo de personas que, al igual que yo,
                buscan crecer y aportar al mundo de la tecnología y la ciencia.
                Estar en este lugar significa más que estudiar: significa
                descubrir, compartir y construir el futuro paso a paso.
              </p>
            </div>
          </div>

          <div className="survey-container">
            <p className="survey-title">Encuesta</p>

            <form className="survey-form" onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className="form-group name-container">
                <div className="name-input">
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && <p className="error">{errors.nombre}</p>}
                </div>
                <div className="name-input">
                  <label htmlFor="apellido">Apellido:</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                  {errors.apellido && (
                    <p className="error">{errors.apellido}</p>
                  )}
                </div>
              </div>

              {/* Fecha de Nacimiento */}
              <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                />
                {errors.fechaNacimiento && (
                  <p className="error">{errors.fechaNacimiento}</p>
                )}
              </div>

              {/* Sexo */}
              <div className="form-group">
                <label>Sexo:</label>
                <div>
                  <input
                    type="radio"
                    id="masculino"
                    name="sexo"
                    value="Masculino"
                    checked={formData.sexo === "Masculino"}
                    onChange={handleChange}
                  />
                  <label htmlFor="masculino">Masculino</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="femenino"
                    name="sexo"
                    value="Femenino"
                    checked={formData.sexo === "Femenino"}
                    onChange={handleChange}
                  />
                  <label htmlFor="femenino">Femenino</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="otro"
                    name="sexo"
                    value="Otro"
                    checked={formData.sexo === "Otro"}
                    onChange={handleChange}
                  />
                  <label htmlFor="otro">Otro</label>
                </div>
                {errors.sexo && <p className="error">{errors.sexo}</p>}
              </div>

              {/* Valoración */}
              <div className="form-group">
                <label>¿Qué te pareció la página?</label>
                <select
                  name="valoracion"
                  id="valoracion"
                  value={formData.valoracion}
                  onChange={handleChange}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Lamentable">Lamentable</option>
                  <option value="Mala">Mala</option>
                  <option value="Podría ser mejor">Podría ser mejor</option>
                  <option value="Cumple con mis expectativas">
                    Cumple con mis expectativas
                  </option>
                  <option value="Me encantó">Me encantó</option>
                </select>
                {errors.valoracion && (
                  <p className="error">{errors.valoracion}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" *"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              {/* Comentario */}
              <div className="form-group">
                <label htmlFor="comentario">Comentario:</label>
                <textarea
                  id="comentario"
                  name="comentario"
                  rows={4}
                  value={formData.comentario}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Botones */}
              <div className="form-buttons">
                <button type="submit">Enviar</button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      nombre: "",
                      apellido: "",
                      fechaNacimiento: "",
                      sexo: "",
                      valoracion: "",
                      email: "",
                      comentario: "",
                    });
                    setErrors({});
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>Formulario enviado ✅</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
