// Lettres (avec accents grâce à À-ÿ), apostrophe, espace et tiret, entre 2 et 50 caractères
const NAME_REGEX = /^[a-zA-ZÀ-ÿ' -]{2,50}$/
// texte sans espace ni @, puis @, puis un domaine avec au moins un point
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Numéro français : 0612345678, 06 12 34 56 78, +33612345678...
// (?:\+33\s?|0) -> commence par +33 ou par 0
// [1-9]          -> premier chiffre après (pas de 00)
// (?:[\s.-]?\d{2}){4} -> puis 4 paires de chiffres, avec un espace, un point ou un tiret possible entre
const PHONE_REGEX = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/
const MESSAGE_MAX_LENGTH = 500

/**
 * Vérifie un nom ou un prénom (lettres, accents, espaces, tirets et apostrophes).
 *
 * @param {string} value - valeur saisie
 * @param {string} label - début du message d'erreur, ex : "Le nom"
 * @returns {string} message d'erreur, ou chaîne vide si c'est valide
 */
export function validateName(value, label) {
  if (!value.trim()) return `${label} est obligatoire`
  if (!NAME_REGEX.test(value.trim())) return `${label} n'est pas valide`
  return ''
}

/**
 * @param {string} value - adresse email saisie
 * @returns {string} message d'erreur, ou chaîne vide si c'est valide
 */
export function validateEmail(value) {
  if (!value.trim()) return "L'email est obligatoire"
  if (!EMAIL_REGEX.test(value.trim())) return "L'email n'est pas valide (ex : nom@mail.com)"
  return ''
}

/**
 * @param {string} value - numéro de téléphone saisi
 * @returns {string} message d'erreur, ou chaîne vide si c'est valide
 */
export function validatePhone(value) {
  if (!value.trim()) return 'Le téléphone est obligatoire'
  if (!PHONE_REGEX.test(value.trim())) return 'Le numéro doit être un numéro français valide'
  return ''
}

/**
 * Vérifie un seul champ du formulaire d'inscription.
 * Utilisé quand on quitte un champ, et pour tout le formulaire à l'envoi.
 *
 * @param {string} name - nom du champ (lastName, email...)
 * @param {string|boolean} value - valeur du champ
 * @returns {string} message d'erreur, ou chaîne vide si c'est valide
 */
export function validateField(name, value) {
  switch (name) {
    case 'lastName':
      return validateName(value, 'Le nom')
    case 'firstName':
      return validateName(value, 'Le prénom')
    case 'email':
      return validateEmail(value)
    case 'phone':
      return validatePhone(value)
    case 'courseId':
      return value ? '' : 'Veuillez choisir une formation'
    case 'message':
      return value.length > MESSAGE_MAX_LENGTH
        ? `Le message ne doit pas dépasser ${MESSAGE_MAX_LENGTH} caractères`
        : ''
    case 'acceptTerms':
      return value ? '' : 'Vous devez accepter les conditions'
    default:
      return ''
  }
}

/**
 * Vérifie tous les champs du formulaire.
 *
 * @param {object} values - toutes les valeurs du formulaire
 * @returns {object} les erreurs par champ (objet vide si tout est bon)
 */
export function validateInscriptionForm(values) {
  const errors = {}

  Object.keys(values).forEach((name) => {
    const error = validateField(name, values[name])
    if (error) errors[name] = error
  })

  return errors
}
