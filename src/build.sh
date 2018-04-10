#!/bin/sh
pandoc -s --toc --css=css/pandoc-github.css --css=css/pandoc-styles.css -f markdown -t html5 src/dom.md -o ./index.html