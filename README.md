
# Le Greffe — Vocabulaire NL → FR

Petite application web de quiz pour réviser du vocabulaire juridique néerlandais → français (droit des obligations). Projet réalisé dans le cadre d'un apprentissage pratique de JavaScript.

## Fonctionnalités

- **Deux modes de révision** :
  - **Dossier complet** : tous les mots, tirés aléatoirement sans répétition.
  - **Par chapitre** : révision ciblée sur l'un des 20 chapitres du programme.
- **Questions ouvertes** (pas de QCM) : traduction à taper librement, comparaison insensible à la casse, aux espaces et aux variantes d'apostrophe (utile notamment sur clavier iOS).
- **Feedback immédiat** après chaque réponse, avec la bonne traduction mise en évidence en cas d'erreur.
- **Arrêt à tout moment** : la session peut être close manuellement, avec affichage du score final.
- Interface sur le thème d'un dossier judiciaire (parchemin, tampon de validation/rejet, onglets de classeur numérotés).

## Stack technique

- HTML / CSS (aucun framework)
- JavaScript (ES6, modules natifs — pas de bundler)
- Données stockées dans un fichier `data.json` statique

## Structure du projet

```
.
├── index.html
├── style.css
├── js/
│   ├── main.js      # orchestration, écouteurs d'événements
│   ├── ui.js        # manipulation du DOM, affichage
│   ├── utils.js     # état du quiz (score, mots restants, mot actuel...)
│   └── api.js        # récupération des données (fetch)
└── data/
    └── data.json     # 415 entrées de vocabulaire, réparties en 20 chapitres
```

Chaque entrée de `data.json` a la forme suivante :

```json
{
  "id": 1,
  "numeroChapitre": 1,
  "libelleChapitre": "Introduction générale",
  "versionFR": "le droit des obligations",
  "versionNL": "het verbintenissenrecht"
}
```

## Lancer le projet en local

Le chargement des données se fait via `fetch()`, ce qui nécessite un serveur local (le protocole `file://` ne fonctionne pas à cause des restrictions CORS des navigateurs).

1. Cloner le dépôt
2. Ouvrir le dossier dans VS Code
3. Lancer `index.html` avec l'extension **Live Server**

## Déploiement

Le projet est un site statique, déployable tel quel sur [Netlify](https://www.netlify.com/) (glisser-déposer du dossier, ou connexion au dépôt GitHub) — aucune configuration de build nécessaire.

## Origine des données

Le vocabulaire provient d'un support de cours (Excel), transformé en `data.json` en conservant le déterminant de chaque mot (`de`/`het` en néerlandais, `le`/`la`/`l'`/`les` en français).

## Pistes d'évolution

- Mode QCM en complément des questions ouvertes
- Suivi de progression persistant (`localStorage`) : meilleur score, série de bonnes réponses (streak)
- Répétition espacée des mots les plus souvent ratés
