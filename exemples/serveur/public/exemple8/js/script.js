
// Fonction qui met à jour le compteur dans une balise span
function showLastUrl(url) {
  const urlSpan = document.getElementById('url')
  urlSpan.innerHTML = url
}

function showFirstNamesList(firstNames) {
  const firstNamesUl = document.getElementById('first-names')
  const firstNamesListItems = firstNames
    .map(fn => `<li>${fn}</li>`)   // Récupère un tableau d'items <li>...</li>
    .join('')                      // Joint les items dans une chaîne
  firstNamesUl.innerHTML = firstNamesListItems
}

function getAndShowFirstNames(search) {

  // Création de l'URL en ajoutant les paramètres à la fin
  const url = `/first-names?search=${search}`
  // Affichage
  showLastUrl(url)
  fetch(url)
  .then(res => res.json())
  .then(firstNames => showFirstNamesList(firstNames))
}

// Il n'y a qu'un bouton, on y accède par l'indice 0
const allButtons = document.getElementsByTagName('button')

// On doit faire une boucle pour gérer les appuis sur TOUS les boutons
// Type évènement en 1er paramètre, fonction de rappel en 2ème
for (button of allButtons) {
  button.addEventListener('click', e => {
  // Pas besoin de preventDefault()

  // On récupère le bouton qui a été ciblé
  const clickedButton = e.target
  // innerText est l'équivalent de innerHTML mais sans les tags HTML
  // On se sert du contenu
  const buttonContent = clickedButton.innerText
  // On va juste lancer la requête@
  getAndShowFirstNames(buttonContent)
})
}
