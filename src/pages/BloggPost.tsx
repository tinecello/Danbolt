// ============================================================
// BLOGGPOSTER — legg til nye poster her!
// ============================================================
// For å legge til en ny post:
// 1. Kopier et eksisterende post-objekt
// 2. Endre id, slug, tittel, ingress, innhold, kategori, dato
// 3. Bilder legges i public/ mappen
// ============================================================

export interface Bloggpost {
  id: string
  slug: string
  tittel: string
  ingress: string
  innhold: string
  kategori: string
  dato: string
  bilde: string
  featured?: boolean
  lestetid: number
}

export const bloggposts: Bloggpost[] = [
  {
    id: '1',
    slug: 'etterklangstid-kirke',
    tittel: 'Etterklangstid i kirker: Hvorfor det betyr alt',
    ingress: 'Etterklangstiden er den viktigste akustiske parameteren i enhver kirke. Forstå hva det betyr og hvordan du måler det riktig.',
    innhold: `
<p>Når jeg kommer inn i en kirke for første gang, er det ikke lydanlegget jeg lytter til. Det er rommet. Den første parameteren jeg alltid måler, er etterklangstiden — for den forteller meg alt jeg trenger å vite om hvordan lyden vil oppføre seg i det rommet.</p>

<h2>Hva er etterklangstid?</h2>
<p>Etterklangstid, ofte betegnet som T60 eller RT60, er tiden det tar for lydnivået i et rom å synke med 60 desibel etter at lydkilden er stanset. Enkelt sagt: hvor lenge "ringer" lyden i rommet etter at den er slutt?</p>

<p>I en typisk norsk steinkirke kan etterklangstiden være alt fra 3 til 8 sekunder. Til sammenligning ligger anbefalt etterklangstid for tale på rundt 0.8–1.2 sekunder. Forskjellen er enorm — og det er akkurat denne utfordringen som gjør kirkeakustikk til et spesialfelt.</p>

<h2>Hvorfor er dette så viktig?</h2>
<p>Høy etterklangstid gir to hovedproblemer:</p>

<p><strong>1. Dårlig taletydelighet</strong><br>
Når etterklangen er lang, overlapper hver stavelse med neste. Ordene flyter sammen, og det blir vanskelig å forstå hva som sies. Dette er spesielt utfordrende for eldre, hørselshemmede, og ikke-morsmålstalere.</p>

<p><strong>2. Tilbakemelding (feedback)</strong><br>
For lydanlegget skaper den reflekterende lyden en slags "lydmessig forsterkningssløyfe" som gjør det vanskelig å spille høyt nok uten at systemet begynner å pipe.</p>

<h2>Hvordan måler man etterklangstid?</h2>
<p>Jeg bruker profesjonelle akustiske måleverktøy med impulssrespons-analyse. Prosessen ser slik ut:</p>

<p>1. <strong>Impulskilde:</strong> En ballongsprengning, starterpistol, eller special designet lydimpuls<br>
2. <strong>Mikrofonplassering:</strong> Flere posisjoner i rommet for å fange rommets variasjoner<br>
3. <strong>Analyse:</strong> Programvare beregner T20, T30, og EDT (Early Decay Time)<br>
4. <strong>Frekvensoppdeling:</strong> Måling per oktavbånd fra 125 Hz til 4 kHz</p>

<p>Resultatet gir meg en detaljert forståelse av rommets akustiske signatur — og det er dette som former alle mine videre anbefalinger.</p>

<h2>Hva gjør du med for høy etterklangstid?</h2>
<p>Løsningen heter akustisk behandling — absorpsjon og diffusjon. Absorpsjon reduserer etterklangen, mens diffusjon spreder refleksjonene slik at rommet føles naturlig og ikke "dødt".</p>

<p>Som uavhengig rådgiver anbefaler jeg alltid å gjennomføre en grundig akustisk måling FØR man investerer i nytt lydanlegg. Et godt lydanlegg i et dårlig rom vil alltid gi dårlig resultat — uansett hvor dyrt utstyret er.</p>

<p>Har du spørsmål om etterklangstid i din kirke? Ta kontakt for en uforpliktende samtale.</p>
    `,
    kategori: 'Kirke',
    dato: '2026-06-15',
    bilde: '/blogg-kirke.jpg',
    featured: true,
    lestetid: 6,
  },
  {
    id: '2',
    slug: 'absorpsjon-vs-diffusjon',
    tittel: 'Absorpsjon vs. diffusjon: To veier til bedre lyd',
    ingress: 'Skal du absorbere eller diffundere lyden? Lær forskjellen og når du bør bruke hvilken strategi for optimal akustikk.',
    innhold: `
<p>I mitt arbeide med akustisk behandling av kirker og kulturhus, er det to hovedverktøy jeg bruker: absorpsjon og diffusjon. De har vidt forskjellige effekter, og valget mellom dem avhenger av hva rommet skal brukes til.</p>

<h2>Absorpsjon: Å dempe lyden</h2>
<p>Absorpsjon fjerner lydenergi. Når lyd treffer et absorberende materiale — som mineralull, akustikkplater, eller spesialdesignet tekstil — konverteres lydenergien til varme. Resultatet er kortere etterklang og lavere lydnivå.</p>

<p><strong>Absorpsjon brukes når:</strong></p>
<p>• Etterklangstiden er for lang<br>
• Taletydeligheten er dårlig<br>
• Rommet har problemer med støy<br>
• Du trenger å kontrollere bass (lave frekvenser)</p>

<h2>Diffusjon: Å spre lyden</h2>
<p>Diffusjon endrer ikke lydenergien — den spreder den. Når lyd treffer en diffusor (typisk en ujevn overflate med geometriske mønstre), reflekteres lyden i mange ulike retninger. Rommet beholder sin "levende" følelse, men uten de skarpe, forstyrrende refleksjonene.</p>

<p><strong>Diffusjon brukes når:</strong></p>
<p>• Rommet føles "dødt" etter absorpsjon<br>
• Du vil bevare rommets klangkarakter<br>
• Musikalsk utøvelse er viktig<br>
• Estetiske hensyn tilsier at flater skal være synlige</p>

<h2>Den gyldne balansen</h2>
<p>I praksis bruker jeg nesten alltid en kombinasjon. I kirker legger jeg absorpsjon der det trengs mest — ofte i tak og bakvegg — mens sidevegger og front kan få diffusorer. Resultatet er et rom som har god taletydelighet, men fortsatt klinger vakkert.</p>

<p>Ønsker du en akustisk vurdering av ditt rom? Kontakt meg for en uforpliktende samtale.</p>
    `,
    kategori: 'Akustikk',
    dato: '2026-06-01',
    bilde: '/blogg-akustikk.jpg',
    lestetid: 5,
  },
  {
    id: '3',
    slug: 'taletydelighet-sti',
    tittel: 'Taletydelighet (STI): Mål det som virkelig teller',
    ingress: 'STI — Speech Transmission Index — er den mest pålitelige metoden for å måle om talen faktisk når frem til tilhørerne.',
    innhold: `
<p>Gjennom 30 år har jeg sett mange kirker og kulturrom med imponerende lydanlegg — men der folk likevel ikke forstår et ord av det som sies. Årsaken er nesten alltid den samme: dårlig taletydelighet, målt som STI (Speech Transmission Index).</p>

<h2>Hva er STI?</h2>
<p>STI er en standardisert metode for å måle hvor godt tale overføres fra taler til lytter i et rom. Verdien går fra 0 (helt uforståelig) til 1 (perfekt forståelighet). I praksis opererer vi med disse nivåene:</p>

<p>• <strong>STI 0.75–1.00:</strong> Utmerket taletydelighet<br>
• <strong>STI 0.60–0.75:</strong> God taletydelighet<br>
• <strong>STI 0.45–0.60:</strong> Akseptabelt (krever oppmerksom lytter)<br>
• <strong>STI 0.30–0.45:</strong> Dårlig — vanskelig å følge med<br>
• <strong>STI 0.00–0.30:</strong> Svært dårlig — nesten umulig å forstå</p>

<h2>Hva påvirker STI?</h2>
<p>Fire hovedfaktorer bestemmer STI-verdien i et rom:</p>

<p><strong>1. Etterklangstid (RT60)</strong><br>
Den viktigste faktoren. Lang etterklang = lav STI.</p>

<p><strong>2. Støynivå (bakgrunnsstøy)</strong><br>
Ventilasjon, trafikk, kaklende barn — alt som konkurrerer med talen.</p>

<p><strong>3. Avstand</strong><br>
Lengre avstand til taler = lavere STI.</p>

<p><strong>4. Taleanleggets kvalitet</strong><br>
Riktig plasserte høyttalere med jevn dB-dekning.</p>

<h2>Hvordan måler man STI?</h2>
<p>Jeg bruker et profesjonelt STI-måleinstrument (f.eks. NTi Audio XL2 eller Bruel & Kjaer) som sender ut et spesielt test signal (modulert støy) og analyserer hvordan rommet påvirker talefrekvensene. Målingen gjøres på flere plasser i rommet — der folk faktisk sitter.</p>

<h2>Min erfaring</h2>
<p>I kirker uten akustisk behandling ser jeg ofte STI-verdier på 0.35–0.50 — som forklarer hvorfor menigheten sliter med å høre prekenen. Etter riktig akustisk behandling og lydanlegg, ser jeg typisk forbedring til 0.65–0.80. Forskjellen er dramatisk.</p>

<p>Har du mistanke om dårlig taletydelighet i ditt rom? La meg gjøre en STI-måling — det tar mindre enn en time, og resultatet gir deg svaret du trenger.</p>
    `,
    kategori: 'Teknikk',
    dato: '2026-05-20',
    bilde: '/blogg-teknikk.jpg',
    lestetid: 7,
  },
]

export const kategorier = ['Alle', 'Akustikk', 'Kirke', 'Kulturhus', 'Teknikk', 'Tips']

// Hjelpefunksjon: formater dato
export function formatDato(dato: string): string {
  return new Date(dato).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
