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
  <form id="form-get" method="GET" action="/my-search-url">
    <input type="text" name="search-term" placeholder="your search" />
    <input type="submit" value="Submit" />
  </form>

  <h2>Méthode POST</h2>
  <form id="form-post" method="POST" action="/my-login-url">
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

  const formPost = document.getElementById('form-post')
  formPost.addEventListener('submit', event => {

    let data = {}

    event.preventDefault()
    const inputs = formPost.getElementsByTagName('input')
    for(input of inputs)  {
      if(input.name !== '') {
        data[input.name] = input.value
      }
    }
    const body = JSON.stringify(data)
    // console.log(body)

    fetch('/my-login-url', {
      method: 'POST',
      body: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  })
}
home()


// const about = () => {
//   render(aboutHtml)
// }


// const notFound = () => {
//   render(notFoundHtml)
// }
