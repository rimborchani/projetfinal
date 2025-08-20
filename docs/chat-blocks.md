# Blocs de Chat - Documentation

## Vue d'ensemble

Les blocs de chat permettent aux étudiants de créer des applications de messagerie simples et interactives. Ces blocs sont traduits en arabe tunisien pour une meilleure accessibilité.

## Blocs Disponibles

### 💬 ابعث رسالة (Send Message)
- **Fonction** : Envoie un message dans le chat
- **Paramètres** : Texte du message
- **Exemple** : `ابعث رسالة "أهلا وسهلا"`

### ↩️ رد على الرسالة (Reply to Message)
- **Fonction** : Répond à la dernière message reçu
- **Paramètres** : Texte de la réponse
- **Exemple** : `رد على الرسالة "شكرا لك"`

### 👤 حط اسم المستخدم (Set Username)
- **Fonction** : Définit le nom d'utilisateur pour les messages
- **Paramètres** : Nom d'utilisateur
- **Exemple** : `حط اسم المستخدم "أحمد"`

### 😊 زيد إيموجي (Add Emoji)
- **Fonction** : Ajoute un emoji au chat
- **Paramètres** : Choix d'emoji (😀, 😂, ❤️, 👍, 🔥, 💯, 🎉, 👏)
- **Exemple** : `زيد إيموجي "😀"`

### 📨 استنى رسالة جديدة (Wait for Message)
- **Fonction** : Attend qu'un nouveau message arrive
- **Utilisation** : Pour créer des interactions en temps réel

### ⌨️ أظهر "يكتب..." (Show Typing)
- **Fonction** : Affiche l'indicateur de frappe
- **Durée** : 2 secondes automatiquement

### 🗑️ امسح كل الرسائل (Clear Messages)
- **Fonction** : Efface tous les messages du chat
- **Utilisation** : Pour remettre à zéro la conversation

### 🤖 رد تلقائي (Auto Reply)
- **Fonction** : Configure une réponse automatique
- **Options** :
  - "أهلا وسهلا" (welcome)
  - "شكرا لك" (thanks)
  - "معذرة، مش موجود" (away)
  - "كيفك؟" (howru)
  - "باي!" (bye)

## Leçons Incluses

### Leçon 5: "التشات البسيط - Simple Chat"
Introduction aux concepts de base du chat :
- Configuration du nom d'utilisateur
- Envoi de messages simples
- Utilisation d'emojis

### Leçon 6: "شات تفاعلي - Interactive Chat"
Fonctionnalités avancées du chat :
- Indicateur de frappe
- Réponses automatiques
- Gestion du timing

## Interface Utilisateur

Le stage de chat inclut :
- **Header** : Statut de connexion et nom d'utilisateur
- **Zone de messages** : Affichage des conversations
- **Styles visuels** : Bulles de messages colorées selon le type
- **Horodatage** : Heure d'envoi des messages

## Types de Messages

1. **Messages envoyés** : Fond bleu, alignés à droite
2. **Réponses** : Fond vert, avec référence au message original
3. **Messages système** : Fond gris, centrés
4. **Emojis** : Fond jaune, avec emojis agrandis

## Utilisation en Classe

Ces blocs permettent d'enseigner :
- **Programmation séquentielle** : Ordre des actions
- **Interaction utilisateur** : Réponses et feedback
- **Gestion d'état** : Noms d'utilisateur, messages
- **Logique conditionnelle** : Réponses automatiques
- **Timing et synchronisation** : Attentes et délais

## Exemples de Programmes

### Programme Simple
```
كي الراية تتنقر
حط اسم المستخدم "سارة"
ابعث رسالة "مرحبا بالجميع!"
زيد إيموجي "👋"
```

### Programme Interactif
```
كي الراية تتنقر
حط اسم المستخدم "بوت الترحيب"
أظهر "يكتب..."
استنى 2 ثانية
ابعث رسالة "أهلا! كيف يمكنني مساعدتك؟"
حط رد تلقائي "أهلا وسهلا"
```

## Notes Techniques

- Les messages sont affichés en temps réel dans l'interface
- L'horodatage utilise le format tunisien (24h)
- Les fonctions runtime gèrent l'affichage visuel
- Compatible avec tous les navigateurs modernes
