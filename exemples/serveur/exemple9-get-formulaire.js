const express = require('express')
const app = express()

// Fichiers statiques
app.use(express.static('public/exemple9'))

const persons = [
  { firstName: 'marie', age: 34 },
  { firstName: 'thomas', age: 38 },
  { firstName: 'camille', age: 27 },
  { firstName: 'nicolas', age: 19 },
  { firstName: 'léa', age: 62 },
  { firstName: 'julien', age: 54 },
  { firstName: 'manon', age: 43 },
  { firstName: 'quentin', age: 35 },
  { firstName: 'chloé', age: 22 },
  { firstName: 'maxime', age: 29 },
  { firstName: 'laura', age: 35 },
  { firstName: 'alexandre', age: 44 },
  { firstName: 'julie', age: 51 },
  { firstName: 'antoine', age: 24 },
  { firstName: 'sarah', age: 47 },
  { firstName: 'kevin', age: 31 },
  { firstName: 'pauline', age: 22 },
  { firstName: 'clément', age: 11 },
  { firstName: 'mathilde', age: 33 }
]

/**
 * Exemple 8 : Echange client-serveur n°2, passage de valeurs dans GET
 * On va toujours chercher (GET) des données sur le serveur
 * Cette fois, on passe un paramètre dans l'URL.
 *
 * Reporte toi à script/exemple8/script.js pour voir comment ces paramètres sont
 * envoyés. C'est sous la forme ?param1=valeur1&param2=valeur2
 * Ils sont récupérés par le callback dans req.query, A NE PAS confondre
 * avec req.params
 */
 app.get('/persons', (req, res) => {
   // Les paramètres passés dans l'URL sont dans l'objet query
   console.log(req.query)

   const firstName = req.query['first-name']
   let maxAge = Number(req.query['max-age'])
   const filtered = persons.filter(
     person => person.firstName.includes(firstName) && person.age <= maxAge
   )

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
