# Apunts de Cures Infermeres II

Web interactiva d'estudi per a l'examen de **Cures Infermeres en Alteracions de la Salut II**: oftalmologia, dermatologia, vascular, hematologia, oncologia i genètica.

## Què hi ha

- **Apunts**: tots els temes amb taules, figures i requadres de colors (groc = clau d'examen, vermell = alerta, verd = mnemotècnia, lila = error dels apunts originals). Filtre de repàs ràpid, cercador i progrés per tema.
- **Targetes**: 56 preguntes amb resposta per girar, filtrables per bloc.
- **Test**: 151 preguntes que cobreixen els 37 temes, en rondes de 10 que avancen en l'ordre dels apunts. Les encertades no tornen a sortir; les fallades tornen en rondes següents fins que s'encerten dues vegades. Quan falles, surt la resposta correcta i el fragment dels apunts on apareix. Un panell mostra el percentatge del temari dominat per bloc.
- **Eines**: compatibilitat d'hematies, calculadora de l'índex turmell-braç i interpretació de l'INR.

## Com obrir-la

Obre `index.html` al navegador. No cal cap servidor ni instal·lar res. El progrés es desa al navegador (`localStorage`).

## Fitxers

- `index.html`: estructura i contingut dels apunts
- `estils.css`: disseny (tema clar i fosc)
- `dades.js`: targetes i factors de l'INR
- `preguntes.js`: banc de preguntes del test, amb el tema i el text dels apunts de cada una
- `app.js`: navegació, cerca, progrés, targetes, test i eines
- `img/`: figures dels apunts originals de l'assignatura

Material de repàs: no substitueix els apunts de l'assignatura ni el criteri del professorat.
