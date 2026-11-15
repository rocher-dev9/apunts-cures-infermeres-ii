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

  /* ---------------- Test ---------------- */
  const Test = (() => {
    const zona = $('#ts-zona');
    let preguntes = [];
    let i = 0;
    let encerts = 0;
    let errades = [];
    let bloc = 'tots';
    let iniciat = false;
    const lletres = ['A', 'B', 'C', 'D'];

    function comenca(llista) {
      const base = llista || (bloc === 'tots' ? window.PREGUNTES : window.PREGUNTES.filter(p => String(p.b) === bloc));
      // Barreja preguntes i opcions
      preguntes = barreja(base).map(p => {
        const ordre = barreja(p.o.map((txt, k) => ({ txt, ok: k === p.c })));
        return { ...p, ops: ordre };
      });
      i = 0; encerts = 0; errades = [];
      pinta();
    }

    function pinta() {
      const p = preguntes[i];
      zona.innerHTML = `
        <div class="ts-prog"><span>Pregunta ${i + 1} de ${preguntes.length}</span>
          <div class="barra-prog"><i style="width:${i / preguntes.length * 100}%"></i></div>
          <span>${encerts} encerts</span></div>
        <div class="ts-preg">
          <small>${window.BLOCS[p.b]}</small>
          <h2></h2>
          <div class="ts-ops"></div>
          <div class="ts-resultat"></div>
        </div>`;
      $('h2', zona).textContent = p.p;
      const ops = $('.ts-ops', zona);
      p.ops.forEach((o, k) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'ts-op';
        b.innerHTML = `<b>${lletres[k]}</b><span></span>`;
        $('span', b).textContent = o.txt;
        b.addEventListener('click', () => respon(k));
        ops.append(b);
      });
    }

    function respon(k) {
      const p = preguntes[i];
      const botons = $$('.ts-op', zona);
      botons.forEach((b, j) => {
        b.disabled = true;
        if (p.ops[j].ok) b.classList.add('ok');
      });
      const encert = p.ops[k].ok;
      if (encert) encerts++;
      else { botons[k].classList.add('ko'); errades.push(p); }
      const res = $('.ts-resultat', zona);
      res.innerHTML = `<div class="ts-exp"><b></b><span></span></div>
        <div class="ts-seg"><button type="button" class="boto boto-pri"></button></div>`;
      $('.ts-exp b', res).textContent = encert ? 'Correcte.' : 'No és aquesta.';
      $('.ts-exp span', res).textContent = p.e;
      const seg = $('.ts-seg button', res);
      seg.textContent = i + 1 < preguntes.length ? 'Següent pregunta' : 'Mostra el resultat';
      seg.addEventListener('click', () => { i++; i < preguntes.length ? pinta() : final(); });
      seg.focus({ preventScroll: true });
    }

    function final() {
      const pct = Math.round(encerts / preguntes.length * 100);
      const missatge = pct >= 90 ? 'Ho tens per a l\'examen.'
        : pct >= 70 ? 'Bona base. Repassa les errades i torna-ho a provar.'
        : pct >= 50 ? 'Aprovat just. Torna als apunts dels temes que has fallat.'
        : 'Encara cal repassar. Comença pels requadres de clau d\'examen.';
      zona.innerHTML = `<div class="ts-final">
          <p class="res-gran">${encerts} / ${preguntes.length}</p>
          <p><strong>${pct}%</strong>. ${missatge}</p>
          <ul class="ts-errades"></ul>
          <div class="tg-botons"></div>
        </div>`;
      const ul = $('.ts-errades', zona);
      errades.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p.p;
        const s = document.createElement('span');
        s.textContent = p.o[p.c];
        li.append(s);
        ul.append(li);
      });
      const botons = $('.tg-botons', zona);
      if (errades.length) {
        const b = Object.assign(document.createElement('button'), { type: 'button', className: 'boto boto-pri', textContent: 'Repeteix les errades' });
        const llista = errades.slice();
        b.addEventListener('click', () => comenca(llista));
        botons.append(b);
      }
      const r = Object.assign(document.createElement('button'), { type: 'button', className: 'boto boto-sec', textContent: 'Torna a començar' });
      r.addEventListener('click', () => comenca());
      botons.append(r);
    }

    function inicia() {
      if (iniciat) return;
      iniciat = true;
      creaXips($('#ts-blocs'), 'Totes', (k) => { bloc = k; comenca(); });
      comenca();
    }
    return { inicia };
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
