import type { TranslationKey } from "../i18n/types";

export interface SurveyFormData {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  sexo: string;
  valoracion: string;
  email: string;
  comentario: string;
}

export type SurveyFormErrors = Partial<Record<keyof SurveyFormData, string>>;

export type SurveyErrorKey =
  | "components.survey.errors.nameRequired"
  | "components.survey.errors.nameLetters"
  | "components.survey.errors.lastNameRequired"
  | "components.survey.errors.lastNameLetters"
  | "components.survey.errors.birthDateRequired"
  | "components.survey.errors.birthDateInvalid"
  | "components.survey.errors.genderRequired"
  | "components.survey.errors.ratingRequired"
  | "components.survey.errors.emailRequired"
  | "components.survey.errors.emailInvalid";

export type TranslatorFn = (key: TranslationKey) => string;

export const VALIDATION_REGEX = {
  LETTERS_ONLY: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/,
  // Simplified email pattern avoiding strict RFC 5322 complexity
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export function isEmpty(value: string | undefined | null): boolean {
  return value === undefined || value === null || value.trim().length === 0;
}

export function isValidLettersOnly(value: string): boolean {
  if (isEmpty(value)) return false;
  return VALIDATION_REGEX.LETTERS_ONLY.test(value.trim());
}

export function isValidEmail(value: string): boolean {
  if (isEmpty(value)) return false;
  return VALIDATION_REGEX.EMAIL.test(value.trim());
}

export function isValidBirthDate(
  dateStr: string,
  minYear = 1900
): { isValid: boolean; errorKey?: SurveyErrorKey } {
  if (isEmpty(dateStr)) {
    return { isValid: false, errorKey: "components.survey.errors.birthDateRequired" };
  }

  const selectedDate = new Date(dateStr);
  const minDate = new Date(`${minYear}-01-01`);
  const now = new Date();

  if (isNaN(selectedDate.getTime()) || selectedDate < minDate || selectedDate > now) {
    return { isValid: false, errorKey: "components.survey.errors.birthDateInvalid" };
  }

  return { isValid: true };
}

export function validateName(value: string): SurveyErrorKey | null {
  if (isEmpty(value)) {
    return "components.survey.errors.nameRequired";
  }
  if (!isValidLettersOnly(value)) {
    return "components.survey.errors.nameLetters";
  }
  return null;
}

export function validateLastName(value: string): SurveyErrorKey | null {
  if (isEmpty(value)) {
    return "components.survey.errors.lastNameRequired";
  }
  if (!isValidLettersOnly(value)) {
    return "components.survey.errors.lastNameLetters";
  }
  return null;
}

export function validateBirthDateField(value: string): SurveyErrorKey | null {
  const result = isValidBirthDate(value);
  return result.isValid ? null : (result.errorKey || "components.survey.errors.birthDateInvalid");
}

export function validateGender(value: string): SurveyErrorKey | null {
  if (isEmpty(value)) {
    return "components.survey.errors.genderRequired";
  }
  return null;
}

export function validateRating(value: string): SurveyErrorKey | null {
  if (isEmpty(value)) {
    return "components.survey.errors.ratingRequired";
  }
  return null;
}

export function validateEmailField(value: string): SurveyErrorKey | null {
  if (isEmpty(value)) {
    return "components.survey.errors.emailRequired";
  }
  if (!isValidEmail(value)) {
    return "components.survey.errors.emailInvalid";
  }
  return null;
}

export function validateSurveyField(
  fieldName: keyof SurveyFormData,
  value: string,
  t: TranslatorFn
): string | undefined {
  let errorKey: SurveyErrorKey | null = null;

  switch (fieldName) {
    case "nombre":
      errorKey = validateName(value);
      break;
    case "apellido":
      errorKey = validateLastName(value);
      break;
    case "fechaNacimiento":
      errorKey = validateBirthDateField(value);
      break;
    case "sexo":
      errorKey = validateGender(value);
      break;
    case "valoracion":
      errorKey = validateRating(value);
      break;
    case "email":
      errorKey = validateEmailField(value);
      break;
    default:
      break;
  }

  return errorKey ? t(errorKey) : undefined;
}

export function validateSurveyForm(
  formData: SurveyFormData,
  t: TranslatorFn
): SurveyFormErrors {
  const errors: SurveyFormErrors = {};

  const nameError = validateSurveyField("nombre", formData.nombre, t);
  if (nameError) errors.nombre = nameError;

  const lastNameError = validateSurveyField("apellido", formData.apellido, t);
  if (lastNameError) errors.apellido = lastNameError;

  const birthDateError = validateSurveyField("fechaNacimiento", formData.fechaNacimiento, t);
  if (birthDateError) errors.fechaNacimiento = birthDateError;

  const genderError = validateSurveyField("sexo", formData.sexo, t);
  if (genderError) errors.sexo = genderError;

  const ratingError = validateSurveyField("valoracion", formData.valoracion, t);
  if (ratingError) errors.valoracion = ratingError;

  const emailError = validateSurveyField("email", formData.email, t);
  if (emailError) errors.email = emailError;

  return errors;
}
