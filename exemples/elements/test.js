const allCodesLen = typeof allCodes !== 'undefined' ? allCodes.length : 0

const mochaRun = () => {
  mocha.checkLeaks()
  mocha.run()
}

const createNodes = () => {
  const mochaWrap = document.getElementById('mocha-wrap')

  // Create #mocha div
  let node = document.createElement('div')
  node.id = 'mocha'
  mochaWrap.appendChild(node)

  // Create #test btn
  node = document.createElement('button')
  node.id = 'test'
  node.innerHTML = 'Test'
  node.className = 'btn'
  document.body.appendChild(node)

  node.addEventListener('click', mochaRun)
}

mocha.setup('bdd')

describe('Exercices trouver&modifier éléments', () => {

  it('mainTitleH2 contient le 1er h2 de #main', () => {
    assert.ok(typeof mainTitleH2 !== 'undefined')
    const expectedMainTitleH2 = divMain.getElementsByTagName('h2')[0]
    assert.equal(mainTitleH2, expectedMainTitleH2)
  })

  it('allCodes contient tous les codes', () => {
    assert.ok(typeof allCodes !== 'undefined')
    assert.equal(allCodesLen, 11)
  })

  it('codesInSecondary contient les codes de #secondary', () => {
    assert.ok(typeof codesInSecondary !== 'undefined')
    assert.equal(codesInSecondary.length, 2)
  })

  it('codesIn2ndSec contient les codes de la 2ème .doc-section', () => {
    assert.ok(typeof codesIn2ndSec !== 'undefined')
    assert.equal(codesIn2ndSec.length, 4)
  })

  it('Récupérer dans une variable le 3ème paragraphe de la 2ème div `.doc-section`', () => {
    const expectedParag3in2ndDocSec = docSections[1].getElementsByTagName('p')[2]
    assert.equal(parag3in2ndDocSec, expectedParag3in2ndDocSec)
  })

  it(`mainTitleH2 contient "J'ai changé le sous-titre!"`, () => {
    assert.equal(mainTitleH2.innerHTML, "J'ai changé le sous-titre!")
  })

  it("Remplacer le contenu des `code`s stockés dans la `const codesInSecondary` par `#i-was-secondary`", () => {
    for(let c of codesInSecondary) {
      assert.equal(c.innerHTML, '#i-was-secondary')
    }
  })

  it(`Le contenu du paragraphe stocké dans coloredInSecondary contient "J'ai encore tout cassé!"`, () => {
    assert.equal(coloredInSecondary[0].innerHTML, "J'ai encore tout cassé!")
  })

  it('Ajouter `avec contenu modifié` au contenu du 3ème paragraphe de la 2ème div `.doc-section`', () => {
    assert.equal(parag3in2ndDocSec.innerHTML, '3ème paragraphe dans la 2ème div <code>.doc-section</code> avec contenu modifié')
  })

})

createNodes()