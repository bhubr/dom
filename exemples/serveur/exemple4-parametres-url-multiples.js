const express = require('express')
const app = express()

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Autre exemple d'URL paramétrées, avec PLUSIEURS paramètres.
// Ici, si on fait une requête sur: /posts/2018/04/the-power-of-javascript,
// req.params.year vaudra '2018'
// req.params.month vaudra '4'
// req.params.slug vaudra 'the-power-of-javascript'
app.get('/posts/:year(\\d+)/:month/:slug', (req, res) => {
  // Pour voir ce qui se passe, dans le terminal où tu as lancé le serveur
  console.log(req.params)
  // Ici on convertit month en entier
  const monthInt = Number(req.params.month)
  const monthName = months[monthInt - 1]
  // On récupère le nom du mois correspondant au mois demandé (on enlève 1
  // car les indices sont comptés à partir de 0)
  res.send(`Article ${req.params.slug} was published in ${monthName}, ${req.params.year}!`)
})

// Page d'accueil avec des liens permettant de tester différents paramètres
// pour l'URL ci-dessus
app.get('/', (req, res) => {
  const html = /* @html */`
    <h1>Paramètres d'URL</h1>
    <p>Essaie ces différentes URL (retourne en arrière après chaque essai):</p>
    <ul>
      <li><a href="/posts/2018/04/the-power-of-javascript">/posts/2018/04/the-power-of-javascript</a></li>
      <li><a href="/posts/2018/03/react-rocks">/posts/2018/03/react-rocks</a></li>
      <li><a href="/posts/2017/12/node-js-rises">/posts/2017/12/node-js-rises</a></li>
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
