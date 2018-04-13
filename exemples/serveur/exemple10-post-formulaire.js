const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Fichiers statiques
app.use(express.static('public/exemple10'))


// !!!! ATTENTION !!!! NOUVEAUTE !!!!
// Il faut permettre à Express de traiter des données de formulaire
// Sinon le req.body vaudra toujours undefined

// C'est le role du bodyParser, inclus ci-dessus par un require()

// bodyParser signifie "analyseur de corps de requête"
// On active celui pour le JSON
app.use(bodyParser.json())

/**
 * Exemple 10 : Echange client-serveur n°4
 * Cette fois les données sont envoyées par POST !!
 *
 * En effet GET n'est pas approprié pour envoyer notamment
 * des données sensibles comme des mots de passe (ils seraient transmis en clair
 * dans l'URL).
 *
 * Reporte toi à script/exemple10/script.js
 *
 * ATTENTION CETTE FOIS, on récupère les données dans req.body
 * (il n'y a pas de body dans les requêtes GET)
 */

// Un tableau d'utilisateurs, vide au début
const users = []

// Compteur pour donner un id au nouvel utilisateur
let id = 1

// AUTRE POINT IMPORTANT, on utilise app.post car on veut gérer une requête POST
// Une requête GET sur cette URL donnerait une erreur 404
app.post('/register', (req, res) => {
  // Les données reçues sont dans l'objet req.body
  console.log(req.body)

  // On récupère le nom, l'email et le password
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  // Si l'utilisateur existe déjà dans le tableau (recherche par email),
  // On refuse une 2ème inscription avec le même email
  const existingUser = users.find(user => user.email === email)
  if(existingUser !== undefined) {

    // Il n'y a pas que les erreurs 404 dans la vie !
    // Il y a aussi l'erreur 400, prévue justement pour traiter des cas où les
    // données envoyées par le client au serveur sont invalides
    return res.status(400).json({
      error: 'Email déjà enregistré'
    })
  }

  // Si le mot de passe est trop court (< 4 caractères) on refuse l'inscription
  // du nouvel utilisateur, et on renvoie une ERREUR !
  if(password.length < 4) {
    return res.status(400).json({
      error: 'Mot de passe trop court (4 caractères minimum)'
    })
  }

  // On crée un objet qu'on va renvoyer au serveur
  // On ajoute l'id aux autres valeurs
  const newUser = {
    id: id,
    name: name,
    email: email,
    password: password
  }
  // On AJOUTE ce nouvel utilisateur au tableau
  users.push(newUser)

   // On incrémente l'id pour la prochaine requête
   id += 1

   // On convertit la chaîne en string (sinon, erreur...)
   res.json(newUser)
 })

/**
 * Pour pouvoir répondre aux requêtes, l'application
 * doit d'abord ECOUTER sur un "port" (un canal de communication)
 */
const message = `Lancement de l'app Express: http://localhost:4000`
console.log(message)
app.listen(4000)
