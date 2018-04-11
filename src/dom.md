# Manipuler le HTML dans le navigateur

JavaScript dispose d'un ensemble d'objets, méthodes, etc. pour interagir avec la page web. C'est spécifique au navigateur, Node.js ne dispose pas de toute cela !

## Accéder au document et au body

Ouvre le fichier `index.html` de ce repo, puis ouvre la console (F12), et saisis:

```javascript
document.body.innerHTML = "J'ai remplacé tout le corps du document"
```

Le résultat est radical : *tout* le contenu de la page est remplacé ! Mais comment ça marche ? Qu'est-ce que ce `document.body.innerHTML` ?

Tu as déjà manipulé, sans le savoir, des variables globales prédéfinies par JS. Quand tu fais un `console.log()`, cela appelle la méthode `log` de l'objet `console`. Tu n'as pas eu besoin de définir `console`: que ce soit sous Node.js ou dans le navigateur, il t'est fourni par ce qu'on appelle *l'API du langage*.

> L'API d'un langage est à distinguer du langage lui-même. Le langage, c'est la syntaxe, toutes les constructions comme les fonctions, les boucles. L'API, ce sont des fonctionnalités fournies à côté du langage, qui viennent sous forme de fonctions, ou d'objets avec leurs méthodes.

Dans le navigateur, JS peut manipuler la page web qui a été chargée par celui-ci. Cela se fait via **l'API DOM**. Celle-ci met à disposition des objets comme `window`, `document`, qui ont de nombreuses méthodes et propriétés.

Essaie ceci dans la console:

    console.dir(document)

Tu dois voir s'afficher un objet que tu peux "déplier".

![console.dir(document) dans Chrome](wiki-images/console-dir-document.png)

Il y a *beaucoup* de propriétés ! Celles qui nous intéressent surtout sont `children` et `body`. Si tu examines `children`, cela ressemble à un tableau. Ici il n'y a qu'un élément à l'index 0: `html`. À nouveau, `html` a une propriété `children`. Celle-ci contient cette fois deux éléments: `head` à l'index 0 et `body` à l'index 1.

À y réfléchir, cela reflète la structure d'une page:
![Structure d'une page HTML](http://eloquentjavascript.net/img/html-boxes.svg)

L'élément `html` contient `head` et `body`, puis `body` contient à son tour des éléments, comme un titre `h1`, etc.

> Cette structure est celle d'un arbre. La `racine` est l'élément `html`, dont on peut partir pour trouver tous les autres.

Essaie ceci dans la console:

    console.dir(document.children[0].children[1])

Cela t'affiche l'élément correspondant au `body` ! On prend le premier enfant (index 0) du document pour obtenir `html`, puis le deuxième enfant (index 1) de ce dernier pour obtenir le `body`.

C'est un peu fastidieux si on veut accéder au `body` fréquemment, et c'est pourquoi il y a un raccourci pour accéder au `body` directement via `document.body`:

    console.dir(document.body)

## La propriété `innerHTML` des éléments

*Chaque élément* découlant de `html` peut être trouvé via la hiérarchie de `children` illustrée ci-dessus. Et chacun de ces éléments a une propriété `innerHTML` qu'on peut lire, ou écrire:

    console.dir(document.body.innerHTML)
    document.body.innerHTML = '<h1>This is a title</h1>'

## Trouver des éléments

Pour ne pas écraser tout le `body`, on préfère en général ne manipuler qu'un élément dans la page. Comment accéder aux éléments d'une page, sans écrire des choses impossibles comme `document.children[0].children[1].children[2]` ?

On dispose de trois méthodes:
* `getElementById()` pour trouver **un** élément via son attribut `id` (l'`id` devant être unique).
* `getElementsByClassName()` pour trouver **des** éléments via leur attribut `class`.
* `getElementsByTagName()` pour trouver **des** éléments via le nom de la balise.

Note que le fait que la méthode renvoie **un** ou **des** éléments est indiqué par Element ou Element**s** dans son nom !

Ces méthodes peuvent être appelées directement sur `document`:

    const divMain = document.getElementById('main')
    const rows = document.getElementsByClassName('row')
    const paragraphs = document.getElementsByTagName('p')

Sinon, une fois qu'on a un élément comme `divMain` ci-dessus, on peut appeler les méthodes `getElementsByClassName` et `getElementsByTagName`. En ce qui concerne `getElementById` on l'appelle plutôt directement sur `document` car il y a forcément *un seul* élément avec un certain `id` dans la page.

    const rowsInMain = divMain.getElementsByClassName('row')
    const paragraphsInMain = divMain.getElementsByTagName('p')

### Exercice 1: récupérer des éléments

> * Il faut travailler dans `exemples/elements/index.html`, **en ajoutant du code à la fin.**
> * Ouvre ce fichier à la fois dans ton éditeur et dans le navigateur, et **active la console** de ce dernier !
> * Mets côte à côte ton éditeur et le navigateur pour mettre en relation le code et ce qu'il fait.
> * Les variables sont définies mais tu dois les affecter.
> * Pour lancer les tests (communs aux exercices 1 et 2) : bouton "Test" en bas à droite !!

Voici ce qui t'es demandé.

* Récupérer dans une variable le *premier* titre `h2` de la div `#main` (indice: trouver *tous* les `h2` de `#main` puis prendre celui à l'index 0 dans ce qui t'a été retourné)
* Récupérer dans une variable les éléments `code` dans tout le document
* Récupérer dans une variable les éléments `code` dans la div `#secondary`
* Récupérer dans une variable les éléments `code` dans la 2ème div `.doc-section`
* Récupérer dans une variable le 3ème paragraphe de la 2ème div `.doc-section`

## Modifier un ou plusieurs éléments

Toujours avec `exemples/elements/index.html` : **dans la console**, essaie de modifier le contenu des éléments. Cet exemple modifie le `innerHTML` d'un élément:

    // Un seul élément
    divSecondary.innerHTML = '<h1>I am the king of HTML</h1>'

Maintenant, les variables où on a stocké les retours de `getElementsByClassName()` ou `getElementsByTagName()` ne contiennent pas *un* élément mais une *collection* d'éléments... À peu de choses près, cela ressemble à un tableau, et donc, on peut faire des boucles dessus:

    // Utiliser une boucle for..of pour modifier plusieurs éléments
    // Je mets tout sur une ligne sans accolades, c'est mal mais c'est toléré dans la console
    const coloredIn1stSection = docSections[0].getElementsByClassName('paragraphe-couleur')
    for(paragraph of coloredIn1stSection) paragraph.innerHTML = 'Je viens de modifier le <strong>contenu</strong> du paragraphe.'

Ensuite tu peux faire la même chose avec une boucle for:

    // Utiliser une boucle for pour modifier plusieurs éléments
    const allParagraphs = document.getElementsByTagName('p')
    for(let i=0;i<allParagraphs.length;i++) allParagraphs[i].innerHTML = `Paragraphe à l'index ${i} écrasé !`

Si tu veux modifier juste *un* élément d'une collection, tu peux donc le faire via son indice dans le tableau:

    allParagraphs[1].innerHTML = '<em>Du texte en italique pour remplacer le 2ème paragraphe</em>'

### Exercice 2: modifier un ou plusieurs éléments

Retourne dans `exemples/elements/index.html`, ajoute du code à la fin du fichier pour:

* Remplacer le contenu du titre `h2` de la div `#main` récupéré à l'exercice précédent, par `J'ai changé le sous-titre!`
* Remplacer le contenu des `code`s stockés dans la `const codesInSecondary` par `#i-was-secondary`.
* Remplacer le contenu du paragraphe stocké dans la `const coloredInSecondary`, par `J'ai encore tout cassé!`
* Ajouter ` avec contenu modifié` (**avec l'espace avant avec**) après le contenu du 3ème paragraphe de la 2ème div `.doc-section`

## D'une application HTML statique à une "SPA" JS

> On a déjà parlé de tout ça en dojo... Pour le coup, comme on a repris le HTML de base du hackathon, votre travail du dojo est sur le [dépôt de ressources pour le hackathon](https://github.com/bhubr/hero/). Vous avez une branche par groupe, `dojo-groupe1` et `dojo-groupe2`. Je vous le donne comme référence, mais lisez d'abord et faites les exemples ci-dessous, ça reprend les mêmes principes.

Bon, tu l'auras compris, SPA ici n'a aucun rapport avec nos amies les bêtes.

C'est un acronyme pour "Single-Page Application". Kézako ? Pense à comment tu as travaillé sur ton 1er projet: comme il s'agissait d'un blog statique, tu avais créé plusieurs pages, dans des fichiers HTML séparés, avec des liens de l'une à l'autre, en passant les noms des fichiers dans les attributs `href` des balises `<a>`.

On a fait comme cela depuis les débuts du web, mais c'est assez "old school", surtout quand on veut créer une application très dynamique. En effet, par défaut, **cliquer sur un lien, ou soumettre un formulaire, provoque le rechargement de la page** avec une nouvelle URL. C'est assez "lourd" car il faut faire un aller-retour complet vers le serveur pour obtenir le HTML.

Quand le navigateur charge une nouvelle page, ou recharge la page courante, tout est réinitialisé du côté de JS : les scripts sont (re)chargés et repartent d'un état initial.

> Une Single-Page App fonctionne sur un mode radicalement différent ! Au lieu de recharger un nouveau document HTML à chaque clic sur un lien, **tout** se passe sur la même page HTML, d'où le nom : on a un fichier `index.html` minimal, à partir duquel on charge une application JS, qui se charge de créer **dynamiquement** tout le HTML de la page.

### Exemple

<img style="float:right; width: 30%; padding-left: 20px;" alt="Trust Me" src="wiki-images/trust-me.jpg" />

Dans le répertoire `exemples/html-statique-vers-js/`, ouvre `index.html`.

C'est la base d'une application d'exemple, semblable à ce qu'on a vu en dojo. Celle qu'on a vu en dojo comportait deux pages: index et about. Celle-ci en comporte deux autres, pas pour ajouter une complexité inutile, mais parce qu'on aura besoin!

Voici le code source de l'index :

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Movie Site / Home</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>

    <div class="container">

      <div id="main">

        <!-- Navigation -->
        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </nav>

        <!-- Content -->
        <h1>Home</h1>
        <div class="movies">
          <div class="movie-thumb">
            <a href="movie-matrix.html"><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/hEpWvX6Bp79eLxY1kX5ZZJcme5U.jpg" alt="The Matrix" /></a>
            <p>Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.</p>
          </div>
          <div class="movie-thumb">
            <a href="movie-inception.html"><img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg" alt="Inception" /></a>
            <p>Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible.</p>
          </div>
        </div>

        <!-- Footer -->
        <footer>
          <div class="inner">&copy; 2018 Wild Movies Toulouse</div>
        </footer>

      </div>

    </div>

  </body>
</html>
```

Cette page comporte :

* Dans le `head`, un lien vers une feuille de style
* Dans le `body`, une div `.container` contenant une autre div `#main`, celle-ci contenant 3 parties, délimitées avec des commentaires `<!-- -->` :

    * Navigation
    * Contenu principal
    * Footer

Les 3 pages HTML du même répertoire (`about.html`, `movie-matrix.html`, `movie-matrix.html`) suivent la même structure.

### Création de l'application JS

Ici tu peux créer une branche: `git checkout -b prenom-nom`.

Crée un fichier `app.js` et référence-le depuis l'index via une balise `<script>`.

#### Test d'insertion de HTML

Ensuite tu peux lui ajouter:

```javascript
const mainDiv = document.getElementById('main')
mainDiv.innerHTML = '<h1>Test insertion HTML</h1>'
```

La div dont l'id est `main` est la div où notre app JS va injecter tout le contenu HTML.

#### Découpage du HTML de l'index en 3 parties

On va distinguer les 3 sections contenues dans la div `#main` : si on compare les 4 fichiers HTML, la partie centrale (*content*) est ce qui change, tandis que la `navbar` et le `footer` restent les mêmes.

Il est donc intéressant de stocker la navbar et le footer dans des constantes qu'on réutilisera quelle que soit la page qu'on veut afficher.

On va **couper**-coller chacune des 3 sections de la div `#main`, dans des chaînes JS, **obligatoirement** délimitées par des backticks pour pouvoir gérer les sauts de ligne.

Ajoute au code ceci :

```javascript
const navbarHtml = `<nav>
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
    </ul>
  </nav>
`
```

Puis procède de la même façon en coupant-collant la partie `footer` (vers une constante nommée `footerHtml`), et la même chose pour la partie centrale qui reste (vers une constante nommée `homeHtml`).

Ensuite, tu peux déplacer la partie qui modifie `mainDiv.innerHTML` tout à la fin, et écrire:

```javascript
mainDiv.innerHTML = navbarHtml + homeHtml + footerHtml
```

Maintenant, de la même façon, prends les **parties de contenu** spécifiques des autres fichiers : `about.html`, `movie-matrix.html`, `movie-inception.html`, et colle les vers des constantes `aboutHtml`, `matrixHtml`, `inceptionHtml`.

À ce stade sers-toi du bouton Test en bas à droite pour vérifier que tu as bien suivi les instructions.

> Tu peux maintenant couper la partie de contenu d'`index.html` : il ne doit plus y avoir de contenu dans la div `#main` (par contre la div elle-même doit toujours être là). Comme tu as copié le contenu des pages `about.html`, `movie-matrix.html`, `movie-inception.html` vers `app.js`, tu peux supprimer ces 3 fichiers HTML.

#### Gestion des évènements

À ce stade, si tu cliques sur un des liens, ça ne marche plus !

Normal : le fait de cliquer sur un lien provoque une requête vers le serveur, pour obtenir la ressource / page référencée dans l'attribut `href` du lien.

Il y a deux évènements habituels qui provoquent un "aller-retour" vers le serveur :

* Le clic sur un lien, comme on vient de le dire.
* La soumission d'un formulaire

Pour éviter de *sortir* de la page en cours - ce qui nous ferait perdre toutes les données de l'app JS - on doit gérer nous-mêmes ce qui se passe sur un clic de lien ou une soumission de formulaire.

Voyons déjà comment gérer les évènements. On pourrait le faire en mettant un attribut `onclick` sur les liens : cela permet d'appeler du code JS. Mais ce n'est pas considéré comme une bonne pratique.

En pur JS, on écrit ceci pour ajouter un "listener", quelque chose qui *écoute* un évènement :

```javascript
element.addEventListener(nomEvenement, fonctionDeRappel)
```

Dans l'exemple ci-dessus :

* `element` peut être n'importe quoi qui ait été récupéré via une des méthodes `document.getElementById()`,  `document.getElementByClassName()`, ou `document.getElementByTagName()`
* `nomEvenement` correspond à différents possibles : `click` (click sur un élément), `submit` (soumission d'un formulaire), `focus` (activation d'un champ de formulaire en cliquant dessus), etc.
* `fonctionDeRappel` est une fonction qui va être appelée quand l'évènement se produit. Elle peut prendre un objet "évènement" en paramètre.

Un vrai exemple maintenant :

```javascript
const allLinks =  document.getElementsByTagName('a')
console.dir(allLinks)
for(let link of allLinks) {
  link.addEventListener('click', event => alert('yo'))
}
```

Ici, on a récupéré *plusieurs* liens dans `allLinks`. On peut donc utiliser une boucle `for..of` pour parcourir tous les liens. Sur *chaque* lien, on met un *gestionnaire* d'évènement : la fonction de rappel passée en deuxième paramètre, qui sera appelée seulement en cas de clic sur les liens.

Colle cet exemple **à la fin** de ton `app.js`, et recharge la page. La console doit t'afficher 4 liens, puis une "popup" doit s'afficher : la "fonction de rappel" (*callback* est le terme habituel) est bien appelée.

Mais après avoir cliqué sur "OK", le navigateur essaie tout de même de poursuivre l'action normale : en l'occurence, faire une requête pour obtenir la page référencée par le lien.

C'est là qu'on va *empêcher* (*prevent* en anglais) le comportement par défaut (*default*) de se produire. Pour cela, on va se servir de l'objet évènement passé à la fonction de rappel : on va appeler une méthode de cet objet. Remplace les quelques lignes ci-dessus par celles ci-dessous:

```javascript
const allLinks =  document.getElementsByTagName('a')
for(let link of allLinks) {
  link.addEventListener('click', event => {
    // Empêche le comportement par défaut du lien
    event.preventDefault()
    console.log(event.target)
    const newUrl = event.target.href
    console.log(newUrl)
  })
}
```

Tu peux constater que les liens ne fonctionnent plus !

On a mis un `console.log()` pour examiner une des propriétés de l'évènement très utile : `target`, qui permet de savoir sur quel élément s'est produit l'évènement. À partir de là, si on a un élément `a`, on peut examiner sa propriété `href`, pour savoir quelle est la page qu'on aurait demandé si le clic sur le lien n'avait pas été "intercepté".

Ci-dessus, on a stocké la valeur du `href` dans `newUrl`. Maintenant, on va se servir de cette chaîne de caractères pour déterminer quel est le  contenu HTML à afficher, à la place de celui existant.

Modifie encore le code, lis les commentaires dedans, et essaie-le !!

```javascript
const allLinks =  document.getElementsByTagName('a')
for(let link of allLinks) {
  link.addEventListener('click', event => {
    // Empêche le comportement par défaut du lien
    event.preventDefault()
    const newUrl = event.target.href
    // On découpe l'URL car on veut obtenir le "morceau"
    // se trouvant après le dernier /
    // split() sur une chaîne nous renvoie un tableau
    const splitUrl = newUrl.split('/')
    const page = splitUrl.pop()
    console.log(page)

    if(page === 'index.html') {
      mainDiv.innerHTML = navbarHtml + homeHtml + footerHtml
    }
    else if(page === 'about.html') {
      mainDiv.innerHTML = navbarHtml + aboutHtml + footerHtml
    }
  })
}
```