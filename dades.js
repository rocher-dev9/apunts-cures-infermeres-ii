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

// c = índex de l'opció correcta
window.PREGUNTES = [
  // Bloc 1
  { b: 1, p: 'Un pacient té l\'ull vermell, dolor sever, halos al voltant de les llums, midriasi arreactiva i vòmits. Què sospites?',
    o: ['Conjuntivitis vírica', 'Glaucoma agut d\'angle tancat', 'Hiposfagma', 'Glaucoma crònic d\'angle obert'], c: 1,
    e: 'El glaucoma agut d\'angle tancat és una emergència: dolor sever, halos, midriasi arreactiva, ull dur i vòmits. El crònic és silenciós.' },
  { b: 1, p: 'Quin color de tap tenen els col·liris midriàtics?',
    o: ['Groc', 'Verd', 'Vermell', 'Blanc'], c: 2,
    e: 'Groc = anestèsics · Vermell = midriàtics · Verd = miòtics · Blanc = altres.' },
  { b: 1, p: 'Davant d\'una cremada ocular per lleixiu, la primera actuació és:',
    o: ['Tapar l\'ull i derivar', 'Aplicar un col·liri anestèsic i esperar', 'Irrigar immediatament 15-30 min amb SF o aigua', 'Neutralitzar amb un àcid suau'], c: 2,
    e: 'Els àlcalis són els més greus (necrosi per liqüefacció). Cal irrigar de seguida 15-30 min.' },
  { b: 1, p: 'Una conjuntivitis amb secreció aquosa, fotofòbia i adenopatia preauricular, que passa d\'un ull a l\'altre en 2-3 dies, és probablement:',
    o: ['Bacteriana', 'Vírica', 'Al·lèrgica', 'Hiperaguda'], c: 1,
    e: 'Vírica (adenovirus): aquosa, fotofòbia, uni → bilateral, adenopatia preauricular, dura 2-4 setmanes.' },
  { b: 1, p: 'Si cal administrar dos col·liris i una pomada, quin és l\'ordre correcte?',
    o: ['Pomada primer, després col·liris seguits', 'Col·liris amb 5 min entre ells i la pomada l\'última', 'Tots alhora per estalviar temps', 'Indiferent'], c: 1,
    e: '5 min entre col·liris i la pomada sempre l\'última. Si hi ha un ull infectat, començar per l\'ull sa.' },
  { b: 1, p: 'En la queratitis, quin fàrmac està contraindicat?',
    o: ['Antibiòtic tòpic', 'Corticoides', 'Llàgrimes artificials', 'Ciclopègics'], c: 1,
    e: 'A la queratitis es fa antibiòtic urgent i els corticoides estan contraindicats.' },

  // Bloc 2
  { b: 2, p: 'Quin és el criteri més important de la regla ABCDE?',
    o: ['Asimetria', 'Color', 'Diàmetre > 6 mm', 'Evolució'], c: 3,
    e: 'L\'Evolució (canvis de mida, forma o color, sagnat) és el criteri més important.' },
  { b: 2, p: 'Eritema difús amb maceració a la zona perianal, que no està sobre cap prominència òssia. Què és?',
    o: ['Lesió per pressió de categoria I', 'Lesió per humitat', 'Psoriasi', 'Melanoma'], c: 1,
    e: 'La lesió per humitat no està sobre prominència òssia. La lesió per pressió és un eritema no blanquejant sobre prominència.' },
  { b: 2, p: 'Una lesió de 4 setmanes d\'evolució es classifica com a:',
    o: ['Aguda', 'Subaguda', 'Crònica', 'Intermitent'], c: 0,
    e: 'Aguda < 6 setmanes · subaguda 6-12 · crònica > 12.' },
  { b: 2, p: 'Quan s\'ha de recollir un cultiu d\'una lesió cutània?',
    o: ['Després de 48 h d\'antibiòtic', 'Sempre abans d\'iniciar antibiòtics o antivirals', 'Només si no millora', 'Mai a la pell'], c: 1,
    e: 'El cultiu es fa sempre abans d\'iniciar antibiòtics o antivirals.' },
  { b: 2, p: 'Vesícules agrupades en un dermatoma, unilaterals, amb dolor previ. En quin termini s\'han d\'iniciar els antivirals?',
    o: ['< 24 h', '< 72 h', '< 7 dies', 'No calen'], c: 1,
    e: 'Herpes zòster: antivirals en menys de 72 h.' },

  // Bloc 3
  { b: 3, p: 'Quina és la complicació més greu de la TVP?',
    o: ['Edema pulmonar', 'Síndrome postflebític', 'Embolisme pulmonar (TEP)', 'Varicoflebitis'], c: 2,
    e: 'L\'embolisme pulmonar. Els apunts originals diuen «edema pulmonar», però és un error.' },
  { b: 3, p: 'Un pacient té claudicació intermitent als 100 metres. Quin grau de Fontaine és?',
    o: ['I', 'IIa', 'IIb', 'III'], c: 2,
    e: 'IIa > 150 m · IIb < 150 m. A 100 m és IIb.' },
  { b: 3, p: 'TAS turmell 70 mmHg i TAS braquial 140 mmHg. Quin és l\'ITB?',
    o: ['2', '0,5', '1,4', '0,2'], c: 1,
    e: 'ITB = TAS turmell / TAS braquial = 70 / 140 = 0,5: obstrucció greu segons els apunts.' },
  { b: 3, p: 'El dolor arterial millora amb:',
    o: ['Cames elevades', 'Exercici', 'Repòs i cames avall', 'Bipedestació'], c: 2,
    e: 'Arterial: millora amb repòs i cames avall; empitjora amb exercici i cames elevades.' },
  { b: 3, p: 'Extremitat freda, pàl·lida, sense pols, amb parestèsies i paràlisi d\'inici sobtat. Què és?',
    o: ['Isquèmia aguda per èmbol', 'TVP', 'Insuficiència venosa crònica', 'Raynaud'], c: 0,
    e: 'Les 6 P de la isquèmia aguda. Tractament: embolectomia.' },
  { b: 3, p: 'LPP amb pèrdua total de pell i greix visible, sense os ni tendó exposats. Categoria?',
    o: ['I', 'II', 'III', 'IV'], c: 2,
    e: 'III: pèrdua total, greix visible. IV: os, tendó o múscul exposats.' },

  // Bloc 4
  { b: 4, p: 'Urgència, pacient amb grup desconegut que necessita hematies. Quin grup transfons?',
    o: ['AB+', 'O+', 'O-', 'A-'], c: 2,
    e: 'O- és el donant universal d\'hematies.' },
  { b: 4, p: 'Un pacient amb Sintrom té un INR de 6 i sagna. Quin és l\'antídot?',
    o: ['Protamina', 'Vitamina K', 'Idarucizumab', 'Andexanet alfa'], c: 1,
    e: 'Sintrom (AVK) → vitamina K. Heparina → protamina. Dabigatran → idarucizumab.' },
  { b: 4, p: 'L\'INR es calcula a partir de:',
    o: ['El TTPa', 'El TP (temps de protrombina)', 'El fibrinogen', 'Les plaquetes'], c: 1,
    e: 'L\'INR es calcula amb el TP. El TTPa controla l\'heparina no fraccionada.' },
  { b: 4, p: 'Durant una transfusió apareix edema pulmonar amb HTA en una pacient gran amb insuficiència cardíaca. Què és?',
    o: ['TRALI', 'TACO', 'Reacció febril no hemolítica', 'EICH posttransfusional'], c: 1,
    e: 'TACO: excés de volum, edema pulmonar amb HTA. El TRALI és sense HTA.' },
  { b: 4, p: 'A quina temperatura es conserven les plaquetes?',
    o: ['1-6 ºC', '-30 ºC', '20-24 ºC amb agitació', '37 ºC'], c: 2,
    e: 'Plaquetes 20-24 ºC amb agitació, 5-7 dies.' },
  { b: 4, p: 'Quin d\'aquests fàrmacs puja l\'INR (risc d\'hemorràgia)?',
    o: ['Rifampicina', 'Anticonvulsius', 'Amiodarona', 'Dieta rica en vitamina K'], c: 2,
    e: 'Pugen l\'INR: antibiòtics, antifúngics, antidepressius, amiodarona, estatines, alcohol. El baixen: anticonvulsius, rifampicina, vitamina K.' },
  { b: 4, p: 'La hemofília A es deu al dèficit del factor:',
    o: ['VIII', 'IX', 'X', 'Von Willebrand'], c: 0,
    e: 'A abans que B, 8 abans que 9: A = VIII, B = IX.' },
  { b: 4, p: 'Quina reacció transfusional és la més freqüent?',
    o: ['Hemolítica aguda', 'Febril no hemolítica', 'Anafilaxi', 'TRALI'], c: 1,
    e: 'La febril no hemolítica és la més freqüent i benigna. La més greu és la hemolítica aguda.' },

  // Bloc 5
  { b: 5, p: 'Una QT administrada abans de la cirurgia s\'anomena:',
    o: ['Adjuvant', 'Neoadjuvant', 'Concomitant', 'Pal·liativa'], c: 1,
    e: 'Neoadjuvant = abans de la cirurgia. Adjuvant = després. Concomitant = QT + RT alhora.' },
  { b: 5, p: 'Durant una infusió de doxorubicina, la zona s\'inflama i el pacient refereix cremor. Primer pas?',
    o: ['Retirar la via', 'Aplicar calor', 'Aturar la infusió', 'Registrar'], c: 2,
    e: 'Ordre: aturar → aspirar 3-5 ml → notificar i antídot → retirar la via i delimitar → registrar.' },
  { b: 5, p: 'A Catalunya, el cribratge de càncer de mama es fa a:',
    o: ['Dones de 45-50 anys', 'Dones de 50-69 anys', 'Dones de 25-65 anys', 'Totes les dones a partir de 40'], c: 1,
    e: '50-69 anys, mamografia cada 2 anys. Els apunts originals diuen «45-50»: és un error.' },
  { b: 5, p: 'Un pacient en QT té febre de 38,6 ºC. Què has de pensar?',
    o: ['Reacció a la QT sense importància', 'Neutropènia febril', 'Mucositis', 'Síndrome de la vena cava'], c: 1,
    e: 'Febre ≥ 38,5 ºC en QT = neutropènia febril, alt risc d\'infecció.' },
  { b: 5, p: 'Edema en esclavina, ingurgitació jugular i dispnea en un pacient amb càncer de pulmó:',
    o: ['Compressió medul·lar', 'Síndrome de la vena cava superior', 'TEP', 'Insuficiència cardíaca'], c: 1,
    e: 'Síndrome de la vena cava superior: tumors intratoràcics. Tractament: stent, RT o QT.' },
  { b: 5, p: 'El grau d\'un tumor indica:',
    o: ['L\'extensió', 'L\'agressivitat cel·lular', 'El nombre de ganglis afectats', 'Si hi ha metàstasi'], c: 1,
    e: 'Grau = agressivitat cel·lular (G1-G4). Estadi = extensió.' },
  { b: 5, p: 'En una extravasació, quan NO s\'ha de retirar la via?',
    o: ['Si és un PICC', 'Si és un port-a-cath', 'Si és una via perifèrica', 'Sempre es retira'], c: 1,
    e: 'Es retira la via, però mai un port-a-cath.' },

  // Bloc 6
  { b: 6, p: 'La síndrome de Klinefelter té el cariotip:',
    o: ['45,X', '47,XXY', 'Trisomia 18', 'Deleció del cromosoma 5'], c: 1,
    e: 'Klinefelter 47,XXY (home). Turner 45,X (dona).' },
  { b: 6, p: 'Una mutació somàtica:',
    o: ['Es transmet a la descendència', 'Es troba als òvuls o espermatozoides', 'No es transmet', 'Sempre causa càncer'], c: 2,
    e: 'La somàtica és a les cèl·lules del cos i no es transmet. La germinal sí.' },
  { b: 6, p: 'Quina frase sobre el càncer és correcta?',
    o: ['Tot càncer és hereditari', 'El càncer és genètic però no sempre hereditari', 'El càncer no té base genètica', 'S\'hereta el càncer, no la predisposició'], c: 1,
    e: 'S\'hereta la predisposició, no el càncer.' },
  { b: 6, p: 'La trisomia 18 correspon a la síndrome de:',
    o: ['Down', 'Patau', 'Edwards', 'Turner'], c: 2,
    e: '21 = Down · 18 = Edwards · 13 = Patau.' }
];

// Factors que modifiquen l'INR (eina d'INR)
window.FACTORS_INR = {
  puja: ['Alcohol', 'Febre', 'Hipertiroïdisme', 'Hepatopatia', 'Antibiòtics', 'Antifúngics', 'Antidepressius', 'Amiodarona', 'Estatines'],
  baixa: ['Dieta rica en vitamina K', 'Hipotiroïdisme', 'Anticonvulsius', 'Rifampicina', 'Tiazides']
};
