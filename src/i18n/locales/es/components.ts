export const components = {
  filters: {
    title: "Explorar Archivo",
    year: "Año",
    month: "Mes",
    all: "Todos",
    filter: "Filtrar",
    search: "Buscar",
    random: "Descubrimiento Aleatorio",
    apply: "Aplicar",
    or: "O"
  },
  apodCard: {
    readMore: "Leer más",
    exploreMystery: "Explorar misterio"
  },
  apodControls: {
    removeFromFavs: "Quitar de favoritos",
    addToFavs: "Añadir a favoritos",
    saved: "Guardado",
    save: "Guardar",
    share: "Compartir"
  },
  survey: {
    title: "Encuesta",
    sending: "Enviando...",
    name: "Nombre:",
    lastName: "Apellido:",
    birthDate: "Fecha de Nacimiento:",
    gender: "Sexo:",
    genderMale: "Masculino",
    genderFemale: "Femenino",
    genderOther: "Otro",
    rating: "¿Qué te pareció la página?",
    ratingSelect: "Seleccione una opción",
    rating1: "Lamentable",
    rating2: "Mala",
    rating3: "Podría ser mejor",
    rating4: "Cumple con mis expectativas",
    rating5: "Me encantó",
    email: "Email:",
    comment: "Comentario:",
    submit: "Enviar",
    cancel: "Cancelar",
    success: "Formulario enviado ✅",
    close: "Cerrar",
    errors: {
      nameRequired: "El nombre es obligatorio.",
      nameLetters: "Solo debe contener letras.",
      lastNameRequired: "El apellido es obligatorio.",
      lastNameLetters: "Solo debe contener letras.",
      birthDateRequired: "Seleccione su fecha de nacimiento.",
      birthDateInvalid: "Seleccione una fecha válida.",
      genderRequired: "Seleccione una opción.",
      ratingRequired: "Seleccione una valoración.",
      emailRequired: "El email es obligatorio.",
      emailInvalid: "El email no es válido.",
      sendError: "Error al enviar el correo."
    }
  }
} as const;
