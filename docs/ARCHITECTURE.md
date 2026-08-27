# Architecture de Fongona City

Fongona City est un projet indépendant de simulation de ville et de monde virtuel.

## Projets associés

Fongona City peut éventuellement communiquer avec :

- Evolux — évolution et expérimentation
- NanoAI — agents et intelligence artificielle expérimentale
- Redmaniac Core — futur noyau logiciel commun

Les projets restent séparés. Une connexion éventuelle doit utiliser des interfaces, modules ou API clairement définis.

## Principe

```text
                 Redmaniac Core
                       |
          +------------+------------+
          |            |            |
          v            v            v
     Fongona City    Evolux       NanoAI
       monde          évolution     IA
cd /storage/emulated/0/Download/Fogona_City && \
mkdir -p docs core modules api assets config backups && \

cat > docs/ARCHITECTURE.md <<'EOF'
# Architecture de Fongona City

Fongona City est un jeu et une simulation de monde virtuel vivant.

Le jeu reste indépendant, mais son architecture est préparée pour permettre l'ajout futur de modules et la communication avec d'autres projets.

## Projets pouvant être connectés

- Fongona City — monde et simulation
- Evolux — évolution et expérimentation
- NanoAI — intelligence artificielle et agents
- Redmaniac Core — futur noyau logiciel commun

Les projets restent séparés afin de préserver leur identité et leur fonctionnement.

## Plateformes envisagées

- Android
- PC
- serveur
- systèmes IA
- robots et agents autonomes
