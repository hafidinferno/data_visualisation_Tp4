#Fait par : Hafid OUCOUC /Khalil FERHATI
# Visualisation de Matrice d'Adjacence - Game of Thrones

Ce projet est une visualisation interactive de données basée sur l'univers de **Game of Thrones**. Il utilise la bibliothèque **D3.js** pour représenter les relations entre les personnages sous forme de matrice d'adjacence.

## 📋 Description

L'application affiche une matrice où :
- Les **lignes** et **colonnes** représentent les personnages.
- Les **cases** représentent les liens (interactions) entre deux personnages.
- La **couleur** indique la zone d'appartenance (si les deux personnages sont de la même zone).
- L'**opacité** de la case représente la force du lien (poids).

## ✨ Fonctionnalités

- **Matrice d'Adjacence Interactive** : Visualisation claire des connexions entre personnages.
- **Encodage Visuel** :
  - **Couleur** : Différenciation par zone (ex: Nord, Port-Réal, etc.).
  - **Opacité** : Indique l'importance de la relation (plus c'est foncé, plus le lien est fort).
- **Tri Dynamique** :
  - **Ordre d'apparence** : Tri par défaut selon l'identifiant du personnage.
  - **Zone** : Regroupe les personnages par leur zone géographique.
  - **Influence** : Trie les personnages par leur niveau d'influence (décroissant).

## 🚀 Installation et Lancement

Pour fonctionner correctement (chargement des données JSON), ce projet nécessite un serveur web local.

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge, etc.).
- [Python](https://www.python.org/downloads/) installé sur votre machine.

### Instructions

1. **Ouvrez un terminal** dans le dossier du projet :
   ```bash
   cd c:\Users\hafid\Desktop\dataVisTp4
   ```

2. **Lancez un serveur local** avec Python :
   
   Si vous avez Python 3 :
   ```bash
   python -m http.server 8000
   ```
   
   *Si cela ne fonctionne pas, essayez `python3` au lieu de `python`.*

3. **Accédez à l'application** :
   Ouvrez votre navigateur et allez à l'adresse suivante :
   [http://localhost:8000](http://localhost:8000)

## 📂 Structure du Projet

- **`index.html`** : Structure principale de la page.
- **`script.js`** : Logique D3.js pour le rendu de la matrice et les animations.
- **`matrixManagement.js`** : Fonctions utilitaires pour transformer les données JSON en format matrice.
- **`style.css`** : Styles pour la mise en page.
- **`got_social_graph.json`** : Données brutes (noeuds et liens) du réseau social de Game of Thrones.

## 🛠️ Technologies Utilisées

- **HTML5 / CSS3**
- **JavaScript (ES6)**
- **D3.js (v7)** : Manipulation de documents basée sur les données.

---
*Ce projet a été réalisé dans le cadre du TP4 de Visualisation de Données.*

