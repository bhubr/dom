      //  ----- Exercice 1: trouver des éléments -----

      // Récupérer le titre `h2` de la div `#main`
      let mainTitleH2 = divMain.getElementsByTagName('h2')[0]

      // Récupérer les éléments `code` dans tout le document
      let allCodes = document.getElementsByTagName('code')

      // Récupérer les éléments `code` dans la div `#secondary`
      let codesInSecondary = divSecondary.getElementsByTagName('code')

      // Récupérer les éléments `code` dans la 2ème div `.doc-section`
      let codesIn2ndSec = docSections[1].getElementsByTagName('code')

      // Récupérer dans une variable le 3ème paragraphe de la 2ème div `.doc-section`
      let parag3in2ndDocSec = docSections[1].getElementsByTagName('p')[2]

      // ----- Exercice 2: modifier un ou des éléments -----

      // Mettre "J'ai changé le sous-titre!" dans le 1er h2 de la div #main
      mainTitleH2.innerHTML = "J'ai changé le sous-titre!"
      // Remplacer le contenu des `code`s stockés dans la const codesInSecondary par #i-was-secondary
      for(let code of codesInSecondary) {
        code.innerHTML = '#i-was-secondary'
      }
      // Mettre "J'ai encore tout cassé!" dans le (1er) paragraphe stocké dans la const coloredInSecondary
      coloredInSecondary[0].innerHTML = "J'ai encore tout cassé!"

      // Ajouter ` avec contenu modifié` (avec l'espace avant avec) après le contenu du 3ème paragraphe
      // de la 2ème div `.doc-section`
      parag3in2ndDocSec.innerHTML += ' avec contenu modifié'
