export const components = {
  filters: {
    title: "Explore Archive",
    year: "Year",
    month: "Month",
    all: "All",
    filter: "Filter",
    search: "Search",
    random: "Random Discovery",
    apply: "Apply",
    or: "OR"
  },
  apodCard: {
    readMore: "Read more",
    exploreMystery: "Explore mystery"
  },
  apodControls: {
    removeFromFavs: "Remove from favorites",
    addToFavs: "Add to favorites",
    saved: "Saved",
    save: "Save",
    share: "Share"
  },
  survey: {
    title: "Survey",
    sending: "Sending...",
    name: "Name:",
    namePlaceholder: "Name",
    lastName: "Last Name:",
    lastNamePlaceholder: "Last Name",
    birthDate: "Date of Birth:",
    gender: "Gender:",
    genderMale: "Male",
    genderFemale: "Female",
    genderOther: "Other",
    rating: "What did you think of the page?",
    ratingSelect: "Select an option",
    rating1: "Terrible",
    rating2: "Bad",
    rating3: "Could be better",
    rating4: "Meets my expectations",
    rating5: "Loved it",
    email: "Email:",
    comment: "Comment:",
    submit: "Submit",
    cancel: "Cancel",
    success: "Form sent ✅",
    close: "Close",
    errors: {
      nameRequired: "Name is required.",
      nameLetters: "Must contain only letters.",
      lastNameRequired: "Last name is required.",
      lastNameLetters: "Must contain only letters.",
      birthDateRequired: "Select your date of birth.",
      birthDateInvalid: "Select a valid date.",
      genderRequired: "Select an option.",
      ratingRequired: "Select a rating.",
      emailRequired: "Email is required.",
      emailInvalid: "Email is invalid.",
      sendError: "Error sending email."
    }
  },
  errorFallback: {
    defaultTitle: "Signals Lost in the Cosmos",
    timeoutTitle: "Request Timeout (10s)",
    notFoundTitle: "Discovery Not Found (404)",
    forbiddenTitle: "Unauthorized Access (403)",
    defaultMessage: "A communication issue occurred while connecting to NASA servers.",
    timeoutMessage: "The NASA API took more than 10 seconds to respond. The service may be experiencing temporary high traffic.",
    notFoundMessage: "No astronomical images or records were found for the selected criteria in the NASA archive.",
    forbiddenMessage: "The NASA API key is invalid or lacks permissions. Please check your VITE_API_KEY in the .env file.",
    reloadCta: "Reload page",
    retryCta: "Retry connection",
    statusTimeout: "TIMEOUT (10s)",
    statusNotFound: "ERROR 404",
    statusForbidden: "ERROR 403",
    statusError: "SERVICE ERROR",
    hint: "You can try reloading the page or retrying the search in a few moments."
  }
} as const;

