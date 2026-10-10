import type { Locale } from "./types"

const nl = {
  meta: {
    title: "Tiebe Vaes · Full-stack developer",
    description:
      "Tiebe Vaes, full-stack developer in opleiding aan AP Hogeschool Antwerpen. Projecten voor echte klanten in TypeScript, React, Next.js, Java en Spring Boot.",
  },
  nav: { catalogue: "Catalogus", about: "Over mij", contact: "Contact", skip: "Naar de inhoud" },
  switchLocale: { label: "English", href: "/en", lang: "en" },
  theme: { toLight: "Lichte modus", toDark: "Donkere modus" },
  tag: {
    artNo: "Art.",
    localTime: "Hoboken",
    graduates: "Studeert af in 2027",
    viewCatalogue: "Bekijk de catalogus",
    contact: "Contact",
  },
  hero: {
    pitch: "Ik bouw volledige webapps, van de interface tot de API en de database, voor echte gebruikers.",
    facts: [
      { label: "Opleiding", value: "Toegepaste Informatica, AP Hogeschool → OsloMet" },
      { label: "Diploma", value: "Juni 2027" },
      { label: "Basis", value: "Hoboken, Antwerpen" },
    ],
  },
  route: {
    label: "Mijn route, langs wat mij bezighoudt",
    hint: "Beweeg over de bergkam",
    slider: "Wandel langs de route",
    waypoints: [
      { key: "home", title: "Hoboken", detail: "Thuisbasis: Hoboken, een district in het zuiden van Antwerpen." },
      { key: "ap", title: "AP", detail: "Toegepaste Informatica (software) aan AP Hogeschool, tot december 2026." },
      { key: "scouts", title: "Scouts", detail: "Twee jaar leiding gegeven bij de Welpen." },
      { key: "makerlab", title: "Makerlab", detail: "Dingen maken met 3D-printers en lasercutters." },
      { key: "photo", title: "Fotografie", detail: "Altijd een camera mee, zeker onderweg." },
      { key: "mountains", title: "Bergen", detail: "Hiken, liefst zo hoog mogelijk." },
      { key: "experiments", title: "Experimenten", detail: "Eigen projectjes en nieuwe technologie uitproberen." },
      { key: "oslo", title: "Oslo", detail: "Laatste semester aan OsloMet, diploma in juni 2027." },
    ],
  },
  catalogue: {
    title: "Catalogus",
    intro: "Negen projecten, van klantwerk tot eigen experimenten.",
    carouselLabel: "Schermafbeeldingen van projecten, klik om te openen",
    keysHint: "Vanuit de catalogus open je een project meteen met de toetsen",
    filters: { all: "Alles", web: "Web", mobile: "Mobiel", other: "Games en desktop" },
    filterLabel: "Filter op type",
    shipped: "Opgeleverd",
    inDevelopment: "In ontwikkeling",
    drawingLabel: "Technische tekening van {name}",
    stackLabel: "Technologieën",
  },
  sheet: {
    myPart: "Mijn deel",
    team: "Team",
    years: "Periode",
    stack: "Stack",
    close: "Sluiten",
    status: "Status",
    repo: "Broncode",
    live: "Bekijk online",
    noRepo: "Broncode afgeschermd",
    prev: "Vorige afbeelding",
    next: "Volgende afbeelding",
  },
  playing: {
    title: "Waar ik nu mee speel",
    intro: "Wat ik op dit moment het meest gebruik, van boven naar beneden. Volg een link om het zelf te proberen.",
    figureLabel: "lijntekening die op je muis reageert",
    newTab: "(opent in een nieuw tabblad)",
  },
  gear: {
    title: "Uitrusting",
    intro: "Alles wat ik gebruik om te bouwen.",
    loopLabel: "Technologieën die ik gebruik",
  },
  github: {
    title: "Op GitHub",
    stats: { contributions: "Publieke bijdragen", activeDays: "Actieve dagen", period: "Periode", periodValue: "Laatste 12 maanden" },
    note: "Mijn publieke activiteit van het laatste jaar. De meeste schoolprojecten staan niet op GitHub en tellen hier niet mee.",
    link: "Bekijk mijn GitHub",
    unavailable: "GitHub is nu niet bereikbaar.",
    intlLocale: "nl-BE",
    heatmap: { less: "Minder", more: "Meer", one: "bijdrage", many: "bijdragen" },
  },
  about: {
    title: "Over mij",
    body: [
      "Ik studeer Toegepaste Informatica (software) aan AP Hogeschool in Antwerpen, tot eind december 2026. Mijn laatste semester volg ik via Erasmus aan OsloMet, waar ik in juni 2027 mijn diploma haal.",
      "Het liefst bouw ik volledige systemen voor echte gebruikers: van de interface tot de API, de database en de uitrol. Na mijn studies zoek ik een job als full-stack developer.",
      "Buiten code was ik twee jaar leiding bij de scouts. Vandaag maak ik dingen in het makerlab, fotografeer ik en trek ik de bergen in.",
    ],
    education: "Opleiding",
    languages: "Talen",
    levelHint: "Niveau volgens het Europees Referentiekader (A1 tot C2)",
  },
  contact: {
    title: "Contact",
    body: "Een vraag, een project of een job na 2027? Stuur gerust een bericht.",
    email: "E-mail",
    location: "Locatie",
    profiles: "Profielen",
    hold: "Houd vast om te kopiëren",
    copied: "Gekopieerd",
  },
}

export type Dictionary = typeof nl

const en: Dictionary = {
  meta: {
    title: "Tiebe Vaes · Full-stack developer",
    description:
      "Tiebe Vaes, full-stack developer in training at AP University of Applied Sciences, Antwerp. Projects for real clients in TypeScript, React, Next.js, Java and Spring Boot.",
  },
  nav: { catalogue: "Catalogue", about: "About me", contact: "Contact", skip: "Skip to content" },
  switchLocale: { label: "Nederlands", href: "/", lang: "nl" },
  theme: { toLight: "Light mode", toDark: "Dark mode" },
  tag: {
    artNo: "Art.",
    localTime: "Hoboken",
    graduates: "Graduates in 2027",
    viewCatalogue: "View the catalogue",
    contact: "Contact",
  },
  hero: {
    pitch: "I build complete web apps, from the interface to the API and the database, for real users.",
    facts: [
      { label: "Education", value: "Applied Computer Science, AP University → OsloMet" },
      { label: "Degree", value: "June 2027" },
      { label: "Based in", value: "Hoboken, Antwerp" },
    ],
  },
  route: {
    label: "My route, past what keeps me busy",
    hint: "Move along the ridge",
    slider: "Walk the route",
    waypoints: [
      { key: "home", title: "Hoboken", detail: "Home base: Hoboken, a district in the south of Antwerp." },
      { key: "ap", title: "AP", detail: "Applied Computer Science (software) at AP University, until December 2026." },
      { key: "scouts", title: "Scouts", detail: "Two years as a leader of the Cub Scouts." },
      { key: "makerlab", title: "Maker lab", detail: "Making things with 3D printers and laser cutters." },
      { key: "photo", title: "Photography", detail: "Always a camera along, especially on the road." },
      { key: "mountains", title: "Mountains", detail: "Hiking, preferably as high as possible." },
      { key: "experiments", title: "Experiments", detail: "Side projects and trying out new technology." },
      { key: "oslo", title: "Oslo", detail: "Final semester at OsloMet, degree in June 2027." },
    ],
  },
  catalogue: {
    title: "Catalogue",
    intro: "Nine projects, from client work to personal experiments.",
    carouselLabel: "Project screenshots, click to open",
    keysHint: "Inside the catalogue, open a project straight away with the keys",
    filters: { all: "All", web: "Web", mobile: "Mobile", other: "Games and desktop" },
    filterLabel: "Filter by type",
    shipped: "Shipped",
    inDevelopment: "In development",
    drawingLabel: "Technical drawing of {name}",
    stackLabel: "Technologies",
  },
  sheet: {
    myPart: "My part",
    team: "Team",
    years: "Period",
    stack: "Stack",
    close: "Close",
    status: "Status",
    repo: "Source code",
    live: "View online",
    noRepo: "Source code is private",
    prev: "Previous image",
    next: "Next image",
  },
  playing: {
    title: "What I'm playing with",
    intro: "What I use most right now, top to bottom. Follow a link to try it yourself.",
    figureLabel: "line drawing that answers your pointer",
    newTab: "(opens in a new tab)",
  },
  gear: {
    title: "Kit",
    intro: "Everything I build with.",
    loopLabel: "Technologies I use",
  },
  github: {
    title: "On GitHub",
    stats: { contributions: "Public contributions", activeDays: "Active days", period: "Period", periodValue: "Last 12 months" },
    note: "My public activity over the last year. Most school projects are not on GitHub and are not counted here.",
    link: "View my GitHub",
    unavailable: "GitHub can't be reached right now.",
    intlLocale: "en-GB",
    heatmap: { less: "Less", more: "More", one: "contribution", many: "contributions" },
  },
  about: {
    title: "About me",
    body: [
      "I study Applied Computer Science (software) at AP University of Applied Sciences in Antwerp until the end of December 2026. I take my final semester through Erasmus at OsloMet, where I graduate in June 2027.",
      "I like building whole systems for real users: from the interface to the API, the database and the deployment. After my studies I am looking for a job as a full-stack developer.",
      "Outside code I spent two years as a scout leader. These days I make things in the maker lab, take photos and head into the mountains.",
    ],
    education: "Education",
    languages: "Languages",
    levelHint: "Level on the Common European Framework (A1 to C2)",
  },
  contact: {
    title: "Contact",
    body: "A question, a project or a job after 2027? Feel free to get in touch.",
    email: "Email",
    location: "Location",
    profiles: "Profiles",
    hold: "Hold to copy",
    copied: "Copied",
  },
}

const dictionaries: Record<Locale, Dictionary> = { nl, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
