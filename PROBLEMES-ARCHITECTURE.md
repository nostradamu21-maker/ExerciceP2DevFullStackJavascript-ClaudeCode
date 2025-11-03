# Problèmes d'architecture du code actuel

Ce document identifie les problèmes d'architecture présents dans le starter code. Utilisez-le comme guide pour votre refactorisation.

## 🚨 Problèmes identifiés

### 1. Code monolithique (tout dans un seul fichier)

**Problème** : Tout le code JavaScript est dans `app.js` (environ 250 lignes)

**Impact** :
- Difficile à maintenir
- Difficile à tester
- Pas de réutilisabilité
- Mauvaise organisation

**Solution attendue** :
- Séparer en modules distincts (services, pages, composants, router)
- Créer une structure de dossiers claire

---

### 2. Variables globales

**Problème** : Utilisation de variables globales

```javascript
let data = [];
let chart = null;
```

**Impact** :
- Risque de conflits de noms
- État partagé difficile à gérer
- Difficile à tester

**Solution attendue** :
- Encapsuler dans des modules
- Utiliser le pattern Singleton pour le service de données
- Gérer l'état de manière contrôlée

---

### 3. Aucune séparation des responsabilités

**Problème** : Les fonctions mélangent plusieurs responsabilités

Par exemple, `showDashboard()` :
- Gère le HTML (rendu)
- Calcule les statistiques (logique métier)
- Crée les graphiques (visualisation)

**Impact** :
- Code difficile à comprendre
- Impossible de réutiliser les parties
- Difficile à tester

**Solution attendue** :
- Séparer les services (gestion des données)
- Séparer les pages (rendu et logique d'affichage)
- Séparer les utilitaires (calculs)

---

### 4. Code dupliqué

**Problème** : Logique de calcul des totaux répétée plusieurs fois

Exemple dans `showDashboard()` :
```javascript
let total = 0;
for (let j = 0; j < country.participations.length; j++) {
    total += country.participations[j].medalsCount;
}
```

Répété dans `showCountryDetail()` et ailleurs.

**Impact** :
- Maintenance difficile
- Risque d'incohérence
- Code verbeux

**Solution attendue** :
- Créer des fonctions utilitaires réutilisables
- Créer un modèle Country avec des méthodes calculées

---

### 5. Manipulation directe du DOM avec innerHTML

**Problème** : Construction de HTML avec des chaînes de caractères

```javascript
html += '<div class="country-card" onclick="goToCountry(' + country.id + ')">';
html += '<h3>' + country.name + '</h3>';
// ...
```

**Impact** :
- Risque de failles XSS
- Code difficile à lire
- Gestion des événements inline (mauvaise pratique)
- Pas de réutilisabilité

**Solution attendue** :
- Créer des fonctions de création d'éléments DOM
- Utiliser createElement et appendChild
- Ou utiliser des template literals proprement
- Séparer en composants réutilisables

---

### 6. Routing simpliste

**Problème** : Gestion basique du routing dans `handleRoute()`

```javascript
if (path === '/' || path === '/index.html') {
    // ...
} else if (path.includes('/country/')) {
    // ...
}
```

**Impact** :
- Pas extensible
- Pas de gestion d'erreur 404
- Difficile d'ajouter de nouvelles routes

**Solution attendue** :
- Créer un module Router dédié
- Utiliser un système de routes configurables
- Gérer les cas d'erreur

---

### 7. Pas de gestion d'erreurs

**Problème** : Gestion minimale des erreurs

```javascript
.catch(error => {
    console.error('Erreur:', error);
});
```

**Impact** :
- Mauvaise expérience utilisateur
- Difficile à débugger

**Solution attendue** :
- Afficher des messages d'erreur à l'utilisateur
- Gérer les cas de pays non trouvé
- Gérer les erreurs de chargement de données

---

### 8. Pas de design patterns

**Problème** : Aucun design pattern utilisé

**Impact** :
- Architecture non structurée
- Pas de conventions reconnues
- Difficile pour d'autres développeurs de comprendre

**Solution attendue** :
- Singleton Pattern pour les services
- Module Pattern pour l'encapsulation
- Observer Pattern pour la communication entre modules (optionnel)

---

### 9. Gestion du graphique problématique

**Problème** : Variable globale `chart` et destruction manuelle

```javascript
if (chart) {
    chart.destroy();
}
```

**Impact** :
- État global difficile à gérer
- Risque de memory leaks
- Pas adapté si plusieurs graphiques

**Solution attendue** :
- Encapsuler dans un service de graphiques
- Gérer le cycle de vie proprement

---

### 10. Boucles for traditionnelles

**Problème** : Utilisation de boucles `for` à l'ancienne

```javascript
for (let i = 0; i < data.length; i++) {
    const country = data[i];
    // ...
}
```

**Impact** :
- Code verbeux
- Pas moderne (ES6+)

**Solution attendue** :
- Utiliser les méthodes de tableau modernes : `map()`, `filter()`, `reduce()`, `forEach()`
- Code plus lisible et fonctionnel

---

## 📋 Checklist de refactorisation

Utilisez cette checklist pour vous assurer que vous avez corrigé tous les problèmes :

- [ ] Structure de dossiers modulaire créée
- [ ] Services séparés (DataService, ChartService)
- [ ] Pages séparées (DashboardPage, CountryDetailPage)
- [ ] Router indépendant
- [ ] Modèle Country avec méthodes calculées
- [ ] Composants réutilisables créés
- [ ] Plus de variables globales
- [ ] Plus de code dupliqué
- [ ] Utilisation de design patterns appropriés
- [ ] Gestion d'erreurs améliorée
- [ ] Code ES6+ moderne (modules, classes, arrow functions, méthodes de tableau)
- [ ] Documentation ajoutée (ARCHITECTURE.md)

---

## 🎯 Objectifs d'apprentissage

En corrigeant ces problèmes, vous allez :

1. Comprendre l'importance de l'architecture logicielle
2. Maîtriser les modules JavaScript ES6
3. Appliquer des design patterns reconnus
4. Améliorer la maintenabilité du code
5. Préparer le code pour de futures évolutions

Bon courage ! 💪
