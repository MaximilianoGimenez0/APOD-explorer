import "./SurveyForm.css";
import emailjs from "emailjs-com";
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

export default function SurveyForm() {
  const [loading, setLoading] = useState(false);

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

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(formData.nombre)) {
      newErrors.nombre = "Solo debe contener letras.";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(formData.apellido)) {
      newErrors.apellido = "Solo debe contener letras.";
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "Seleccione su fecha de nacimiento.";
    } else {
      const min = new Date("1900-01-01");
      const selectedDate = new Date(formData.fechaNacimiento);
      if (selectedDate < min) {
        newErrors.fechaNacimiento = "Seleccione una fecha válida.";
      }
    }

    if (!formData.sexo) {
      newErrors.sexo = "Seleccione una opción.";
    }

    if (!formData.valoracion) {
      newErrors.valoracion = "Seleccione una valoración.";
    }

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

    setLoading(true);
    emailjs
      .send(
        "service_16tpw2s", // service-id
        "template_vf3fd43", // template-id
        formData, // data
        "3UIwFZOLxocMHn5vR" // public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setLoading(false);
          setShowModal(true);

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
        },
        (err) => {
          console.error("FAILED...", err);
          setLoading(false);
          alert("Error al enviar el correo.");
        }
      );
  }

  return (
    <>
      <div>
        {loading && (
          <div className="loader-backdrop">
            <div className="apod-spinner"></div>
            <p>Enviando...</p>
          </div>
        )}

        <p className="survey-title">Encuesta</p>

        <form className="survey-form" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="form-group name-container">
            <div className="name-input">
              <div className="input-label-error">
                <label htmlFor="nombre">Nombre:</label>
                {errors.nombre && <p className={"error"}>{errors.nombre}</p>}
              </div>
              <input
                placeholder=" *"
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="name-input">
              <div className="input-label-error">
                <label htmlFor="apellido">Apellido:</label>
                {errors.apellido && <p className="error">{errors.apellido}</p>}
              </div>
              <input
                placeholder=" *"
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Fecha de Nacimiento */}
          <div className="form-group">
            <div className="input-label-error">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
              {errors.fechaNacimiento && (
                <p className="error">{errors.fechaNacimiento}</p>
              )}
            </div>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
          </div>

          {/* Sexo */}
          <div className="form-group">
            <div className="input-label-error">
              <label>Sexo:</label>
              {errors.sexo && <p className="error">{errors.sexo}</p>}
            </div>
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
          </div>

          {/* Valoración */}
          <div className="form-group">
            <div className="input-label-error">
              <label>¿Qué te pareció la página?</label>
              {errors.valoracion && (
                <p className="error">{errors.valoracion}</p>
              )}
            </div>
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
          </div>

          {/* Email */}
          <div className="form-group">
            <div className="input-label-error">
              <label htmlFor="email">Email:</label>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" *"
            />
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

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>Formulario enviado ✅</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}
