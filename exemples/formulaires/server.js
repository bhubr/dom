const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.json())


const html = `
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <title>Formulaires</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <style>
    body { font-size: 20px; }
    input { border: 1px solid #ddd; border-radius: 3px; padding: 5px 10px; }
  </style>
  <body>
    
    <div class="container" id="main"></div>
    
    <script src="app.js"></script>
  </body>
</html>`

app.get('*', (req, res) => {
  console.log('wildcard route')
  res.send(html)
  res.end()
})

const users = [
  { email: 'benoit.hubert@wildcodeschool.fr', password: 'abc123' },
  { email: 'joewild@wcs.fr', password: 'jecode' }
]

app.post('/my-login-url', (req, res) => {

  const user = users.find(
    user => user.email === req.body.email &&
            user.password === req.body.password
  )
  if(user !== undefined) {
    res.json({
      success: true
    })
  }
  else {
    res.status(401).json({
      error: 'Utilisateur non reconnu'
    })
  }

})

console.log('Server listening on http://127.0.0.1:4000')
app.listen(4000)
