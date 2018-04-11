const express = require('express')
const app = express()
app.use(express.static(__dirname))

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

console.log('Server listening on http://127.0.0.1:4000')
app.listen(80)
