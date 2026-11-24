/**
 * Champ de formulaire avec son label et son message d'erreur.
 * "as" permet d'afficher un input, un select ou un textarea.
 * Les autres props (type, value, onChange...) sont passées au champ.
 *
 * @param {{
 *   label: string,
 *   name: string,
 *   as?: 'input' | 'select' | 'textarea',
 *   error?: string,
 *   value: string,
 *   onChange: (event: Event) => void,
 *   onBlur: (event: Event) => void,
 *   children?: React.ReactNode
 * }} props
 */
// "as" est renommé en Field avec une majuscule : en JSX, <Field /> avec une variable
// en majuscule permet d'afficher la balise contenue dedans ('input', 'select' ou 'textarea').
// ...fieldProps récupère toutes les autres props pour les donner directement au champ.
function FormField({ label, name, as: Field = 'input', error, children, ...fieldProps }) {
  // Bootstrap utilise form-select pour les select et form-control pour le reste
  const baseClass = Field === 'select' ? 'form-select' : 'form-control'

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        className={`${baseClass} ${error ? 'is-invalid' : ''}`}
        {...fieldProps}
      >
        {children}
      </Field>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default FormField