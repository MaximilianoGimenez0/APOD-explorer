import "./SurveyForm.css";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "../../i18n";
import { sendSurveyEmail } from "@/services/email";
import {
  validateSurveyForm,
  type SurveyFormData,
  type SurveyFormErrors,
} from "../../utils/validation";
import {
  FaPaperPlane,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const INITIAL_FORM_DATA: SurveyFormData = {
  nombre: "",
  apellido: "",
  fechaNacimiento: "",
  sexo: "",
  valoracion: "",
  email: "",
  comentario: "",
};

export default function SurveyForm() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState<SurveyFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<SurveyFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof SurveyFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleReset() {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  }

  // Manejo de la tecla Escape y bloqueo de scroll para el modal de éxito
  useEffect(() => {
    if (!showModal) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [showModal]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors = validateSurveyForm(formData, t);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await sendSurveyEmail(formData);
      console.log("SUCCESS!", response.status, response.text);
      setLoading(false);
      setShowModal(true);
      handleReset();
    } catch (err) {
      console.error("FAILED...", err);
      setLoading(false);
      alert(t("components.survey.errors.sendError"));
    }
  }

  return (
    <>
      <div className="survey-container">
        {loading &&
          typeof document !== "undefined" &&
          createPortal(
            <div className="loader-backdrop" role="status" aria-live="polite">
              <div className="apod-spinner"></div>
              <p>{t("components.survey.sending")}</p>
            </div>,
            document.body
          )}

        <p className="survey-title">{t("components.survey.title")}</p>

        <form className="survey-form" onSubmit={handleSubmit} noValidate>
          {/* Nombre y Apellido */}
          <div className="name-container">
            <div className="name-input form-group">
              <div className="input-label-error">
                <label htmlFor="nombre">
                  {t("components.survey.name")}{" "}
                  <span className="required-badge">*</span>
                </label>
                {errors.nombre && (
                  <p className="error" role="alert">
                    <FaExclamationCircle className="error-icon" />
                    <span>{errors.nombre}</span>
                  </p>
                )}
              </div>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className={errors.nombre ? "input-has-error" : ""}
                placeholder={t("components.survey.namePlaceholder")}
                value={formData.nombre}
                onChange={handleChange}
                aria-invalid={!!errors.nombre}
              />
            </div>

            <div className="name-input form-group">
              <div className="input-label-error">
                <label htmlFor="apellido">
                  {t("components.survey.lastName")}{" "}
                  <span className="required-badge">*</span>
                </label>
                {errors.apellido && (
                  <p className="error" role="alert">
                    <FaExclamationCircle className="error-icon" />
                    <span>{errors.apellido}</span>
                  </p>
                )}
              </div>
              <input
                type="text"
                id="apellido"
                name="apellido"
                className={errors.apellido ? "input-has-error" : ""}
                placeholder={t("components.survey.lastNamePlaceholder")}
                value={formData.apellido}
                onChange={handleChange}
                aria-invalid={!!errors.apellido}
              />
            </div>
          </div>

          {/* Fecha de Nacimiento */}
          <div className="form-group">
            <div className="input-label-error">
              <label htmlFor="fechaNacimiento">
                {t("components.survey.birthDate")}{" "}
                <span className="required-badge">*</span>
              </label>
              {errors.fechaNacimiento && (
                <p className="error" role="alert">
                  <FaExclamationCircle className="error-icon" />
                  <span>{errors.fechaNacimiento}</span>
                </p>
              )}
            </div>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              className={errors.fechaNacimiento ? "input-has-error" : ""}
              value={formData.fechaNacimiento}
              onChange={handleChange}
              aria-invalid={!!errors.fechaNacimiento}
            />
          </div>

          {/* Sexo (Segmented Radio Pills) */}
          <div className="form-group">
            <div className="input-label-error">
              <label>
                {t("components.survey.gender")}{" "}
                <span className="required-badge">*</span>
              </label>
              {errors.sexo && (
                <p className="error" role="alert">
                  <FaExclamationCircle className="error-icon" />
                  <span>{errors.sexo}</span>
                </p>
              )}
            </div>
            <div className="gender-options-grid" role="radiogroup">
              <label
                htmlFor="masculino"
                className={`gender-pill ${
                  formData.sexo === "Masculino" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  id="masculino"
                  name="sexo"
                  value="Masculino"
                  checked={formData.sexo === "Masculino"}
                  onChange={handleChange}
                />
                <span>{t("components.survey.genderMale")}</span>
              </label>

              <label
                htmlFor="femenino"
                className={`gender-pill ${
                  formData.sexo === "Femenino" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  id="femenino"
                  name="sexo"
                  value="Femenino"
                  checked={formData.sexo === "Femenino"}
                  onChange={handleChange}
                />
                <span>{t("components.survey.genderFemale")}</span>
              </label>

              <label
                htmlFor="otro"
                className={`gender-pill ${
                  formData.sexo === "Otro" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  id="otro"
                  name="sexo"
                  value="Otro"
                  checked={formData.sexo === "Otro"}
                  onChange={handleChange}
                />
                <span>{t("components.survey.genderOther")}</span>
              </label>
            </div>
          </div>

          {/* Valoración */}
          <div className="form-group">
            <div className="input-label-error">
              <label htmlFor="valoracion">
                {t("components.survey.rating")}{" "}
                <span className="required-badge">*</span>
              </label>
              {errors.valoracion && (
                <p className="error" role="alert">
                  <FaExclamationCircle className="error-icon" />
                  <span>{errors.valoracion}</span>
                </p>
              )}
            </div>
            <select
              name="valoracion"
              id="valoracion"
              className={errors.valoracion ? "input-has-error" : ""}
              value={formData.valoracion}
              onChange={handleChange}
              aria-invalid={!!errors.valoracion}
            >
              <option value="">{t("components.survey.ratingSelect")}</option>
              <option value="Lamentable">
                {t("components.survey.rating1")}
              </option>
              <option value="Mala">{t("components.survey.rating2")}</option>
              <option value="Podría ser mejor">
                {t("components.survey.rating3")}
              </option>
              <option value="Cumple con mis expectativas">
                {t("components.survey.rating4")}
              </option>
              <option value="Me encantó">
                {t("components.survey.rating5")}
              </option>
            </select>
          </div>

          {/* Email */}
          <div className="form-group">
            <div className="input-label-error">
              <label htmlFor="email">
                {t("components.survey.email")}{" "}
                <span className="required-badge">*</span>
              </label>
              {errors.email && (
                <p className="error" role="alert">
                  <FaExclamationCircle className="error-icon" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className={errors.email ? "input-has-error" : ""}
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              aria-invalid={!!errors.email}
            />
          </div>

          {/* Comentario */}
          <div className="form-group">
            <label htmlFor="comentario">{t("components.survey.comment")}</label>
            <textarea
              id="comentario"
              name="comentario"
              rows={3}
              value={formData.comentario}
              onChange={handleChange}
              placeholder={t("components.survey.comment")}
            ></textarea>
          </div>

          {/* Botones */}
          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              <FaPaperPlane />
              <span>{t("components.survey.submit")}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
            >
              <FaTimes />
              <span>{t("components.survey.cancel")}</span>
            </button>
          </div>
        </form>
      </div>

      {showModal &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false);
              }
            }}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal-close-icon-btn"
                onClick={() => setShowModal(false)}
                aria-label={t("components.survey.close")}
                title={`${t("components.survey.close")} (Esc)`}
              >
                <FaTimes />
              </button>
              <FaCheckCircle className="modal-icon-success" />
              <p>{t("components.survey.success")}</p>
              <button
                type="button"
                className="modal-action-btn"
                onClick={() => setShowModal(false)}
                autoFocus
              >
                {t("components.survey.close")}
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
