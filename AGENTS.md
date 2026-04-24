# AGENTS.md

## Objectif

Ce depot utilise ce fichier comme contrat de travail local pour les agents de code et les collaborateurs.

## Contexte Du Projet

- Stack : Next.js 15 + React 19
- Structure App Router dans `app/`
- UI partagee dans `components/`
- Contenu, etat du store et helpers dans `lib/`
- Assets statiques dans `public/`
- Fichier de configuration principal : `next.config.mjs`
- Langue par defaut de l'interface : francais, avec un bouton de bascule anglais deja present dans l'application

## Source De Verite

- Considerer `package.json` comme la source de verite pour les commandes executables.
- Considerer `package-lock.json` comme la source de verite pour les versions de dependances installees.
- Si ces deux fichiers divergent, corriger l'incoherence avant d'affirmer que le projet est sain.

## Commandes

- Developpement : `npm run dev`
- Build de production : `npm run build`
- Serveur de production : `npm run start`

## Style De Travail

- Faire des changements cibles et garder des diffs faciles a relire.
- Preserver l'architecture actuelle, sauf si la tache demande explicitement un refactor.
- Reutiliser les patterns existants dans les fichiers voisins avant d'introduire une nouvelle abstraction.
- Preferer un code React client simple a des indirections trop astucieuses.
- Utiliser ASCII par defaut, sauf si un fichier repose deja volontairement sur du texte non ASCII.

## Regles Frontend

- Conserver le parcours boutique/e-commerce actuel : accueil, boutique, fiche produit, panier, compte, confirmation, avis, contact, a propos.
- Preserver le comportement bilingue existant lors des modifications de textes visibles par l'utilisateur.
- Garder des layouts responsive et verifier a la fois les versions desktop et mobile pour tout travail d'interface.
- Reutiliser les classes CSS et la structure de composants existantes avant d'ajouter de nouveaux patterns de style.
- Favoriser la coherence avec `SiteNavbar`, `SiteFooter`, `StoreProvider` et les patterns actuels de structure de page.

## Regles Mobile

- Considerer la version mobile comme prioritaire pour toute modification de hero, navigation ou carte produit.
- Verifier au minimum des largeurs proches de `390px` et `430px`, en plus du desktop.
- Aucun debordement horizontal n'est autorise.
- Aucun texte ne doit etre coupe, superpose ou masque sur mobile.
- Tout hero doit avoir une adaptation mobile explicite si la version desktop ne se replie pas naturellement.

## Regles E-commerce

- Ne jamais casser le parcours `accueil -> boutique -> produit -> panier -> confirmation`.
- Garder visibles et fonctionnels les boutons d'action importants, en particulier sur mobile.
- Preserver la coherence entre les images produit, les prix, le panier et les pages de confirmation.
- Toute modification de carte produit ou de fiche produit doit rester lisible et utilisable sur petit ecran.

## Regles Bilingues

- Tout nouveau texte visible par l'utilisateur doit exister en francais et en anglais.
- Ne pas laisser de contenu ajoute dans une seule langue si le composant est deja bilingue.
- Conserver la logique existante basee sur le toggle de langue et les contenus conditionnels.

## Regles Carrousel

- Tout carrousel mobile doit rester utilisable au doigt.
- Favoriser le swipe horizontal sur mobile quand le composant est principal dans la page.
- Les controles du carrousel ne doivent jamais masquer le contenu essentiel.
- Les images du carrousel doivent rester responsives, non etirees et non coupees de maniere problematique.
- Si une version mobile dediee existe, elle peut avoir des controles simplifies tant que la navigation reste claire.

## Regles De Validation

- Pour les changements de configuration, lancer d'abord la verification pertinente la plus petite possible.
- Pour les changements applicatifs, privilegier `npm run build` comme etape principale de verification quand c'est faisable.
- Si une commande ne peut pas etre lancee, expliquer exactement pourquoi.
- Ne jamais dire que le lint ou les tests sont passes s'ils n'ont pas vraiment ete executes.
- Pour les changements UI importants, preciser clairement si la verification a ete faite seulement en local ou aussi sur la version deployee.

## Workflow Des Agents

- Utiliser un agent pour relire et verifier le codebase avant ou pendant un travail substantiel.
- Utiliser un agent separe pour appliquer des correctifs minimaux confirmes lorsque le travail en parallele est utile.
- L'agent de revue doit signaler les bugs, risques, regressions, scripts manquants et manques de verification.
- L'agent de correction doit eviter les reecritures speculatives et ne corriger que les problemes qu'il peut confirmer.
- Ne pas laisser un agent ecraser le travail d'un autre sans avoir d'abord lu l'etat le plus recent du fichier.

## Securite

- Ne jamais annuler des changements utilisateur sans rapport.
- Partir du principe que le worktree peut deja etre sale.
- Lire les fichiers avant de les modifier.
- Eviter les commandes git destructrices sauf demande explicite de l'utilisateur.

## Communication

- Resumer les changements dans un langage simple.
- Signaler clairement les hypotheses, blocages et verifications sautees.
- Preferer la clarte aux suppositions quand l'etat du depot est incomplet ou incoherent.

## Regles Git Et Deploiement

- Toujours verifier la branche courante avant d'annoncer un push ou un deploiement.
- Toujours distinguer un changement local d'un changement effectivement publie.
- Avant de dire qu'un changement est en ligne, confirmer qu'il a ete pousse vers la branche surveillee par Vercel.
- En cas de doute sur le deploiement, verifier la version servie par le site publie plutot que de supposer.
