const express = require('express')
const app = express()

// Fichiers statiques
app.use(express.static('public/exemple8'))

const firstNames = [
  'marie',
  'thomas',
  'camille',
  'nicolas',
  'léa',
  'julien',
  'manon',
  'quentin',
  'chloé',
  'maxime',
  'laura',
  'alexandre',
  'julie',
  'antoine',
  'sarah',
  'kevin',
  'pauline',
  'clément',
  'mathilde'
]

/**
 * Exemple 7 : Echange client-serveur n°2, passage de valeurs dans GET
 * On va toujours chercher (GET) des données sur le serveur
 * Cette fois, on passe un paramètre dans l'URL.
 *
 * Reporte toi à script/exemple8/script.js pour voir comment ces paramètres sont
 * envoyés. C'est sous la forme ?param1=valeur1&param2=valeur2
 * Ils sont récupérés par le callback dans req.query, A NE PAS confondre
 * avec req.params
 */
 app.get('/first-names', (req, res) => {
   // Les paramètres passés dans l'URL sont dans l'objet query
   console.log(req.query)

   // On récupère Joe dans search si on a passé ?search=Joe après l'URL
   const search = req.query.search
   const filtered = firstNames.filter(n => n.includes(search))

   // On convertit la chaîne en string (sinon, erreur...)
   res.json(filtered)
 })

/**
 * Pour pouvoir répondre aux requêtes, l'application
 * doit d'abord ECOUTER sur un "port" (un canal de communication)
 */
const message = `Lancement de l'app Express: http://localhost:4000`
console.log(message)
app.listen(4000)
