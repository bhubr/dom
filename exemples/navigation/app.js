// La div où je veux afficher
const mainDiv = document.getElementById('main')

// Navbar commune à toutes les pages
const navbarHtml = `<nav>
    <ul>
      <li><a href="/">Accueil</a></li>
      <li><a href="/about">À propos</a></li>
    </ul>
  </nav>`


const homeHtml = `<h1>Accueil</h1>
  <p>Bienvenue sur le site du fan-club francophone de Chuck Norris.</p>
  <p>Le Chuck Norris fact du jour&nbsp: <em>Chuck Norris a déjà compté jusqu'à l'infini. Deux fois.</em>
  <p><a href="/lien-mort">Un lien mort pour voir la page 404</a></p>`


const aboutHtml = `<h1>À propos</h1>
  <p>Cette application vise à faire connaître Chuck Norris, sa vie, son oeuvre.</p>`


const notFoundHtml = `<h1>404 Page non trouvée</h1>
  <p><a href="/">Retour à l'accueil</a></p>`


const render = mainHtml => {
  mainDiv.innerHTML = navbarHtml + mainHtml
}


const home = () => {
  render(homeHtml)
}


const about = () => {
  render(aboutHtml)
}


const notFound = () => {
  render(notFoundHtml)
}

page('/', home)
page('/about', about)
page('*', notFound)

page()