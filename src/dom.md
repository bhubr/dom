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
    for(paragraph of coloredIn1stSection) paragraph.innerHTML = 'Je viens de modifier le <strong>contenu</strong> du paragraphe.'

Ensuite tu peux faire la même chose avec une boucle for:

    // Utiliser une boucle for..of pour modifier plusieurs éléments
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

Bon, tu l'auras compris, SPA ici n'a aucun rapport avec nos amies les bêtes.

C'est un acronyme pour "Single-Page Application". Kézako ? Pense à comment tu as travaillé sur ton 1er projet: comme il s'agissait d'un blog statique, tu avais créé plusieurs pages, dans des fichiers HTML séparés, avec des liens de l'une à l'autre, en passant les noms des fichiers dans les attributs `href` des balises `<a>`.

On a fait comme cela depuis les débuts du web, mais c'est assez "old school", surtout quand on veut créer une application très dynamique. En effet, par défaut, **cliquer sur un lien, ou soumettre un formulaire, provoque le rechargement de la page** avec une nouvelle URL. C'est assez "lourd" car il faut faire un aller-retour complet vers le serveur pour obtenir le HTML.

Quand le navigateur charge une nouvelle page, ou recharge la page courante, tout est réinitialisé du côté de JS : les scripts sont (re)chargés et repartent d'un état initial.

> Une Single-Page App fonctionne sur un mode radicalement différent ! Au lieu de recharger un nouveau document HTML à chaque clic sur un lien, **tout** se passe sur la même page HTML, d'où le nom : on a un fichier `index.html` minimal, à partir duquel on charge une application JS, qui se charge de créer **dynamiquement** tout le HTML de la page.

### Exemple

Dans le répertoire `exemples/html-statique-vers-js/`, ouvre `index.html`.

C'est la base d'une application d'exemple, semblable à ce qu'on a vu en dojo. Celle qu'on a vu en dojo comportait deux pages: index et about. Celle-ci en comporte deux autres, pas pour ajouter une complexité inutile, mais parce qu'on aura besoin, plus tard, d'exemples.