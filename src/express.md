# Serveur Express

Il y a plusieurs façons d'accéder à une page HTML.

* Mettre une URL d'un site public comme [http://www.legorafi.fr/](http://www.legorafi.fr/)
* Ouvrir un fichier depuis son ordinateur: l'URL ressemble alors à [file:///home/wilder/Documents/wcs/index.html](file:///home/wilder/Documents/wcs/index.html)

Quand on travaille sur un site web en pur HTML&CSS, ouvrir des fichiers est suffisant.
Mais dès qu'on se lance sur un projet plus important, une "vraie" application avec une base de données, il faut créer son propre serveur.

C'est précisément ce que permettent de faire Node.js et Express. On pourrait le faire
avec Node.js seul, mais Express nous facilite le travail.

Quand on développe son application, on travaille "en local" : le serveur est accessible via une URL du type
[http://localhost](http://localhost) ou [http://localhost:4000](http://localhost:4000). Il faut que le serveur soit lancé !

## Exemple 1 - bases

D'abord, un petit rappel sur le protocole HTTP. Il implique deux participants :

* Le client (par ex. le navigateur web) qui émet des *requêtes*
* Le serveur qui, lorsqu'il reçoit une requête, renvoie une *réponse* au client

![Illustration du protocole HTTP](wiki-images/HTTP.png)

Avec Node.js ou Express, cela se traduit dans le code. Ce code est extrait d'une application Express :

```javascript
app.get('/', (req, res) => {
  res.send('Hello World')
})
```

Ce code indique comment doit se comporter le serveur, lorsqu'il reçoit une requête sur l'URL `/`. La fonction en paramètre est exécutée à chaque requête sur `/`.

Les paramètres de cette fonction sont :

* `req`, un objet qui contient les informations sur la requête reçue du client. Par exemple, quelle URL a été demandée.
* `res`, un objet qui contient les informations sur la réponse que le serveur *va envoyer* au client. L'envoi effectif de la réponse se fait en appelant `res.send()` comme ci-dessus.

> Rends toi dans le dossier `exemples/serveur/`.
>
> * Lance la commande `npm install`, *la 1ère fois seulement*.
> * Lance le serveur avec `node exemple1-base.js`. Pour l'interrompre: Ctrl+C

Une fois le serveur lancé, visite les URL [http://localhost:4000](http://localhost:4000) et [http://localhost:4000/about](http://localhost:4000/about).

Quelque chose doit s'afficher à chaque fois. Maintenant, si tu visites [http://localhost:4000/nimporte-quoi](http://localhost:4000/nimporte-quoi), tu obtiens le message `Cannot GET /nimporte-quoi` : lorsque le serveur reçoit une URL qui n'a pas été prise en compte par un `app.get()`, il va renvoyer une erreur, indiquant que la page n'existe pas. Tu peux obtenir des détails sur cette erreur en ouvrant la console (F12) et en allant sur l'onglet Network ou Réseau (il faut recharger la page) :

![Détails de l'erreur, dans Google Chrome](wiki-images/express-404-chrome.png)

Dans l'unique ligne de la liste de requêtes/réponses au serveur, il y a une colonne "Status" où est indiqué "404 Not Found". Le code 404 est un "code de statut" numérique, "Not Found" est une description plus explicite sous forme d'une chaîne de caractères.

> Regarde les exemples sous `exemples/serveur`, tous préfixés par `exempleN`.
> Je n'ai pas eu le temps de faire plus de doc que les commentaires dans le code...
