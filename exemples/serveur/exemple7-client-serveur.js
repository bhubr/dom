const express = require('express')
const app = express()

// Fichiers statiques
app.use(express.static('public/exemple7'))

/**
 * Exemple 7 : Echange client-serveur n°1, les bases
 * Cette fois notre JavaScript va aller chercher (GET)
 * des données depuis le serveur, et les utiliser pour les afficher.
 * On va réutiliser le principe du compteur de l'exemple 2, un peu modifié.
 *
 * Reporte toi à script/exemple7/script.js pour le fonctionnement
 */

 // Compteur de requêtes, défini en dehors de la fonction
 let counter = 0

 app.get('/counter', (req, res) => {
   counter += 1
   // On convertit la chaîne en string (sinon, erreur...)
   res.send(counter.toString())
 })

/**
 * Pour pouvoir répondre aux requêtes, l'application
 * doit d'abord ECOUTER sur un "port" (un canal de communication)
 */
const message = `Lancement de l'app Express: http://localhost:4000`
console.log(message)
app.listen(4000)
