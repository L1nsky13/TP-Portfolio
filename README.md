# 🎨 Portfolio de Théodore NAJMAN

Portfolio personnel développé en HTML, CSS et JavaScript, présentant mon parcours, mes compétences et mes projets.

## Lien vers Scalingo

(https://portfolio-theodorenajman.osc-fr1.scalingo.io/)

## 📖 Présentation du projet

À l'aide de l'IA, on créé un portfolio présentant mon parcours, mes compétences et mes projets en respectant ces 2 contraintes : documenter chaque prompt utilisé et enregistrer la progression étape par étape.

### 🎯 Objectifs du portfolio
- Présenter mon identité professionnelle et mon parcours
- Mettre en valeur mes compétences techniques et mes soft skills
- Exposer mes projets réalisés avec captures d'écran
- Offrir un moyen de contact professionnel
- Démontrer ma maîtrise des technologies web modernes

### 🌟 Caractéristiques principales
- ✅ **Design moderne** avec mode sombre/clair
- ✅ **100% responsive** (mobile, tablette, desktop)
- ✅ **Animations fluides** et effets visuels soignés
- ✅ **Technologies natives** sans framework (HTML, CSS, JavaScript)
- ✅ **Performance optimisée** avec code propre et structuré
- ✅ **Expérience utilisateur** intuitive et professionnelle

---

## ✨ Fonctionnalités implémentées

### 🎯 Navigation et Interface
- **Header fixe** avec navigation fluide entre sections
- **Compteur de visites** persistant affiché dans le header (démarre à 36)
- **Toggle thème** sombre/clair avec sauvegarde localStorage
- **Animations au scroll** pour révéler progressivement le contenu
- **Design responsive** adapté à tous les écrans

### 👤 Section Hero
- **Présentation personnelle** avec photo professionnelle
- **Réseaux sociaux intégrés** (LinkedIn, GitHub, Email)
- **Bouton CTA** pour navigation vers la section À propos
- **Animations d'entrée** avec effet slide et zoom

### 📚 Section À propos
- **Biographie personnelle** détaillée et authentique
- **Parcours scolaire interactif** :
  - Timeline cliquable avec 3 établissements
  - Liens externes vers les sites des écoles
  - Animations au survol
- **Parcours professionnel** :
  - 2 expériences détaillées (bénévolat, job d'été)
  - Descriptions des missions et compétences acquises

### 💼 Section Compétences
- **Compétences techniques** (4 technologies) :
  - Icônes uniformes 100px × 100px
  - Titres et descriptions pour chaque compétence
  - Animations staggered (apparition progressive)
  - Technologies : HTML5, CSS3, Python, GoLang
  
- **Savoir-être** (6 soft skills) :
  - Passionné 🔥
  - Autonome 🚀
  - Investi 💪
  - Rigueur 📐
  - Esprit d'équipe 🤝
  - Créativité 💡
  - Layout en grille responsive
  - Effet de survol avec translation
  
- **Centres d'intérêt** (2 hobbies) :
  - Jeux vidéos 🎮 avec description
  - Handball 🤾 avec description
  - Cartes stylisées avec émojis

### 🗂️ Section Projets
- **Carousel horizontal** avec scroll snap fluide
- **Filtrage dynamique** par technologie :
  - 6 catégories (Tous, HTML, CSS, JavaScript, PHP, GoLang)
  - Support multi-tags (un projet peut avoir plusieurs technologies)
  - Animations fade-in sur les projets filtrés
- **5 projets présentés** avec :
  - Images de prévisualisation (200px de hauteur)
  - Titres et descriptions détaillées
  - Tags de technologies utilisées
  - Liens vers GitHub et démo live
- **Navigation carousel** :
  - Boutons précédent/suivant
  - Désactivation automatique aux extrémités
  - Scroll fluide avec `scrollIntoView()`

### 📧 Section Contact
- **Formulaire de contact** avec validation en temps réel :
  - Champ **Nom** : minimum 2 caractères
  - Champ **Email** : validation regex du format
  - Champ **Message** : minimum 10 caractères
  - Messages d'erreur personnalisés
  - Feedback visuel (bordures rouges, animations shake)
  - Autocomplete désactivé pour meilleure UX
- **Envoi par mailto** directement depuis le formulaire

### 🎨 Styles et Animations
- **Variables CSS** pour gestion des couleurs et thèmes
- **Palette de couleurs** :
  - Mode sombre (défaut) : fond #2d2c2c, texte blanc, accent vert #3F8E00
  - Mode clair : fond blanc, texte noir, sections grises #F0F0F0
- **Animations CSS** :
  - `slideInLeft` : entrée depuis la gauche
  - `slideInRight` : entrée depuis la droite
  - `zoomIn` : effet de zoom
  - `shake` : secousse pour les erreurs
  - Stagger effect avec délais de 0.1s entre éléments
- **Transitions fluides** sur tous les éléments interactifs

### 💾 Persistance des données
- **LocalStorage** pour sauvegarder :
  - Préférence de thème (sombre/clair)
  - Compteur de visites (incrémentation automatique)
- **Données persistantes** entre les sessions

---
## Fonctionnalités testées
- ✅ Scroll fluide
- ✅ LocalStorage (mode sombre, compteur)
- ✅ Flexbox & Grid
- ✅ CSS Variables
- ✅ Animations CSS
- ✅ Validation HTML

---

## 📁 Structure du projet

```
Portfolio/
│
├── index.html              # Page principale
├── style.css               # Styles CSS
├── main.js                 # JavaScript
├── README.md               # Documentation du projet
│
├── assets/                 # Ressources images
│   ├── DSC02309.png       # Photo de profil
│   ├── html.png           # Icône HTML5
│   ├── css.png            # Icône CSS3
│   ├── python.png         # Icône Python
│   ├── golang.png         # Icône GoLang
│   ├── java.png           # Icône Java
│   ├── instagram.png      # Icône Instagram
│   ├── github.png         # Icône GitHub
│   ├── linkedin.png       # Icône LinkedIn
│   ├── email.png          # Icône Email
│   ├── red.png            # Projet RED GoldenEye
│   ├── landingPage.png    # Projet Landing Page
│   ├── webDynamique.png   # Projet Site Web Dynamique
│   ├── power4.png         # Projet Power'4 Web
│   └── sme.png            # Projet Steel Mentality Esport
```

---

## 🚀 Optimisations

### Performances
- ✅ Code CSS optimisé (suppression des règles inutilisées)
- ✅ Code JavaScript optimisé (suppression du code mort)
- ✅ Images organisées dans le dossier `assets/`
- ✅ Animations CSS natives (pas de JavaScript)
- ✅ Chargement rapide (pas de dépendances externes)

### Bonnes pratiques
- ✅ HTML sémantique
- ✅ Accessibilité (labels, aria-labels)
- ✅ CSS modulaire avec variables
- ✅ JavaScript non-intrusif
- ✅ Code commenté et organisé
- ✅ Mobile-first approach

---

## 📬 Contact

**Théodore NAJMAN**
- 📧 Email : [theodore.najman@gmail.com](mailto:theodore.najman@gmail.com)
- 🔗 GitHub : [@L1nsky13](https://github.com/L1nsky13)
- 💼 LinkedIn : [Théodore Najman](https://www.linkedin.com/in/th%C3%A9odore-najman-a98a0939a/)

---

## 📄 Auteur

Ce projet est un portfolio personnel réalisé dans un projet YBOOST.

© 2025 Théodore NAJMAN - Tous droits réservés

---# TP-Portfolio
