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
    namePlaceholder: "Nombre",
    lastName: "Apellido:",
    lastNamePlaceholder: "Apellido",
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
  },
  errorFallback: {
    defaultTitle: "Señales Perdidas en el Cosmos",
    timeoutTitle: "Tiempo de Espera Agotado (10s)",
    notFoundTitle: "Descubrimiento No Encontrado (404)",
    forbiddenTitle: "Acceso No Autorizado (403)",
    defaultMessage: "Ocurrió un problema de comunicación al conectar con los servidores de la NASA.",
    timeoutMessage: "La API de la NASA tardó más de 10 segundos en responder. Es posible que el servicio esté experimentando una sobrecarga temporal.",
    notFoundMessage: "No se encontraron imágenes ni registros astronómicos para los criterios seleccionados en el archivo de la NASA.",
    forbiddenMessage: "La clave de API de la NASA es inválida o no tiene permisos. Verificá la variable VITE_API_KEY en tu archivo .env.",
    reloadCta: "Recargar página",
    retryCta: "Reintentar conexión",
    statusTimeout: "TIMEOUT (10s)",
    statusNotFound: "ERROR 404",
    statusForbidden: "ERROR 403",
    statusError: "ERROR DE SERVICIO",
    hint: "Podés intentar recargar la página o volver a realizar la búsqueda en unos momentos."
  }
} as const;

