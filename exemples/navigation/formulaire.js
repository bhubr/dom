const express = require('express')
const app = express()

const users = [
  { id: 1, name: 'Benoit', email: 'benoithubert@gmail.com' },
  { id: 2, name: 'Florentin', email: 'florentin.wild@example.com' },
  { id: 3, name: 'Joe', email: 'joe@example.com' }
]
let nextId = 4

const html = `
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <title>Exemple de requêtes GET avec Node</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Exemple de requêtes GET avec Node</h1>
    <form action="/gloubiboulga">
      <input type="text" name="name" placeholder="your name" />
      <input type="email" name="email" placeholder="your email" />
      <input type="submit" value="Submit" />
    </form>
 </body>
</html>`

app.get('/', (req, res) => {
  res.send(html)
  res.end()
})

app.get('/gloubiboulga', (req, res) => {
  console.log(req.query)
  console.log()
  const newUser = req.query
  newUser.id = nextId
  nextId++
  users.push(newUser)
  console.log(users)

  res.send("Vous avez entré:" + req.query.name + ',' + req.query.email )
  res.end()
})

console.log('Server listening on http://127.0.0.1:3133')
app.listen(3133)
