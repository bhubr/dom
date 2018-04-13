const express = require('express')
const app = express()

// Cela ressemble à ce qu'on pourrait trouver dans une base de données
const posts = [
  {
    id: 1,
    slug: 'how-react-came-to-be',
    title: 'How React came to be',
    summary: 'This article gives an introduction to the principles behind React.'
  }, {
    id: 2,
    slug: 'why-10-coffees-a-day-is-not-a-good-idea',
    title: 'Why 10 coffees a day is not a good idea',
    summary: 'Coffee is good, but science seems to suggest that sleep works better.'
  }
]

/**
 * Autre exemple pour illustrer les URL paramétrées.
 * On va combiner cela avec le find() sur un tableau.
 *
 * On revient à un seul paramètre d'URL.
 * On va faire une recherche dans le tableau posts
 * Et si on trouve l'article, on le renvoie.
 * Sinon, on renvoie une erreur 404 grâce à res.status()
 */
app.get('/posts/:slug', (req, res) => {

  // On cherche l'article en comparant le slug fourni en paramètre
  // à celui des articles du tableau
  const postOrUndef = posts.find(
    post => post.slug === req.params.slug
  )
  // Si on n'a pas trouvé de post ayant le slug fourni: erreur 404
  if(postOrUndef === undefined) {
    // On fait un return pour ne pas continuer après
    return res.status(404).send('<h1>Article non trouvé<h1>')
  }
  res.send(`
    <h1>${postOrUndef.title}</h1>
    <p>${postOrUndef.summary}</p>
  `)
})

// Page d'accueil
app.get('/', (req, res) => {
  const html = /* @html */`
    <h1>Paramètres d'URL et find()</h1>
    <p>Essaie ces différentes URL (retourne en arrière après chaque essai):</p>
    <ul>
      <li><a href="/posts/how-react-came-to-be">
        /posts/how-react-came-to-be
      </a></li>
      <li><a href="/posts/why-10-coffees-a-day-is-not-a-good-idea">
        /posts/why-10-coffees-a-day-is-not-a-good-idea
      </a></li>
      <li><a href="/posts/this-will-show-a-404-error">
        /posts/this-will-show-a-404-error
      </a></li>
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
