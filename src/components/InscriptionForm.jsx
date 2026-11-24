import { useState } from 'react'
import FormField from './FormField'
import InscriptionSuccess from './InscriptionSuccess'
import { validateField, validateInscriptionForm } from '../utils/validation'

const EMPTY_FORM = {
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  courseId: '',
  message: '',
  acceptTerms: false,
}

/**
 * @param {{ courses: object[], initialCourseId?: string }} props
 */
function InscriptionForm({ courses, initialCourseId = '' }) {
  const [values, setValues] = useState({ ...EMPTY_FORM, courseId: initialCourseId })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const getInputValue = (input) => (input.type === 'checkbox' ? input.checked : input.value)

  const handleChange = (event) => {
    const { name } = event.target
    const value = getInputValue(event.target)

    setValues((prevValues) => ({ ...prevValues, [name]: value }))

    // Si le champ était en erreur, on revérifie pendant la saisie pour enlever le message
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, getInputValue(event.target)),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formErrors = validateInscriptionForm(values)
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitted(true)
    }
  }

  const handleNewInscription = () => {
    setValues(EMPTY_FORM)
    setErrors({})
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    const chosenCourse = courses.find((course) => String(course.id) === values.courseId)

    return (
      <InscriptionSuccess
        firstName={values.firstName}
        email={values.email}
        courseTitle={chosenCourse?.title}
        onNewInscription={handleNewInscription}
      />
    )
  }

  const fieldProps = (name) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
    onBlur: handleBlur,
  })

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row">
        <div className="col-md-6">
          <FormField label="Nom" {...fieldProps('lastName')} />
        </div>
        <div className="col-md-6">
          <FormField label="Prénom" {...fieldProps('firstName')} />
        </div>
      </div>

      <FormField label="Email" type="email" placeholder="nom@mail.com" {...fieldProps('email')} />
      <FormField label="Téléphone" type="tel" placeholder="06 12 34 56 78" {...fieldProps('phone')} />

      <FormField label="Formation" as="select" {...fieldProps('courseId')}>
        <option value="">-- Choisir une formation --</option>
        {courses.map((course) => (
          <option key={course.id} value={String(course.id)}>
            {course.title} ({course.price} €)
          </option>
        ))}
      </FormField>

      <FormField label="Message (facultatif)" as="textarea" rows="4" {...fieldProps('message')} />

      <div className="form-check mb-4">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
          checked={values.acceptTerms}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label htmlFor="acceptTerms" className="form-check-label">
          J'accepte les conditions générales d'inscription
        </label>
        {errors.acceptTerms && <div className="invalid-feedback">{errors.acceptTerms}</div>}
      </div>

      <button type="submit" className="btn btn-danger btn-lg">
        Envoyer mon inscription
      </button>
    </form>
  )
}

export default InscriptionForm
