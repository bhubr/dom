const express = require('express')
const app = express()

// Cet exemple montre la possibilité de passer des paramètres
// dans une URL.
// On peut accéder aux paramètres via req.params.
// Si on reçoit une requête sur /hello/john
// req.params sera l'objet { name: 'john' }
// Donc req.params.name sera 'john'
app.get('/hello/:name', (req, res) => {
  res.send(`Hello, ${req.params.name}!`)
})

// Page d'accueil avec des liens permettant de tester différents paramètres
// pour l'URL ci-dessus
app.get('/', (req, res) => {
  const html = /* @html */`
    <h1>Paramètres d'URL</h1>
    <p>Essaie ces différentes URL (retourne en arrière après chaque essai):</p>
    <ul>
      <li><a href="/hello/mary">/hello/mary</a></li>
      <li><a href="/hello/barry">/hello/barry</a></li>
      <li><a href="/hello/jimmy">/hello/jimmy</a></li>
    </ul>
  `
  res.send(html)
})


/**
 * Pour pouvoir répondre aux requêtes, l'application
 * doit d'abord ECOUTER sur un "port" (un canal de communication)
 */
const message = `Lancement de l'app Express: http://localhost:4000`
console.log(message)
app.listen(4000)
