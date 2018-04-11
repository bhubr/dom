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

  it('mainTitleH2 contient le 1er h2 de #main', () => {
    // assert.ok(typeof mainTitleH2 !== 'undefined')
    // const expectedMainTitleH2 = divMain.getElementsByTagName('h2')[0]
    // assert.equal(mainTitleH2, expectedMainTitleH2)
  })

})

createNodes()