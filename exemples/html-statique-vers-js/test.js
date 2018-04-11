'use strict'
const allCodesLen = typeof allCodes !== 'undefined' ? allCodes.length : 0

const mochaRun = () => {
  document.body.classList.add('testing')
  mocha.checkLeaks()
  mocha.run()
}

const launchTests = () => {
  mochaRun()
}

const createNodes = () => {

  // Create #mocha-wrap div
  let node = document.createElement('div')
  node.id = 'mocha-wrap'
  document.body.appendChild(node)
  const mochaWrap = document.getElementById('mocha-wrap')

  // Create #mocha div
  node = document.createElement('div')
  node.id = 'mocha'
  mochaWrap.appendChild(node)

  // Create #test btn
  node = document.createElement('button')
  node.id = 'test'
  node.innerHTML = 'Test'
  node.className = 'btn'
  document.body.appendChild(node)

  node.addEventListener('click', launchTests)
}

mocha.setup('bdd')

describe('HTML statique vers JS - Test phase 1', () => {

  it('Le script app.js est référencé', () => {
    let hasScript = false
    const scripts = document.getElementsByTagName('script')
    console.log(scripts)
    for(let script of scripts) {
      if(script.src.includes('app.js')) {
        hasScript = true
        break
      }
    }
    assert.ok(hasScript, "Le script app.js n'est pas inclus depuis la page")
  })

  it('La const navbarHtml existe', () => {
    assert.ok(typeof navbarHtml !== 'undefined', "navbarHtml non trouvée")
  })

  it('La const footerHtml existe', () => {
    assert.ok(typeof footerHtml !== 'undefined', "footerHtml non trouvée")
  })

  it('La const homeHtml existe', () => {
    assert.ok(typeof homeHtml !== 'undefined', "homeHtml non trouvée")
  })

  it('La const aboutHtml existe', () => {
    assert.ok(typeof aboutHtml !== 'undefined', "navbarHtml non trouvée")
  })

  it('La const matrixHtml existe', () => {
    assert.ok(typeof matrixHtml !== 'undefined', "matrixHtml non trouvée")
  })

  it('La const inceptionHtml existe', () => {
    assert.ok(typeof inceptionHtml !== 'undefined', "inceptionHtml non trouvée")
  })

  it('La div #main doit toujours exister', () => {
    const mainDiv = document.getElementById('main')
    assert.notEqual(mainDiv, null, 'div #main non trouvée')
  })

  it('La div #main doit toujours contenir le contenu original', () => {
    const mainDiv = document.getElementById('main')
    assert.ok(mainDiv.innerHTML.includes('<a href="index.html">Home</a>'), 'navbar absente ou modifiée')
    assert.ok(mainDiv.innerHTML.includes('<h1>Home</h1>'), 'partie de contenu absente ou modifiée')
    assert.ok(mainDiv.innerHTML.includes('Wild Movies Toulouse'), 'footer absent ou modifié')
  })

})

createNodes()