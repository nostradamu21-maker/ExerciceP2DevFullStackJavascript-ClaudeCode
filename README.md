# TéléSport - Application Olympiques (Starter Code)

## Description

Application web interactive permettant de consulter les statistiques des médailles olympiques par pays. Ce code de démarrage est fourni pour l'exercice 1 du projet.

## Fonctionnalités

- **Dashboard** : Vue d'ensemble avec graphique circulaire et liste des pays
- **Page de détail** : Statistiques détaillées d'un pays avec graphique d'évolution
- **Navigation** : Système de routing client-side avec History API

## Technologies utilisées

- HTML5
- CSS3
- JavaScript ES6+
- Chart.js (via CDN)

## Installation

1. Clonez ou téléchargez ce dépôt
2. Ouvrez le dossier dans votre éditeur de code

## Lancement de l'application

⚠️ **Important** : L'application utilise `fetch()` pour charger les données. Vous devez donc utiliser un serveur local pour éviter les erreurs CORS.

### Option 1 : Avec Python

Si vous avez Python installé :

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8000`

### Option 2 : Avec Node.js

Si vous avez Node.js installé, vous pouvez utiliser `npx` :

```bash
npx http-server -p 8000
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8000`

### Option 3 : Avec l'extension VS Code

Si vous utilisez VS Code, installez l'extension **Live Server** et cliquez sur "Go Live" en bas à droite.

## Structure du projet

```
telesport-starter-code/
├── index.html              # Page HTML principale
├── app.js                  # Logique JavaScript (tout en un fichier)
├── styles.css              # Styles CSS
├── olympic-data.json       # Données mockées
└── README.md               # Ce fichier
```

## Navigation

- Page d'accueil : `/`
- Page de détail d'un pays : `/country/:id` (exemple : `/country/1` pour la France)

## Objectif de l'exercice

Ce code de démarrage fonctionne mais présente plusieurs problèmes d'architecture :

- ❌ Tout le code est dans un seul fichier
- ❌ Pas de séparation des responsabilités
- ❌ Code dupliqué
- ❌ Pas d'utilisation de design patterns
- ❌ Variables globales
- ❌ Pas de modularité

**Votre mission** : Refactoriser ce code pour mettre en place une architecture modulaire et maintenable en suivant les bonnes pratiques du développement JavaScript moderne.

## Données

Les données sont mockées dans le fichier `olympic-data.json` et contiennent les informations de 5 pays avec leurs participations aux JO de 2012, 2016 et 2020.

## Support

Pour toute question, consultez les spécifications fonctionnelles du projet.

---

**Version** : 1.0 (Starter Code)
