import "./SurveyForm.css";
import emailjs from "emailjs-com";
import { useState } from "react";
import { useTranslation } from "../../i18n";

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
  const { t } = useTranslation();

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
      newErrors.nombre = t('components.survey.errors.nameRequired');
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(formData.nombre)) {
      newErrors.nombre = t('components.survey.errors.nameLetters');
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = t('components.survey.errors.lastNameRequired');
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(formData.apellido)) {
      newErrors.apellido = t('components.survey.errors.lastNameLetters');
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = t('components.survey.errors.birthDateRequired');
    } else {
      const min = new Date("1900-01-01");
      const selectedDate = new Date(formData.fechaNacimiento);
      if (selectedDate < min) {
        newErrors.fechaNacimiento = t('components.survey.errors.birthDateInvalid');
      }
    }

    if (!formData.sexo) {
      newErrors.sexo = t('components.survey.errors.genderRequired');
    }

    if (!formData.valoracion) {
      newErrors.valoracion = t('components.survey.errors.ratingRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('components.survey.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('components.survey.errors.emailInvalid');
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
          alert(t('components.survey.errors.sendError'));
        }
      );
  }

  return (
    <>
      <div>
        {loading && (
          <div className="loader-backdrop">
            <div className="apod-spinner"></div>
            <p>{t('components.survey.sending')}</p>
          </div>
        )}

        <p className="survey-title">{t('components.survey.title')}</p>

        <form className="survey-form" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="form-group name-container">
            <div className="name-input">
              <div className="input-label-error">
                <label htmlFor="nombre">{t('components.survey.name')}</label>
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
                <label htmlFor="apellido">{t('components.survey.lastName')}</label>
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
              <label htmlFor="fechaNacimiento">{t('components.survey.birthDate')}</label>
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
              <label>{t('components.survey.gender')}</label>
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
              <label htmlFor="masculino">{t('components.survey.genderMale')}</label>
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
              <label htmlFor="femenino">{t('components.survey.genderFemale')}</label>
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
              <label htmlFor="otro">{t('components.survey.genderOther')}</label>
            </div>
          </div>

          {/* Valoración */}
          <div className="form-group">
            <div className="input-label-error">
              <label>{t('components.survey.rating')}</label>
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
              <option value="">{t('components.survey.ratingSelect')}</option>
              <option value="Lamentable">{t('components.survey.rating1')}</option>
              <option value="Mala">{t('components.survey.rating2')}</option>
              <option value="Podría ser mejor">{t('components.survey.rating3')}</option>
              <option value="Cumple con mis expectativas">
                {t('components.survey.rating4')}
              </option>
              <option value="Me encantó">{t('components.survey.rating5')}</option>
            </select>
          </div>

          {/* Email */}
          <div className="form-group">
            <div className="input-label-error">
              <label htmlFor="email">{t('components.survey.email')}</label>
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
            <label htmlFor="comentario">{t('components.survey.comment')}</label>
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
            <button type="submit">{t('components.survey.submit')}</button>
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
              {t('components.survey.cancel')}
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>{t('components.survey.success')}</p>
            <button onClick={() => setShowModal(false)}>{t('components.survey.close')}</button>
          </div>
        </div>
      )}
    </>
  );
}
