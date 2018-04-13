// On a besoin du module express
const express = require('express')

// On crée une application express
const app = express()

/**
 * On indique à l'application ce qu'elle doit faire
 * quand elle reçoit une requête sur l'URL / (racine du site)
 * Le 1er argument est une URL, le 2ème est une fonction,
 * qui est appelée à chaque fois qu'une requête est reçue
 * sur l'URL du 1er argument. C'est une "fonction de rappel"
 * ou callback.
 *
 * L'association d'une URL et d'un callback est appelée une ROUTE.
 */
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

/**
 * Pour la route précédente, on a utilisé une fonction
 * fléchée, anonyme (passée directement en paramètre).
 * On peut utiliser aussi une fonction déclarée au préalable.
 */
function traiterRequeteAbout(req, res) {
  res.send('This is the "About" page')
}
// Une fois la fonction déclarée, on la passe en paramètre
app.get('/about', traiterRequeteAbout)

/**
 * CHALLENGE
 * En t'inspirant des routes précédentes, écrit une 3ème
 * route, associée à l'URL /news, et qui renvoie la
 * chaîne 'Nothing new under the sun'
 */
// TON CODE ICI


/**
 * Pour pouvoir répondre aux requêtes, l'application
 * doit d'abord ECOUTER sur un "port" (un canal de communication)
 */
const message = `Lancement de l'app Express.
  * Page racine: http://localhost:4000
  * Page "About": http://localhost:4000/about
  * Page "News" (à écrire): http://localhost:4000/news
  `
console.log(message)
app.listen(4000)
