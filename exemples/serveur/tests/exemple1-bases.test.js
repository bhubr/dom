const fetch = require('node-fetch')
const assert = require('assert')
// const { start, kill } = require('./server-control')

// const checkServer = require('./check-server')
// const testName = process.argv[2]
// const exampleName = testName
//   .replace('.test', '')
//   .replace('tests/', '')

// console.log(exampleName, testName, process.argv[2])


describe('Test "Exemple 1 - Bases"', () => {
  //
  before(() => checkServer(exampleName))
  // before(() => start(exampleName)
  //   .then(() => checkServer(exampleName))
  // )
  //
  // after(() => kill())

  it('La route /news est définie et une requête renvoie "Nothing new"', done => {
    fetch('http://localhost:4000/news')
    .then(res => {
      assert.notEqual(res.status, 404, "La route n'est pas définie (erreur 404)")
      return res.text()
    })
    .then(responseText => {
      assert.equal(responseText, 'Nothing new', `Réponse reçue '${responseText}' non valide`)
      done()
    })
    .catch(done)
  })

})
