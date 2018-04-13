
// Fonction qui met à jour le compteur dans une balise span
function showCounterValue(num) {
  const counterSpan = document.getElementById('counter')
  counterSpan.innerHTML = num
}

function getAndShowCounter() {
  // Envoi de la requête
  fetch('/counter')
  .then(res => res.text())
  // Appelle showCounterValue avec la valeur serverCounter
  // que le serveur nous a renvoyé
  .then(serverCounter => showCounterValue(serverCounter))
}

// Il n'y a qu'un bouton, on y accède par l'indice 0
const buttons = document.getElementsByTagName('button')

// Ajout d'un listener (gestionnaire) d'évènements pour gérer le clic sur ce bouton
// 1er argument de addEventListener: le nom de l'évènement
// 2ème argument : l'élément HTML ciblé par l'évènement reçu.
buttons[0].addEventListener('click', e => {
  // Pas besoin de preventDefault() car ce bouton ne nous fait pas sortir
  // de la page.
  // On va juste lancer la requête
  getAndShowCounter()
})
