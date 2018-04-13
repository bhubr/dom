
function showRegistrationSuccess(user) {
  const alertDiv = document.getElementById('alert')

  alertDiv.innerHTML = `Nouvel utilisateur: ${user.name} (id: ${user.id})`
  alertDiv.classList.add('alert-success')
}

function showRegistrationError(errorMessage) {
  const alertDiv = document.getElementById('alert')

  alertDiv.innerHTML = errorMessage
  alertDiv.classList.add('alert-danger')
}

function postRegistrationData(data) {

  // Encoder l'objet data en JSON
  const body = JSON.stringify(data)
  console.log('données soumises au serveur', data)
  console.log('données encodées en JSON', body)

  // Création de l'URL en ajoutant les paramètres à la fin
  const url = `/register`
  fetch(`/register`, {
    method: 'POST',       // Méthode POST !!!
    body: body,
    // Important: permet d'indiquer au serveur:
    //   - ce qu'on lui envoie (Content-Type)
    //   - ce qu'on accepte qu'il nous renvoie (Accept)
    // application/json est un type de données (JSON donc)
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  // Conversion du JSON reçu en objet JS
  .then(res => res.json())

  // Gestion des erreurs
  .then(decodedResponse => {

    // Si la réponse contient une erreur afficher un bandeau rouge
    // avec le type d'erreur (email déjà existant, password trop court...)
    if(decodedResponse.error) {
      showRegistrationError(decodedResponse.error)
    }
    // Sinon afficher un bandeau vert avec infos sur nouvel user
    else {
      showRegistrationSuccess(decodedResponse)
    }
  })
  // .then(newUser => showRegistrationSuccess(newUser))
  // .catch(error => showRegistrationError(error.message))
}

// Il n'y a qu'un formulaire, par facilité on y accède par son id (et c'est ok !)
const form = document.getElementById('form')

// C'est un submit qu'on intercepte
form.addEventListener('submit', e => {
  // BESOIN de preventDefault()
  e.preventDefault()

  // On a déjà le form dans la const form au dessus, mais c'est aussi bien
  // d'utiliser la target
  const submittedForm = e.target

  // On peut chaîner la récupération de la propriété value
  // après l'appel à getElementById()
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const userData = {
    name: name,
    email: email,
    password: password
  }
  postRegistrationData(userData)
})
