const express = require('express')
const app = express()

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
    <a href="/user/benoit-hubert">Benoît Hubert</a>
    <a href="/user/benoit-hubert/articles/le-js-c-est-super">Le JS c'est super</a>
    <a href="/user/florentin-hauton">Florentin Hauton</a>
    <a href="/user/florentin-hauton/articles/youpi-tralala">Youpi Tralala</a>
  </body>
</html>`

app.get('/', (req, res) => {
  res.send(html)
  res.end()
})

app.get('/user/:slug', (req, res) => {
  console.log(req.params)
  const slugOfUser = req.params.slug
  res.send(slugOfUser)
  res.end()
})

app.get('/user/:slug/articles/:artSlug', (req, res) => {
  console.log(req.params)
  const slugOfUser = req.params.slug
  res.send(slugOfUser)
  res.end()
})

console.log('Server listening on http://127.0.0.1:3132')
app.listen(3132)
