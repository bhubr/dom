const express = require('express')
const app = express()

const html = `
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <title>Exemple de navigation</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    
    <div class="container" id="main"></div>
    
    <script src="page.js"></script>
    <script src="app.js"></script>
  </body>
</html>`

app.get('/*', (req, res) => {
  console.log('wildcard route')
  res.send(html)
  res.end()
})

console.log('Server listening on http://127.0.0.1:3131')
app.listen(3131)
