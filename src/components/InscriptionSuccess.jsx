/**
 * @param {{
 *   firstName: string,
 *   email: string,
 *   courseTitle?: string,
 *   onNewInscription: () => void
 * }} props
 */
function InscriptionSuccess({ firstName, email, courseTitle, onNewInscription }) {
  return (
    <div className="alert alert-success">
      <h2 className="h4">Merci {firstName} !</h2>
      <p>
        Votre demande d'inscription à la formation « {courseTitle} » a bien été envoyée.
        On vous recontacte rapidement à l'adresse {email}.
      </p>
      <button type="button" className="btn btn-main" onClick={onNewInscription}>
        Nouvelle inscription
      </button>
    </div>
  )
}

export default InscriptionSuccess