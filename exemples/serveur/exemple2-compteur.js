const express = require('express')
const app = express()

// Compteur de requêtes, défini en dehors
// de la fonction
let compteur = 0

app.get('/', (req, res) => {
  compteur += 1
  const responseText = `
    <h1>Compteur</h1>
    <p>J'ai été appelé ${compteur} fois.</p>`
  res.send(responseText)
})

/**
 * Pour pouvoir répondre aux requêtes, l'application
 * doit d'abord ECOUTER sur un "port" (un canal de communication)
 */
const message = `Lancement de l'app Express: http://localhost:4000`
console.log(message)
app.listen(4000)
