# Test technique Frontend - MapBrain

Cette application a été créée avec Next.js 15 (App Router) et Tailwind CSS.

## Lancement de l'application

Pour lancer l'application en local, suivez ces étapes :

1.  Installez les dépendances :
    ```bash
    npm install
    # or
    pnpm install
    ```
2.  Lancez le serveur de développement :
    `bash
    npm run dev
    # or
    pnpm dev
    `
    Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Gestion du rendu (ISR - Incremental Static Regeneration & SSG - Static Site Generation)

J'ai opté pour une stratégie de rendu mixte :

- **Page liste des posts (`/posts`) : ISR (Incremental Static Regeneration)**

  - **Pourquoi ISR ?** Les données des posts ne changent pas très fréquemment. Il est donc inutile de les re-fetcher à chaque requête (SSR). Le SSG (Static Site Generation) simple n'est pas idéal non plus, car on veut pouvoir mettre à jour la liste sans avoir à redéployer toute l'application.
  - **Implémentation :** J'utilise l'option `{ next: { tags: ['posts'] } }` dans l'appel `fetch` pour la liste des posts. Cela permet à Next.js de mettre en cache les données et de les servir de manière statique, tout en permettant une revalidation manuelle.

- **Page de détail d'un post (`/posts/[id]`) : SSG (Static Site Generation) ou cache indéfini**
  - **Pourquoi SSG/Cache indéfini ?** Les données d'un post individuel, une fois publiées, sont généralement immuables. Une revalidation fréquente n'est pas nécessaire. En retirant l'option `next: { tags: ['posts'] }` de l'appel `fetch` pour les posts individuels, Next.js mettra en cache ces pages indéfiniment après la première requête ou les générera statiquement si elles sont pré-rendues. Cela optimise les performances en évitant des re-fetches inutiles.

## Rafraîchissement du cache

Le rafraîchissement du cache est géré de deux manières :

1.  **Revalidation manuelle :** Un bouton "Rafraîchir la liste" sur la page `/posts` permet de déclencher une revalidation manuelle. Ce bouton appelle une "Server Action" (`revalidatePosts`) qui utilise la fonction `revalidateTag('posts')` de Next.js pour invalider le cache des données taguées avec `posts`.
2.  **Revalidation temporelle (non implémentée) :** On pourrait également ajouter une revalidation basée sur le temps en ajoutant `revalidate: 3600` (par exemple, pour une heure) dans les options de `fetch`.

## Améliorations possibles

Avec plus de temps, voici quelques améliorations que j'aurais pu apporter :

- **Pagination :** Pour la liste des posts, une pagination côté serveur serait plus performante que de charger tous les posts en une seule fois.
- **Tests :** Ajouter des tests unitaires et d'intégration pour garantir la robustesse de l'application.
- **Design et UX :** Améliorer le design général et l'expérience utilisateur, par exemple en ajoutant des transitions plus fluides ou des animations.
