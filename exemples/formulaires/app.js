// La div où je veux afficher
const mainDiv = document.getElementById('main')

const homeHtml = `<h1>Formulaires</h1>
  <p>On va voir le fonctionnement des formulaires:
    <ul>
      <li>Ecriture des champs</li>
      <li>Requêtes POST et GET</li>
      <li></li>
    </ul>
  </p>
  <h2>Méthode GET</h2>
  <form method="GET" action="/my-search-url">
    <input type="text" name="search-term" placeholder="your search" />
    <input type="submit" value="Submit" />
  </form>

  <h2>Méthode POST</h2>
  <form method="POST" action="/my-login-url">
    <input type="email" name="email" placeholder="your email" />
    <input type="password" name="password" placeholder="your password" />
    <input type="submit" value="Submit" />
  </form>

  `


const render = mainHtml => {
  mainDiv.innerHTML = mainHtml
}


const home = () => {
  render(homeHtml)
}
home()


// const about = () => {
//   render(aboutHtml)
// }


// const notFound = () => {
//   render(notFoundHtml)
// }
