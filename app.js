/* Cures Infermeres II · lògica de la web */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const desa = (clau, valor) => { try { localStorage.setItem(clau, JSON.stringify(valor)); } catch (e) {} };
  const llegeix = (clau, perDefecte) => {
    try { const v = localStorage.getItem(clau); return v ? JSON.parse(v) : perDefecte; } catch (e) { return perDefecte; }
  };
  const num = (n, dec = 2) => n.toLocaleString('ca', { maximumFractionDigits: dec, minimumFractionDigits: 0 });
  const barreja = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  // Treu accents caràcter a caràcter (manté la llargada per poder ressaltar)
  const normChar = (c) => c.normalize('NFD')[0].toLowerCase();
  const norm = (s) => [...s].map(normChar).join('');

  /* ---------------- Tema clar / fosc ---------------- */
  const arrel = document.documentElement;
  $('#boto-tema').addEventListener('click', () => {
    const fosc = arrel.dataset.tema
      ? arrel.dataset.tema === 'fosc'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    arrel.dataset.tema = fosc ? 'clar' : 'fosc';
    try { localStorage.setItem('cias-tema', arrel.dataset.tema); } catch (e) {}
  });

  /* ---------------- Vistes (rutes amb #) ---------------- */
  const vistes = $$('.vista');
  const enllacosMode = $$('.modes a');
  let vistaActual = null;

  function mostraVista(nom) {
    if (nom === vistaActual) return;
    vistaActual = nom;
    vistes.forEach(v => { v.hidden = v.dataset.vista !== nom; });
    enllacosMode.forEach(a => {
      if (a.dataset.vista === nom) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (nom === 'targetes') Targetes.inicia();
    if (nom === 'test') Test.inicia();
  }

  function encamina() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (['targetes', 'test', 'eines'].includes(h)) {
      mostraVista(h);
      window.scrollTo(0, 0);
      return;
    }
    if (h.startsWith('eina-')) {
      mostraVista('eines');
      const el = document.getElementById(h);
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }));
      return;
    }
    mostraVista('apunts');
    if (h && h !== 'apunts') {
      const el = document.getElementById(h);
      if (el) requestAnimationFrame(() => el.scrollIntoView());
    } else if (h === 'apunts') {
      window.scrollTo(0, 0);
    }
  }
  addEventListener('hashchange', encamina);

  // Enllaços dels apunts que porten a una eina concreta
  $$('[data-eina]').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      location.hash = 'eina-' + a.dataset.eina;
    });
  });

  /* ---------------- Progrés: temes repassats ---------------- */
  const temes = $$('.tema');
  const blocs = $$('.bloc');
  const fets = new Set(llegeix('cias-fets', []));

  temes.forEach(t => {
    const peu = document.createElement('div');
    peu.className = 'tema-peu';
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'boto-fet';
    b.addEventListener('click', () => {
      fets.has(t.id) ? fets.delete(t.id) : fets.add(t.id);
      desa('cias-fets', [...fets]);
      pintaProgres();
    });
    peu.append(b);
    t.append(peu);
  });

  /* ---------------- Índex lateral ---------------- */
  const llistaIndex = $('#index-blocs');
  blocs.forEach(bloc => {
    const li = document.createElement('li');
    li.className = 'index-bloc';
    li.dataset.bloc = bloc.id;
    const n = $('.bloc-n', bloc).textContent;
    const boto = document.createElement('button');
    boto.type = 'button';
    boto.setAttribute('aria-expanded', 'false');
    boto.innerHTML = `<span class="n">${n}</span><span>${bloc.dataset.nom}</span><span class="c"></span>`;
    boto.addEventListener('click', () => {
      const obert = li.classList.toggle('obert');
      boto.setAttribute('aria-expanded', String(obert));
    });
    const ol = document.createElement('ol');
    ol.className = 'index-temes';
    $$('.tema', bloc).forEach(t => {
      const h3 = $('h3', t);
      const titol = [...h3.childNodes].filter(nd => nd.nodeType === 3 || (nd.nodeType === 1 && !nd.matches('span, em, .fet-check')))
        .map(nd => nd.textContent).join('').trim();
      const a = document.createElement('a');
      a.href = '#' + t.id;
      a.dataset.tema = t.id;
      a.textContent = titol;
      const item = document.createElement('li');
      item.append(a);
      ol.append(item);
    });
    li.append(boto, ol);
    llistaIndex.append(li);
  });

  function pintaProgres() {
    const total = temes.length;
    $('#prog-n').textContent = fets.size;
    $('#prog-t').textContent = total;
    $('#prog-barra').style.width = (fets.size / total * 100) + '%';
    temes.forEach(t => {
      const fet = fets.has(t.id);
      const b = $('.boto-fet', t);
      b.setAttribute('aria-pressed', String(fet));
      b.textContent = fet ? 'Repassat' : 'Marca com a repassat';
      let check = $('.fet-check', t);
      if (fet && !check) {
        check = Object.assign(document.createElement('span'), { className: 'fet-check', textContent: 'Repassat' });
        $('h3', t).append(check);
      } else if (!fet && check) check.remove();
      const a = llistaIndex.querySelector(`a[data-tema="${t.id}"]`);
      if (a) a.classList.toggle('fet', fet);
    });
    blocs.forEach(bloc => {
      const ts = $$('.tema', bloc);
      const n = ts.filter(t => fets.has(t.id)).length;
      llistaIndex.querySelector(`[data-bloc="${bloc.id}"] .c`).textContent = `${n}/${ts.length}`;
    });
  }
  pintaProgres();

  $('#reset-prog').addEventListener('click', () => {
    if (!fets.size) return;
    if (confirm('Vols esborrar els temes marcats com a repassats?')) {
      fets.clear();
      desa('cias-fets', []);
      pintaProgres();
    }
  });

  // Tema actual mentre es llegeix
  let temaActiu = null;
  const obs = new IntersectionObserver((entrades) => {
    entrades.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      if (id === temaActiu) return;
      temaActiu = id;
      $$('.index-temes a.actiu', llistaIndex).forEach(a => a.classList.remove('actiu'));
      const a = llistaIndex.querySelector(`a[data-tema="${id}"]`);
      if (!a) return;
      a.classList.add('actiu');
      const li = a.closest('.index-bloc');
      $$('.index-bloc', llistaIndex).forEach(x => x.classList.toggle('actiu', x === li));
      if (!li.classList.contains('obert')) {
        $$('.index-bloc.obert', llistaIndex).forEach(x => { x.classList.remove('obert'); $('button', x).setAttribute('aria-expanded', 'false'); });
        li.classList.add('obert');
        $('button', li).setAttribute('aria-expanded', 'true');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  temes.forEach(t => obs.observe(t));
  // Obre el primer bloc d'entrada
  const primer = $('.index-bloc', llistaIndex);
  primer.classList.add('obert');
  $('button', primer).setAttribute('aria-expanded', 'true');

  // Índex al mòbil: calaix inferior amb fons
  const index = $('.index');
  const fons = Object.assign(document.createElement('div'), { className: 'index-fons' });
  const botoIndex = Object.assign(document.createElement('button'), { type: 'button', className: 'boto-index', textContent: 'Índex' });
  botoIndex.setAttribute('aria-expanded', 'false');
  function calaix(obrir) {
    index.classList.toggle('obert', obrir);
    fons.classList.toggle('obert', obrir);
    document.body.classList.toggle('calaix-obert', obrir);
    botoIndex.setAttribute('aria-expanded', String(obrir));
    botoIndex.textContent = obrir ? 'Tanca' : 'Índex';
  }
  botoIndex.addEventListener('click', () => calaix(!index.classList.contains('obert')));
  fons.addEventListener('click', () => calaix(false));
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && index.classList.contains('obert')) calaix(false); });
  // Si la finestra s'eixampla fins a mostrar l'índex lateral, tanca el calaix
  matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) calaix(false); });
  $('#v-apunts').append(fons, botoIndex);
  llistaIndex.addEventListener('click', (ev) => {
    if (ev.target.closest('a') && index.classList.contains('obert')) calaix(false);
  });

  // Taules: etiqueta de columna a cada cel·la, perquè al mòbil es llegeixin com a fitxes
  $$('.taula table').forEach(taula => {
    const caps = $$('thead th', taula).map(th => th.textContent.trim());
    if (caps.length >= 3) taula.parentElement.classList.add('apila');
    $$('tbody tr', taula).forEach(tr => {
      [...tr.children].forEach((cel, i) => {
        if (cel.tagName === 'TD') cel.dataset.label = caps[i] || '';
      });
    });
  });

  /* ---------------- Filtres i cerca ---------------- */
  const textTema = new Map(temes.map(t => [t, norm(t.textContent)]));
  let filtre = null;
  let consulta = '';
  const avisBuit = $('#sense-resultats');

  function aplicaVisibilitat() {
    let visibles = 0;
    temes.forEach(t => {
      const okFiltre = !filtre || t.querySelector('.nota.' + filtre) ||
        (filtre === 'revisa' && t.closest('.annex'));
      const okCerca = !consulta || textTema.get(t).includes(consulta);
      const veure = Boolean(okFiltre && okCerca);
      t.classList.toggle('amagat', !veure);
      if (veure) visibles++;
    });
    blocs.forEach(b => b.classList.toggle('amagat', !$$('.tema', b).some(t => !t.classList.contains('amagat'))));
    avisBuit.hidden = visibles > 0;
    if (!visibles) $('b', avisBuit).textContent = $('#cerca').value;
    ressalta();
  }

  function ressalta() {
    if (!('highlights' in CSS)) return;
    CSS.highlights.delete('cerca');
    if (consulta.length < 2) return;
    const rangs = [];
    temes.forEach(t => {
      if (t.classList.contains('amagat')) return;
      const w = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
      let nd;
      while ((nd = w.nextNode())) {
        if (nd.parentElement.closest('.tema-peu')) continue;
        const txt = norm(nd.nodeValue);
        let i = txt.indexOf(consulta);
        while (i !== -1) {
          const r = new Range();
          r.setStart(nd, i);
          r.setEnd(nd, i + consulta.length);
          rangs.push(r);
          i = txt.indexOf(consulta, i + consulta.length);
        }
      }
    });
    if (rangs.length) CSS.highlights.set('cerca', new Highlight(...rangs));
  }

  $$('.filtre').forEach(b => {
    b.addEventListener('click', () => {
      const f = b.dataset.filtre;
      filtre = filtre === f ? null : f;
      $$('.filtre').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.filtre === filtre)));
      if (filtre) document.body.dataset.filtre = filtre;
      else delete document.body.dataset.filtre;
      aplicaVisibilitat();
      const text = $('#text');
      if (text.getBoundingClientRect().top < 0) text.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  const cerca = $('#cerca');
  let tempsCerca;
  cerca.addEventListener('input', () => {
    clearTimeout(tempsCerca);
    tempsCerca = setTimeout(() => {
      consulta = norm(cerca.value.trim());
      if (consulta && vistaActual !== 'apunts') location.hash = 'apunts';
      aplicaVisibilitat();
      if (consulta) {
        const primerVisible = temes.find(t => !t.classList.contains('amagat'));
        const text = $('#text');
        if (primerVisible && text.getBoundingClientRect().top < 0) text.scrollIntoView();
      }
    }, 140);
  });
  cerca.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') { cerca.value = ''; cerca.dispatchEvent(new Event('input')); cerca.blur(); }
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === '/' && !ev.target.closest('input, textarea') && !$('#visor').open) {
      ev.preventDefault();
      cerca.focus();
    }
  });

  /* ---------------- Visor d'imatges ---------------- */
  const visor = $('#visor');
  $$('.fig-obre').forEach(b => {
    b.addEventListener('click', () => {
      const img = $('img', b);
      $('#visor-img').src = img.src;
      $('#visor-img').alt = img.alt;
      $('#visor-peu').textContent = b.closest('figure').querySelector('figcaption').textContent;
      visor.showModal();
    });
  });
  $('#visor-tanca').addEventListener('click', () => visor.close());
  visor.addEventListener('click', (ev) => { if (ev.target === visor) visor.close(); });

  /* ---------------- Xips de bloc (targetes i test) ---------------- */
  function creaXips(contenidor, totLabel, enCanvi) {
    const opcions = [['tots', totLabel], ...Object.entries(window.BLOCS)];
    opcions.forEach(([k, nom]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'xip';
      b.dataset.b = k;
      b.textContent = nom;
      b.setAttribute('aria-pressed', String(k === 'tots'));
      b.addEventListener('click', () => {
        $$('.xip', contenidor).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        enCanvi(k);
      });
      contenidor.append(b);
    });
  }

  /* ---------------- Targetes ---------------- */
  const Targetes = (() => {
    const totes = window.TARGETES.map((t, i) => ({ ...t, id: i }));
    const sabudes = new Set(llegeix('cias-sabudes', []));
    let pila = [];
    let pos = 0;
    let bloc = 'tots';
    let iniciat = false;
    const el = $('#targeta');

    function prepara() {
      const base = bloc === 'tots' ? totes : totes.filter(t => String(t.b) === bloc);
      // Primer les que encara no se saben
      pila = [...barreja(base.filter(t => !sabudes.has(t.id))), ...barreja(base.filter(t => sabudes.has(t.id)))];
      pos = 0;
      pinta();
    }
    function pinta() {
      el.classList.remove('girada');
      const t = pila[pos];
      if (!t) return;
      $('#tg-bloc').textContent = window.BLOCS[t.b];
      $('#tg-preg').textContent = t.p;
      $('#tg-resp').textContent = t.r;
      $('#tg-pos').textContent = `${pos + 1} / ${pila.length}`;
      const base = bloc === 'tots' ? totes : totes.filter(x => String(x.b) === bloc);
      const n = base.filter(x => sabudes.has(x.id)).length;
      $('#tg-sabudes').textContent = `${n} de ${base.length} les saps`;
    }
    const gira = () => el.classList.toggle('girada');
    const seg = () => { pos = (pos + 1) % pila.length; pinta(); };
    const ant = () => { pos = (pos - 1 + pila.length) % pila.length; pinta(); };
    function sabia() {
      sabudes.add(pila[pos].id);
      desa('cias-sabudes', [...sabudes]);
      seg();
    }
    function encaraNo() {
      const t = pila[pos];
      sabudes.delete(t.id);
      desa('cias-sabudes', [...sabudes]);
      // Torna a sortir d'aquí a 3 targetes
      pila.splice(pos, 1);
      pila.splice(Math.min(pos + 3, pila.length), 0, t);
      pinta();
    }

    function inicia() {
      if (iniciat) return;
      iniciat = true;
      creaXips($('#tg-blocs'), 'Tots els blocs', (k) => { bloc = k; prepara(); });
      el.addEventListener('click', gira);
      $('#tg-seg').addEventListener('click', seg);
      $('#tg-ant').addEventListener('click', ant);
      $('#tg-si').addEventListener('click', sabia);
      $('#tg-no').addEventListener('click', encaraNo);
      $('#tg-barreja').addEventListener('click', prepara);
      document.addEventListener('keydown', (ev) => {
        if (vistaActual !== 'targetes' || ev.target.closest('input') || ev.metaKey || ev.ctrlKey) return;
        if (ev.key === ' ' && ev.target !== el) { ev.preventDefault(); gira(); }
        else if (ev.key === 'ArrowRight') seg();
        else if (ev.key === 'ArrowLeft') ant();
        else if (ev.key.toLowerCase() === 's') sabia();
        else if (ev.key.toLowerCase() === 'n') encaraNo();
      });
      prepara();
    }
    return { inicia };
  })();

  /* ---------------- Test: rondes sense repetició ----------------
     Cada pregunta té un estat desat al navegador:
     · nova: encara no ha sortit
     · repas: l'has fallada; torna en rondes següents fins que l'encertis 2 vegades seguides
     · dom: dominada; no torna a sortir (només als simulacres)
     Les rondes agafen primer les de repàs i després les noves, en l'ordre dels apunts. */
  const Test = (() => {
    const RONDA = 10;
    const MAX_REPAS = 4;
    const SIMULACRE = 30;
    const lletres = ['A', 'B', 'C', 'D'];
    const zona = $('#ts-zona');
    const panell = $('#ts-panell');
    const esc = (s) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const hash = (s) => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.codePointAt(0)) >>> 0; return h.toString(36); };

    // Banc ordenat com els apunts (estable dins de cada tema)
    const ordre = temes.map(t => t.id);
    const banc = window.PREGUNTES
      .map(([t, k, p, o, e]) => ({ id: hash(p), t, k, p, o, e, b: Number(t[1]) }))
      .sort((a, b) => ordre.indexOf(a.t) - ordre.indexOf(b.t));

    let estat = llegeix('cias-test', {});
    let numRonda = llegeix('cias-test-ronda', 0);
    let bloc = 'tots';
    let ronda = null;
    let iniciat = false;

    const desaEstat = () => { desa('cias-test', estat); desa('cias-test-ronda', numRonda); };
    const situacio = (q) => (estat[q.id] && estat[q.id].e) || 'nova';
    const EXAMEN = window.TEMES_EXAMEN || [];
    const esExamen = (q) => EXAMEN.includes(q.t);
    const delBloc = () => bloc === 'tots' ? banc
      : bloc === 'examen' ? banc.filter(esExamen)
      : banc.filter(q => String(q.b) === bloc);
    const nomDelBloc = () => bloc === 'tots' ? 'tot el temari' : bloc === 'examen' ? 'els temes d\'examen' : window.BLOCS[bloc];
    // «de tot el temari», «dels temes d'examen», «d'Oftalmologia», «de Vascular»
    const deBloc = () => {
      const nom = nomDelBloc();
      if (nom.startsWith('els ')) return 'dels ' + nom.slice(4);
      return /^[aeiouàèéíòóú]/i.test(nom) ? 'd\'' + nom : 'de ' + nom;
    };

    function infoTema(id) {
      const h3 = $('#' + id + ' h3');
      if (!h3) return '';
      const n = $('span', h3).textContent;
      const nom = [...h3.childNodes].filter(nd => nd.nodeType === 3).map(nd => nd.textContent).join('').trim();
      return `${n} ${nom}`;
    }

    /* Fragment literal dels apunts on surt la resposta */
    function cita(q) {
      const tema = document.getElementById(q.t);
      if (!tema || !q.k) return '';
      const clau = norm(q.k);
      const cands = $$('td, th, li, p, .nota, .tap, .abcde > div', tema)
        .filter(el => !el.closest('.tema-peu, figure, h3, thead') && norm(el.textContent).includes(clau));
      if (!cands.length) return '';
      const el = cands.reduce((a, b) => (b.textContent.length < a.textContent.length ? b : a));

      if (el.matches('td, th')) {
        const tr = el.closest('tr');
        const titol = tr.querySelector('th[scope="row"]');
        if (titol) {
          const cel = [...tr.children].filter(c => c.tagName === 'TD' && c.textContent.trim());
          return `<div class="cita-fila"><p class="cita-fila-tit">${esc(titol.textContent)}</p>` +
            cel.map(c => `<p>${c.dataset.label ? `<b>${esc(c.dataset.label)}</b> ` : ''}${c.innerHTML}</p>`).join('') + '</div>';
        }
        return `<div class="cita-fila"><p>${el.dataset.label ? `<b>${esc(el.dataset.label)}</b> ` : ''}${el.innerHTML}</p></div>`;
      }
      if (el.matches('.abcde > div')) return `<div class="abcde abcde-sol">${el.outerHTML}</div>`;
      if (el.matches('.tap')) return `<div class="taps taps-sol">${el.outerHTML}</div>`;
      const peca = el.closest('.nota') || el;
      const clon = peca.cloneNode(true);
      clon.removeAttribute('id');
      return clon.tagName === 'LI' ? `<ul>${clon.outerHTML}</ul>` : clon.outerHTML;
    }

    /* ---- Resum de preparació ---- */
    function pintaPanell() {
      const total = banc.length;
      const dom = banc.filter(q => situacio(q) === 'dom').length;
      const rep = banc.filter(q => situacio(q) === 'repas').length;
      const nov = total - dom - rep;
      const pct = Math.floor(dom / total * 100);
      const falten = total - dom;
      const [cls, tit, txt] =
        dom === total ? ['llest', 'Temari dominat', 'Has encertat totes les preguntes de tots els temes. Fes simulacres per mantenir-ho fresc fins a l\'examen.']
        : pct >= 80 ? ['a-prop', 'Molt a prop', `Et queden ${falten} preguntes. Prioritza les de repàs: són les que encara falles.`]
        : pct >= 50 ? ['meitat', 'Més de la meitat', `Ja domines ${dom} de ${total}. Continua ronda a ronda fins a cobrir tots els temes.`]
        : dom > 0 ? ['cami', 'En camí', `Domines ${dom} de ${total} preguntes. Cada ronda avança pel temari en l'ordre dels apunts.`]
        : ['inici', 'Comença pel principi', `${total} preguntes que cobreixen els 37 temes. Quan les dominis totes, hauràs repassat tot el temari. Els temes d'examen tenen un filtre propi.`];

      const grups = [...Object.entries(window.BLOCS), ['examen', 'Temes d\'examen']];
      const files = grups.map(([b, nom]) => {
        const qs = b === 'examen' ? banc.filter(esExamen) : banc.filter(q => String(q.b) === b);
        const d = qs.filter(q => situacio(q) === 'dom').length;
        const r = qs.filter(q => situacio(q) === 'repas').length;
        return `<li${b === 'examen' ? ' class="tb-examen"' : ''}><span class="tb-nom">${nom}</span>
          <span class="ts-barra" role="img" aria-label="${d} dominades i ${r} per repassar de ${qs.length}">
            <i class="d" style="width:${d / qs.length * 100}%"></i><i class="r" style="width:${r / qs.length * 100}%"></i>
          </span><span class="tb-n">${d}/${qs.length}</span></li>`;
      }).join('');

      panell.innerHTML = `
        <div class="ts-prep">
          <div class="ts-prep-cap">
            <p class="ts-prep-tit">Preparació per a l'examen</p>
            <p class="ts-prep-num"><b>${pct}%</b> del temari dominat</p>
            <span class="ts-barra ts-barra-gran" aria-hidden="true">
              <i class="d" style="width:${dom / total * 100}%"></i><i class="r" style="width:${rep / total * 100}%"></i>
            </span>
            <p class="ts-prep-estat ${cls}"><b>${tit}.</b> ${txt}</p>
          </div>
          <dl class="ts-comptes">
            <div class="c-dom"><dt>Dominades</dt><dd>${dom}</dd></div>
            <div class="c-rep"><dt>Per repassar</dt><dd>${rep}</dd></div>
            <div class="c-nov"><dt>Noves</dt><dd>${nov}</dd></div>
          </dl>
          <ul class="ts-blocs-prog">${files}</ul>
        </div>`;
    }

    /* ---- Pantalla d'inici de ronda ---- */
    function pintaInici() {
      ronda = null;
      const qs = delBloc();
      const pendents = qs.filter(q => situacio(q) !== 'dom');
      const doms = qs.length - pendents.length;
      const nomBloc = nomDelBloc();
      let html;
      if (pendents.length) {
        const rep = pendents.filter(q => situacio(q) === 'repas').length;
        const n = Math.min(RONDA, pendents.length);
        html = `<h2>Ronda ${numRonda + 1}</h2>
          <p>${n} preguntes ${esc(deBloc())}. ${rep ? `Primer ${Math.min(rep, MAX_REPAS)} de les ${rep} que tens per repassar; després, ` : 'Surten '}les noves en l'ordre dels apunts.</p>
          <div class="tg-botons"><button type="button" class="boto boto-pri" data-accio="ronda">Comença la ronda</button>
          ${doms >= RONDA ? `<button type="button" class="boto boto-sec" data-accio="simulacre">Simulacre amb les dominades</button>` : ''}</div>`;
      } else {
        html = `<h2>${bloc === 'tots' ? 'Has dominat totes les preguntes' : `Has dominat ${esc(nomBloc)}`}</h2>
          <p>No queda cap pregunta pendent${bloc === 'tots' ? '' : ' en aquest bloc'}. Un simulacre barreja ${Math.min(SIMULACRE, qs.length)} preguntes ja dominades: si en falles alguna, torna a la pila de repàs.</p>
          <div class="tg-botons"><button type="button" class="boto boto-pri" data-accio="simulacre">Fes un simulacre</button></div>`;
      }
      zona.innerHTML = `<div class="ts-inici">${html}</div>
        <p class="ts-reset"><button type="button" class="enllac" data-accio="reset">Esborra el progrés del test</button></p>`;
    }

    zona.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-accio]');
      if (!b) return;
      const a = b.dataset.accio;
      if (a === 'ronda') novaRonda();
      else if (a === 'simulacre') simulacre();
      else if (a === 'inici') { pintaInici(); zona.scrollIntoView({ block: 'nearest' }); }
      else if (a === 'reset') {
        b.textContent = 'Segur? Es perdran les preguntes dominades. Sí, esborra-ho';
        b.dataset.accio = 'reset-ok';
      } else if (a === 'reset-ok') {
        estat = {}; numRonda = 0; desaEstat(); pintaPanell(); pintaInici();
      }
    });

    /* ---- Rondes ---- */
    function novaRonda() {
      const qs = delBloc();
      const repas = qs.filter(q => situacio(q) === 'repas').sort((a, b) => (estat[a.id].r || 0) - (estat[b.id].r || 0));
      const noves = qs.filter(q => situacio(q) === 'nova');
      let sel = repas.slice(0, MAX_REPAS);
      sel = sel.concat(noves.slice(0, RONDA - sel.length));
      if (sel.length < RONDA) sel = sel.concat(repas.slice(MAX_REPAS, MAX_REPAS + RONDA - sel.length));
      numRonda++;
      desaEstat();
      comenca(barreja(sel), false);
    }
    function simulacre() {
      const doms = delBloc().filter(q => situacio(q) === 'dom');
      numRonda++;
      desaEstat();
      comenca(barreja(doms).slice(0, SIMULACRE), true);
    }
    const prepara = (q, reintent) => ({ q, reintent, ops: barreja(q.o.map((txt, k) => ({ txt, ok: k === 0 }))) });
    function comenca(llista, simul) {
      ronda = { llista: llista.map(q => prepara(q, false)), i: 0, encerts: 0, errades: [], noves: 0, simul };
      pintaPregunta();
    }

    function pintaPregunta() {
      const { llista, i, encerts } = ronda;
      const item = llista[i];
      const q = item.q;
      const sit = situacio(q);
      const etiq = item.reintent ? ['torna', 'Torna-hi'] : sit === 'repas' ? ['repas', 'Per repassar'] : sit === 'dom' ? ['dom', 'Dominada'] : ['nova', 'Nova'];
      zona.innerHTML = `
        <div class="ts-prog"><span>${ronda.simul ? 'Simulacre' : 'Ronda ' + numRonda} · ${i + 1} de ${llista.length}</span>
          <div class="barra-prog"><i style="width:${i / llista.length * 100}%"></i></div>
          <span>${encerts} encerts</span></div>
        <div class="ts-preg">
          <div class="ts-preg-cap"><small>${window.BLOCS[q.b]} · ${esc(infoTema(q.t))}</small>
            <span class="ts-etiqs">${esExamen(q) ? '<span class="ts-etiq e-examen">Tema d\'examen</span>' : ''}<span class="ts-etiq e-${etiq[0]}">${etiq[1]}</span></span></div>
          <h2></h2>
          <div class="ts-ops"></div>
          <div class="ts-resultat"></div>
        </div>`;
      $('h2', zona).textContent = q.p;
      const ops = $('.ts-ops', zona);
      item.ops.forEach((o, k) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'ts-op';
        b.innerHTML = `<b>${lletres[k]}</b><span></span>`;
        $('span', b).textContent = o.txt;
        b.addEventListener('click', () => respon(k));
        ops.append(b);
      });
    }

    function actualitza(q, encert) {
      const s = estat[q.id] || { e: 'nova', ok: 0 };
      const abans = s.e;
      if (encert) {
        if (s.e === 'nova') s.e = 'dom';
        else if (s.e === 'repas') { s.ok = (s.ok || 0) + 1; if (s.ok >= 2) s.e = 'dom'; }
      } else { s.e = 'repas'; s.ok = 0; }
      s.r = numRonda;
      estat[q.id] = s;
      desaEstat();
      return { abans, ara: s };
    }

    function respon(k) {
      const item = ronda.llista[ronda.i];
      const q = item.q;
      const botons = $$('.ts-op', zona);
      botons.forEach((b, j) => { b.disabled = true; if (item.ops[j].ok) b.classList.add('ok'); });
      const encert = item.ops[k].ok;
      if (!encert) botons[k].classList.add('ko');

      let estatTxt;
      if (item.reintent) {
        estatTxt = encert ? 'Tornarà a sortir en una ronda següent per consolidar-la.' : 'Repassa el fragment dels apunts: tornarà a sortir a la propera ronda.';
      } else {
        const { abans, ara } = actualitza(q, encert);
        if (encert) {
          ronda.encerts++;
          if (ara.e === 'dom' && abans !== 'dom') { ronda.noves++; estatTxt = 'Dominada: no tornarà a sortir.'; }
          else if (ara.e === 'dom') estatTxt = 'Continua dominada.';
          else estatTxt = 'Encerta-la una vegada més en una altra ronda i quedarà dominada.';
        } else {
          ronda.errades.push(q);
          ronda.llista.push(prepara(q, true));
          estatTxt = 'Tornarà a sortir al final d\'aquesta ronda i en les següents, fins que l\'encertis dues vegades.';
        }
      }

      const res = $('.ts-resultat', zona);
      const correcta = q.o[0];
      if (encert) {
        res.innerHTML = `<div class="ts-exp ok"><b>Correcte.</b> <span class="ts-exp-text"></span><span class="ts-estat"></span></div>`;
        $('.ts-exp-text', res).textContent = q.e;
        $('.ts-estat', res).textContent = estatTxt;
      } else {
        const fragment = cita(q);
        res.innerHTML = `
          <div class="ts-repas">
            <p class="ts-repas-tit">Resposta correcta</p>
            <p class="ts-correcta"></p>
            <p class="ts-exp-text"></p>
            ${fragment ? `<div class="ts-cita"><p class="ts-cita-font">Als apunts · ${esc(infoTema(q.t))}</p>${fragment}</div>`
              : !q.k ? `<div class="ts-cita ts-cita-ampl"><p class="ts-cita-font">Apunts complets · ${esc(infoTema(q.t))}</p><p>Aquest detall no surt a la síntesi de la web: ve dels apunts complets de l'assignatura.</p></div>` : ''}
            <p class="ts-repas-peu"><a class="ts-obre" href="#${q.t}">Obre el tema als apunts</a><span class="ts-estat"></span></p>
          </div>`;
        $('.ts-correcta', res).textContent = correcta;
        $('.ts-exp-text', res).textContent = q.e;
        $('.ts-estat', res).textContent = estatTxt;
      }
      const darrera = ronda.i + 1 >= ronda.llista.length;
      res.insertAdjacentHTML('beforeend', `<div class="ts-seg"><button type="button" class="boto boto-pri">${darrera ? 'Acaba la ronda' : 'Següent pregunta'}</button></div>`);
      const seg = $('.ts-seg button', res);
      seg.addEventListener('click', () => {
        ronda.i++;
        if (ronda.i < ronda.llista.length) pintaPregunta(); else finalRonda();
        zona.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
      });
      seg.focus({ preventScroll: true });
      pintaPanell();
    }

    function finalRonda() {
      const n = ronda.llista.filter(x => !x.reintent).length;
      const pct = Math.round(ronda.encerts / n * 100);
      const missatge = pct === 100 ? 'Ronda perfecta.'
        : pct >= 70 ? 'Bona ronda. Les errades tornaran a sortir fins que les dominis.'
        : 'Llegeix els fragments dels apunts de les errades abans de la ronda següent.';
      const errades = ronda.errades.map(q => `
        <li><p class="te-preg">${esc(q.p)}</p>
          <p class="te-resp"><b>Correcta:</b> ${esc(q.o[0])}</p>
          <a href="#${q.t}">${esc(infoTema(q.t))}</a></li>`).join('');
      zona.innerHTML = `<div class="ts-final">
          <p class="res-gran">${ronda.encerts} / ${n}</p>
          <p><strong>${ronda.simul ? 'Simulacre acabat' : 'Ronda ' + numRonda + ' acabada'}.</strong> ${missatge}
            ${ronda.noves ? `Has dominat ${ronda.noves} ${ronda.noves === 1 ? 'pregunta nova' : 'preguntes noves'}.` : ''}</p>
          ${errades ? `<h3>Per repassar</h3><ul class="ts-errades">${errades}</ul>` : ''}
          <div class="tg-botons">
            <button type="button" class="boto boto-pri" data-accio="inici">Continua</button>
          </div>
        </div>`;
      pintaPanell();
    }

    function inicia() {
      if (iniciat) return;
      iniciat = true;
      const xips = $('#ts-blocs');
      creaXips(xips, 'Tot el temari', (k) => { bloc = k; pintaInici(); });
      // Filtre dels temes que entren a l'examen (grups sanguinis, anticoagulants i INR, hemofílies)
      const xExamen = Object.assign(document.createElement('button'), { type: 'button', className: 'xip xip-examen', textContent: 'Temes d\'examen' });
      xExamen.setAttribute('aria-pressed', 'false');
      xExamen.addEventListener('click', () => {
        $$('.xip', xips).forEach(x => x.setAttribute('aria-pressed', String(x === xExamen)));
        bloc = 'examen';
        pintaInici();
      });
      xips.insertBefore(xExamen, xips.children[1]);
      pintaPanell();
      pintaInici();
    }
    return { inicia, banc, cita };
  })();

  /* ---------------- Eina: compatibilitat d'hematies ---------------- */
  (() => {
    const grups = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
    const antigens = (g) => { const abo = g.slice(0, -1); return abo === 'O' ? [] : abo.split(''); };
    const pot = (d, r) => antigens(d).every(a => antigens(r).includes(a)) && !(d.endsWith('+') && r.endsWith('-'));
    const anticossos = { A: 'anti-B', B: 'anti-A', AB: 'cap anticòs ABO', O: 'anti-A i anti-B' };
    let mode = 'receptor';
    let triat = 'A+';
    const tria = $('#sang-tria');
    const res = $('#sang-res');

    grups.forEach(g => {
      const b = Object.assign(document.createElement('button'), { type: 'button', className: 'grup', textContent: g });
      b.addEventListener('click', () => { triat = g; pinta(); });
      tria.append(b);
      res.append(Object.assign(document.createElement('span'), { className: 'bossa', textContent: g }));
    });
    $$('.sang-mode .xip').forEach(b => b.addEventListener('click', () => {
      mode = b.dataset.mode;
      $$('.sang-mode .xip').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      pinta();
    }));

    function pinta() {
      $$('.grup', tria).forEach(b => b.setAttribute('aria-pressed', String(b.textContent === triat)));
      const compatibles = grups.filter(g => mode === 'receptor' ? pot(g, triat) : pot(triat, g));
      $$('.bossa', res).forEach(s => s.classList.toggle('si', compatibles.includes(s.textContent)));
      $('#sang-res-tit').textContent = mode === 'receptor'
        ? `Un ${triat} pot rebre hematies de ${compatibles.length === 8 ? 'tots els grups' : compatibles.join(', ')}:`
        : `Un ${triat} pot donar hematies a ${compatibles.length === 8 ? 'tots els grups' : compatibles.join(', ')}:`;
      const abo = triat.slice(0, -1);
      const rh = triat.endsWith('+');
      let exp;
      if (mode === 'receptor') {
        exp = `El plasma d'un ${abo} té ${anticossos[abo]}. ` + (rh ? 'És Rh+, així que també accepta Rh-.' : 'És Rh-: només pot rebre Rh-.');
        if (triat === 'AB+') exp += ' És el receptor universal.';
      } else {
        exp = abo === 'O' ? 'Els hematies O no tenen antígens A ni B. ' : `Els hematies ${abo} porten l'antigen ${abo === 'AB' ? 'A i el B' : abo}. `;
        exp += rh ? 'Porten l\'antigen D (Rh+): no es poden donar a un Rh-.' : 'No porten l\'antigen D, es poden donar a Rh+ i Rh-.';
        if (triat === 'O-') exp += ' És el donant universal: en una urgència sense grup conegut, O-.';
      }
      $('#sang-exp').textContent = exp;
    }
    pinta();
  })();

  /* ---------------- Eina: ITB ---------------- */
  (() => {
    const t = $('#itb-t'), b = $('#itb-b');
    function calcula() {
      const vt = parseFloat(t.value), vb = parseFloat(b.value);
      const out = $('#itb-val'), txt = $('#itb-text');
      if (!(vt > 0) || !(vb > 0)) {
        out.textContent = '–';
        txt.innerHTML = '<b>Falten dades</b>Escriu les dues pressions sistòliques en mmHg.';
        return;
      }
      const v = vt / vb;
      out.textContent = num(v);
      $('#itb-marca').style.left = Math.min(v, 1.4) / 1.4 * 100 + '%';
      let tit, det;
      if (v > 1.4) { tit = 'Per sobre de 1,4'; det = 'Segons els apunts és normal (> 1), però les guies només consideren normal fins a ~1,4.'; }
      else if (v > 1) { tit = 'Normal'; det = 'ITB > 1 segons els apunts; dins del rang ~0,9-1,4 de les guies.'; }
      else if (v >= 0.8) { tit = 'Obstrucció lleu'; det = '0,8-1 segons els apunts. Les guies consideren normal a partir de ~0,9.'; }
      else if (v >= 0.4) { tit = 'Obstrucció greu'; det = '0,4-0,8 segons els apunts.'; }
      else { tit = 'Obstrucció molt greu'; det = '< 0,4 segons els apunts.'; }
      txt.innerHTML = `<b>${tit}</b>${det}`;
    }
    t.addEventListener('input', calcula);
    b.addEventListener('input', calcula);
    calcula();
  })();

  /* ---------------- Eina: INR ---------------- */
  (() => {
    const inp = $('#inr-v');
    const F = window.FACTORS_INR;
    function calcula() {
      const v = parseFloat(String(inp.value).replace(',', '.'));
      const txt = $('#inr-text'), fac = $('#inr-factors');
      if (!(v > 0)) { txt.innerHTML = '<b>Falta el valor</b>Escriu l\'INR de l\'analítica.'; fac.innerHTML = ''; return; }
      $('#inr-marca').style.left = (Math.min(Math.max(v, 1), 5) - 1) / 4 * 100 + '%';
      let tit, det, llista = null, titLlista = '';
      if (v < 2) {
        tit = 'Per sota de l\'objectiu: risc de trombosi';
        det = v < 1.3 ? 'Proper a l\'INR normal (≈ 1): pràcticament sense efecte anticoagulant.' : 'Anticoagulació insuficient per a un pacient amb AVK.';
        llista = F.baixa; titLlista = 'Què pot baixar l\'INR (pregunta-ho):';
      } else if (v <= 3) {
        tit = 'En rang terapèutic';
        det = 'INR 2-3. Continuar amb la mateixa hora cada dia, dieta amb vitamina K constant i sense automedicar-se.';
      } else {
        tit = 'Per sobre de l\'objectiu: risc d\'hemorràgia';
        det = 'Vigila sagnats (genives, orina, femta negra) i davant d\'un TCE sospita hemorràgia intracranial. Antídot de l\'AVK: vitamina K.';
        llista = F.puja; titLlista = 'Què pot pujar l\'INR (pregunta-ho):';
      }
      txt.innerHTML = `<b>${tit}</b>${det}`;
      fac.innerHTML = llista ? `<p>${titLlista}</p><ul>${llista.map(x => `<li>${x}</li>`).join('')}</ul>` : '';
    }
    inp.addEventListener('input', calcula);
    calcula();
  })();

  encamina();
})();
