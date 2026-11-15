// Targetes i preguntes del test, tretes dels apunts.
// b = número de bloc (1 Oftalmologia … 6 Genètica)

window.BLOCS = {
  1: 'Oftalmologia',
  2: 'Dermatologia',
  3: 'Vascular',
  4: 'Hematologia',
  5: 'Oncologia',
  6: 'Genètica'
};

window.TARGETES = [
  // Bloc 1
  { b: 1, p: 'Quin és el valor normal de la pressió intraocular (PIO)?', r: '10-21 mmHg. Hipertensió ocular no és sinònim de glaucoma.' },
  { b: 1, p: 'Ull vermell sense signes d\'alarma: quins tres signes falten?', r: 'Pèrdua de visió, dolor i canvis pupil·lars. La causa més freqüent és la conjuntivitis.' },
  { b: 1, p: 'Secreció de cada conjuntivitis: bacteriana, vírica i al·lèrgica.', r: 'Bacteriana = pus · Vírica = aigua (llàgrima) · Al·lèrgica = Alt prurit.' },
  { b: 1, p: 'Quines conjuntivitis donen adenopatia preauricular?', r: 'La hiperaguda (Neisseria gonorrhoeae) i la vírica (adenovirus).' },
  { b: 1, p: 'Què és el signe de Hutchinson?', r: 'Vesícules a la punta del nas en un herpes zòster oftàlmic: ~50% d\'afectació ocular. Urgència, antivirals.' },
  { b: 1, p: 'Clínica del glaucoma agut d\'angle tancat.', r: 'Dolor sever, halos, midriasi arreactiva, ull dur i vòmits. És una emergència.' },
  { b: 1, p: 'Color del tap dels col·liris: groc, vermell, verd i blanc.', r: 'Groc = anestèsics · Vermell = midriàtics · Verd = miòtics · Blanc = altres (antibiòtics, llàgrimes).' },
  { b: 1, p: 'Quina cremada química és més greu i per què?', r: 'Els àlcalis (lleixiu, ciment, sosa): necrosi per liqüefacció, penetren. Irrigar 15-30 min de seguida.' },
  { b: 1, p: 'Cos estrany clavat a l\'ull: què fas?', r: 'Mai retirar-lo. Estabilitzar-lo i protegir l\'ull.' },
  { b: 1, p: 'Ordèol o calazi: quin fa mal?', r: 'L\'ordèol: infecció aguda, molt dolorosa, S. aureus, mai esprémer. El calazi és crònic, indolor i no infecciós.' },
  { b: 1, p: 'Administració de col·liris: temps entre gotes i ordre.', r: '5 min entre col·liris, la pomada l\'última, començar per l\'ull sa. Caducitat d\'1 mes un cop obert.' },

  // Bloc 2
  { b: 2, p: 'Regla ABCDE del melanoma.', r: 'Asimetria, Bores irregulars, Color divers, Diàmetre > 6 mm, Evolució (el criteri més important).' },
  { b: 2, p: 'Què és la regla de l\'ànec lleig?', r: 'En pacients amb molts nevus, la piga diferent de la resta és sospitosa. Complementa l\'ABCDE.' },
  { b: 2, p: 'Com funciona el mètode de Berg?', r: 'Apòsit transparent sobre la ferida i SF fins a enrasar: el volum són els ml instil·lats.' },
  { b: 2, p: 'Lesió per pressió o per humitat: com les distingeixes?', r: 'Pressió: eritema no blanquejant sobre prominència òssia. Humitat: eritema difús i maceració, no sobre prominència.' },
  { b: 2, p: 'Durada d\'una lesió aguda, subaguda i crònica.', r: 'Aguda < 6 setmanes · subaguda 6-12 · crònica > 12.' },
  { b: 2, p: 'Termini per iniciar antivirals en l\'herpes zòster.', r: 'Menys de 72 h. Alerta si afecta cara o ull, o hi ha immunosupressió.' },
  { b: 2, p: 'Crostes melicèriques al voltant del nas i la boca d\'un infant.', r: 'Impètigen: contagiós. Mupirocina o àcid fusídic; no compartir tovalloles.' },
  { b: 2, p: 'Cures després d\'un prick test o patch test.', r: 'No mullar ni gratar els pegats durant 48-72 h.' },
  { b: 2, p: 'Crosta groga, verda o marró: de què és?', r: 'Groga = sèrum · verda = pus · marró = sang.' },

  // Bloc 3
  { b: 3, p: 'Les 6 P de la isquèmia aguda.', r: 'Pain (dolor), Pal·lidesa, Pulseless (sense pols), Parestèsies, Paràlisi, Poiquilotèrmia (fredor).' },
  { b: 3, p: 'Graus de Fontaine.', r: 'I asimptomàtic · IIa claudicació > 150 m · IIb < 150 m · III dolor en repòs · IV necrosi.' },
  { b: 3, p: 'Fórmula correcta de l\'ITB.', r: 'TAS turmell / TAS braquial. Als apunts apareix invertida. Guies: normal ~0,9-1,4.' },
  { b: 3, p: 'Signe de Homans.', r: 'Flexió dorsal forçada del peu que provoca dolor al panxell (sospita de TVP).' },
  { b: 3, p: 'Complicació més greu de la TVP.', r: 'L\'embolisme pulmonar (TEP). Complicació tardana: síndrome postflebític.' },
  { b: 3, p: 'Dolor arterial vs venós: què el millora?', r: 'Arterial: repòs i cames avall. Venós: elevar les cames.' },
  { b: 3, p: 'Què fas davant d\'una varicorràgia?', r: 'Elevar l\'extremitat i comprimir 15-20 min.' },
  { b: 3, p: 'Categories de les LPP.', r: 'I eritema no blanquejant · II pèrdua parcial de dermis · III pèrdua total, greix visible · IV os, tendó o múscul exposats.' },
  { b: 3, p: 'Varius primàries vs secundàries: lateralitat.', r: 'Primàries: bilaterals (herència, embaràs). Secundàries: unilaterals (TVP o traumatisme previ).' },

  // Bloc 4
  { b: 4, p: 'Donant universal i receptor universal d\'hematies.', r: 'O- donant universal · AB+ receptor universal. Urgència sense grup conegut → O-.' },
  { b: 4, p: 'Com es prevé la incompatibilitat Rh?', r: 'Immunoglobulina anti-D a la mare Rh- amb fetus Rh+.' },
  { b: 4, p: 'Antídot de cada anticoagulant.', r: 'Sintrom → vitamina K · Heparina → protamina · Dabigatran → idarucizumab · anti-Xa → andexanet alfa.' },
  { b: 4, p: 'INR terapèutic en un pacient amb AVK.', r: '2-3 (normal ≈ 1). L\'INR es calcula amb el TP, no amb el TTPa.' },
  { b: 4, p: 'Reacció transfusional més greu i més freqüent.', r: 'Més greu: hemolítica aguda (ABO). Més freqüent i benigna: febril no hemolítica.' },
  { b: 4, p: 'TRALI o TACO: quina té HTA?', r: 'TACO (excés de volum, edema pulmonar amb HTA). TRALI: edema pulmonar sense HTA, primeres 6 h.' },
  { b: 4, p: 'Conservació d\'hematies, plasma i plaquetes.', r: 'Hematies 1-6 ºC fins a 42 dies · plasma -30 ºC 1 any · plaquetes 20-24 ºC amb agitació 5-7 dies.' },
  { b: 4, p: 'Hemofília A i B: quin factor falta?', r: 'A = factor VIII · B = factor IX. A abans que B, 8 abans que 9.' },
  { b: 4, p: 'Coombs directe vs indirecte.', r: 'Directe: anticossos units als hematies. Indirecte: anticossos lliures al sèrum (pretransfusional, embarassades Rh-).' },
  { b: 4, p: 'Temps màxim per transfondre una unitat.', r: '4 h per unitat, amb constants abans, durant i després.' },
  { b: 4, p: 'Quin tub per a la coagulació?', r: 'Tub blau (citrat), omplert fins a la marca.' },

  // Bloc 5
  { b: 5, p: 'Neoadjuvant, adjuvant i concomitant.', r: 'Neoadjuvant: abans de la cirurgia · adjuvant: després · concomitant: QT + RT alhora.' },
  { b: 5, p: 'Pacient en QT amb febre de 38,5 ºC.', r: 'Neutropènia febril fins que es demostri el contrari: alt risc d\'infecció.' },
  { b: 5, p: 'Passos davant d\'una extravasació.', r: 'Aturar la infusió → aspirar 3-5 ml → notificar i antídot → retirar la via (mai un port-a-cath) i delimitar → registrar.' },
  { b: 5, p: 'Exemples de citostàtics vesicants.', r: 'Doxorubicina i dactinomicina (necrosi).' },
  { b: 5, p: 'Cribratge de càncer de mama a Catalunya.', r: 'Dones de 50-69 anys, mamografia cada 2 anys.' },
  { b: 5, p: 'Cribratge colorectal a Catalunya.', r: '50-69 anys (ampliació aprovada fins als 74), sang oculta en femta cada 2 anys.' },
  { b: 5, p: 'Clínica de la síndrome de la vena cava superior.', r: 'Edema en esclavina, ingurgitació jugular i dispnea.' },
  { b: 5, p: 'Compressió medul·lar: què fas de seguida?', r: 'Dexametasona urgent i RM en < 24 h; després cirurgia i/o RT.' },
  { b: 5, p: 'Grau vs estadi d\'un tumor.', r: 'Grau = agressivitat cel·lular (G1-G4). Estadi = extensió (0 in situ → IV metàstasi).' },
  { b: 5, p: 'Què avalua cada lletra del TNM?', r: 'T tumor primari · N ganglis regionals · M metàstasi a distància.' },

  // Bloc 6
  { b: 6, p: 'Trisomies 21, 18 i 13.', r: '21 = Down · 18 = Edwards · 13 = Patau.' },
  { b: 6, p: 'Cariotip de Turner i de Klinefelter.', r: 'Turner 45,X (dona) · Klinefelter 47,XXY (home).' },
  { b: 6, p: 'Mutació germinal vs somàtica.', r: 'Germinal: òvuls o espermatozoides, es transmet. Somàtica: cèl·lules del cos, no es transmet.' },
  { b: 6, p: 'Oncogen, gen supressor i gen reparador.', r: 'Oncogen = accelerador enganxat · supressor = fre trencat · reparador = mecànic.' },
  { b: 6, p: 'Fases de la mitosi.', r: 'PMAT: Profase, Metafase, Anafase, Telofase.' },
  { b: 6, p: 'Quan sospites d\'un càncer hereditari?', r: 'Diversos familiars afectats, edat jove, tumors múltiples o bilaterals, càncer de mama en home.' }
];

// Factors que modifiquen l'INR (eina d'INR)
window.FACTORS_INR = {
  puja: ['Alcohol', 'Febre', 'Hipertiroïdisme', 'Hepatopatia', 'Antibiòtics', 'Antifúngics', 'Antidepressius', 'Amiodarona', 'Estatines'],
  baixa: ['Dieta rica en vitamina K', 'Hipotiroïdisme', 'Anticonvulsius', 'Rifampicina', 'Tiazides']
};
