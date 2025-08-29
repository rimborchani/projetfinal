# ✅ Validation générique par exécution et résultat

Cette méthode valide n’importe quel programme Blockly en simulant l’exécution des blocs et en comparant l’état final avec un objectif attendu.

## Principe

- Chaque bloc connu est mappé à une action qui met à jour un état (position, direction, temps, messages, etc.).
- On lit les blocs du workspace, on exécute la chaîne (repeat inclus) sans `eval`.
- On compare l’état final à un « goal » déclaré par la leçon.

## Critère dynamique: `state_goal`

Ajoutez dans votre leçon un critère du type:

```json
{
  "type": "state_goal",
  "goal": {
    "position": { "x": 100, "y": 0, "tolerance": 0.5 },
    "direction": 90,
    "message": "Fini!"
  },
  "successMessage": "🎉 Objectif atteint!",
  "errorMessage": "❌ Le résultat ne correspond pas encore"
}
```

Champs possibles dans `goal`:
- `position`: cible `{ x, y, tolerance? }`
- `direction`: direction finale (en degrés)
- `message`: dernier message dit par le sprite

## Exemples

### 1) Avancer de 100 pas vers la droite

```json
{
  "type": "state_goal",
  "goal": { "position": { "x": 100, "y": 0, "tolerance": 0.5 }, "direction": 90 }
}
```

L’étudiant peut utiliser un seul bloc "avancer 100", ou plusieurs (50 + 50), ou une boucle; tout est valide si la position finale est (≈100, 0) et la direction 90°.

### 2) Dessiner un carré (objectif par étape)

Pour une étape finale simple (exige juste la rotation finale à 0° et retour au point d’origine):

```json
{
  "type": "state_goal",
  "goal": { "position": { "x": 0, "y": 0, "tolerance": 1 }, "direction": 90 }
}
```

Vous pouvez combiner avec d’autres critères (présence de boucle, valeur 4, etc.) si besoin.

### 3) Dire un message à la fin

```json
{
  "type": "state_goal",
  "goal": { "message": "Carré terminé!" }
}
```

## Implémentation

- Simulateur: `src/lib/blockExecutor.js`
- Ajout dans le validateur dynamique: critère `state_goal` dans `src/lib/validation.js`

## Notes

- La simulation applique un modèle simple compatible Scratch (direction 90° = droite).
- `control_repeat` exécute son sous-empilement (SUBSTACK) n fois.
- `motion_glide` est simplifié (déplacement instantané + temps incrémenté).
- Des blocs inconnus sont ignorés (no-op) mais le flux continue.
