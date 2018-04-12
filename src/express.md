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

> Rends toi dans le dossier `exemples/serveur/`.
> Avant toute chose lance la > commande `npm install`.
>
> * Ouvre `exemple1-base.js`, et lance pouet
