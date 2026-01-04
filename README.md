# Jogo Científico Integrador (MVP)

Web app/PWA para integrar **macroinvertebrados**, **algas**, **peixes** e **carbono** (sedimento/água/atmosfera).
Inclui: teoria em trilhas, Sankey e quiz por níveis.

## Rodar localmente
Alguns navegadores bloqueiam `fetch()` abrindo `index.html` via `file://`. Use servidor local:

```bash
python -m http.server 8000
```

Acesse: http://localhost:8000

## Publicar no GitHub Pages
1) Suba tudo para um repositório  
2) Settings → Pages → Deploy from branch → main / root  
3) Abra o link e instale como app (PWA)

## Onde editar
- Teoria: `js/content.js`
- Sankey: `data/sankey.json`
- Questões: `js/questions.js`
