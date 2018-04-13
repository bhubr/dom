
// Fonction qui met à jour le compteur dans une balise span
function showLastUrl(url) {
  const urlSpan = document.getElementById('url')
  urlSpan.innerHTML = url
}

function showPersonsList(persons) {
  const personsTable = document.getElementById('persons')
  const personRows = persons
    .map(person => /* @html */`<tr>
      <td>${person.firstName}</td>
      <td>${person.age}</td>
    </tr>`)       // Récupère un tableau de rows
    .join('')     // Joint les rows dans une chaîne
  console.log(personsTable, persons, personRows)
  personsTable.innerHTML = personRows
}

function getAndShowPersons(firstName, maxAge) {

  if(maxAge === '') {
    maxAge = 100
  }

  // Création de l'URL en ajoutant les paramètres à la fin
  const url = `/persons?first-name=${firstName}&max-age=${maxAge}`
  // Affichage
  showLastUrl(url)
  fetch(url)
  .then(res => res.json())
  .then(firstNames => showPersonsList(firstNames))
}

// Il n'y a qu'un formulaire, par facilité on y accède par son id (et c'est ok !)
const form = document.getElementById('form')

// Cette fois c'est un submit qu'on intercepte
form.addEventListener('submit', e => {
  // BESOIN de preventDefault()
  e.preventDefault()

  // On a déjà le form dans la const form au dessus, mais c'est aussi bien
  // d'utiliser la target
  const submittedForm = e.target

  // On peut chaîner la récupération de la propriété value
  // après l'appel à getElementById()
  const firstName = document.getElementById('first-name').value
  const maxAge = document.getElementById('max-age').value

  getAndShowPersons(firstName, maxAge)
})
