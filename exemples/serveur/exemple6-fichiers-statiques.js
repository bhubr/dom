const express = require('express')
const app = express()

/**
 * ATTENTION, PAR RAPPORT AUX PRECEDENTS, ON AJOUTE UNE CHOSE ICI.
 * Le code ci-dessous permet de définir un répertoire pour les fichiers
 * statiques (images, css, js, json, etc)
 *
 * C'est indispensable, car définir ses propres routes pour aller lire
 * ces fichiers serait fastidieux.
 *
 * Le paramètre passé à express.static() permet de spécifier le répertoire
 * où sont stockés les fichiers (ici le sous-répertoire public/exemple6 de ce dossier)
 */
app.use(express.static('public/exemple6'))

app.get('/page/:slug', (req, res) => {
  const responseText = /* @html */`
  <!doctype html>
  <html class="no-js" lang="">
    <head>
      <meta charset="utf-8">
      <title>Fichiers statiques</title>
      <link rel="stylesheet" href="/css/style.css" />
    </head>
    <body>
      <h1>URL gérée par Express</h1>
      <p>Cette page a été appelée depuis <code>public/exemple6/index.html</code>.
      <p>Le slug reçu en paramètre est ${req.params.slug}.</p>
      <p><a href="/">Retour à l'accueil</a></p>
    </body>
  </html>
  `
  res.send(responseText)
})

/**
 * Pour pouvoir répondre aux requêtes, l'application
 * doit d'abord ECOUTER sur un "port" (un canal de communication)
 */
const message = `Lancement de l'app Express: http://localhost:4000`
console.log(message)
app.listen(4000)
