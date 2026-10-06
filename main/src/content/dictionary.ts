import type { Locale } from "./types"

const nl = {
  meta: {
    title: "Tiebe Vaes · Full-stack developer",
    description:
      "Tiebe Vaes, full-stack developer in opleiding aan AP Hogeschool Antwerpen. Projecten voor echte klanten in TypeScript, React, Next.js, Java en Spring Boot.",
  },
  nav: { catalogue: "Catalogus", about: "Over", contact: "Contact", skip: "Naar de inhoud" },
  switchLocale: { label: "English", href: "/en", lang: "en" },
  theme: { toLight: "Lichte modus", toDark: "Donkere modus" },
  tag: {
    artNo: "Art.",
    localTime: "Hoboken",
    graduates: "Afstuderen 2027",
    viewCatalogue: "Bekijk de catalogus",
    downloadCv: "Download cv",
  },
  route: {
    title: "Route Hoboken – Oslo",
    hint: "Beweeg over de bergkam",
    slider: "Wandel langs de route",
    waypoints: [
      { key: "home", title: "Hoboken", detail: "Thuisbasis, net onder Antwerpen." },
      { key: "ap", title: "AP Hogeschool", detail: "Toegepaste Informatica, software. Afstuderen in 2027." },
      { key: "scouts", title: "Scouts", detail: "Twee jaar leiding gegeven bij de Welpen." },
      { key: "makerlab", title: "Makerlab", detail: "Dingen maken met 3D-printers en lasercutters." },
      { key: "photo", title: "Fotografie", detail: "Altijd een camera mee, zeker onderweg." },
      { key: "mountains", title: "Bergen", detail: "Hiken, liefst zo hoog mogelijk." },
      { key: "experiments", title: "Experimenten", detail: "Eigen projectjes en nieuwe technologie uitproberen." },
      { key: "oslo", title: "Oslo", detail: "Erasmus aan OsloMet, januari tot juni 2027." },
    ],
  },
  catalogue: {
    title: "Catalogus",
    intro: "Negen projecten, van klantwerk tot eigen experimenten.",
    keysHint: "Open een artikel meteen met de toetsen",
    filters: { all: "Alles", web: "Web", mobile: "Mobiel", other: "Games en desktop" },
    filterLabel: "Filter op type",
    shipped: "Opgeleverd",
    inDevelopment: "In ontwikkeling",
    drawingLabel: "Technische tekening van {name}",
  },
  sheet: {
    myPart: "Mijn deel",
    team: "Team",
    years: "Periode",
    stack: "Stack",
    status: "Status",
    repo: "Broncode",
    live: "Bekijk online",
    noRepo: "Broncode afgeschermd",
    stackPending: "Stack wordt gekozen in sprint 0",
    prev: "Vorige afbeelding",
    next: "Volgende afbeelding",
  },
  gear: {
    title: "Uitrusting",
    intro: "Alles wat ik gebruik om te bouwen. Sleep de badges gerust rond.",
    reset: "Opnieuw schikken",
  },
  github: {
    title: "Op GitHub",
    summary: (total: number, days: number) =>
      `${total} publieke bijdragen op ${days} dagen in het laatste jaar.`,
    note: "Schoolprojecten staan grotendeels op de GitLab van AP en tellen hier niet mee.",
    link: "Bekijk mijn GitHub",
    unavailable: "GitHub is nu niet bereikbaar.",
  },
  about: {
    title: "Over de maker",
    body: [
      "Ik studeer Toegepaste Informatica (software) aan AP Hogeschool in Antwerpen en studeer af in 2027. Van januari tot juni 2027 zit ik op Erasmus aan OsloMet.",
      "Het liefst bouw ik volledige systemen voor echte gebruikers: van de interface tot de API, de database en de deployment. Na mijn studies zoek ik een job als full-stack developer.",
      "Buiten code was ik twee jaar leiding bij de scouts, maak ik dingen in het makerlab, fotografeer ik en trek ik de bergen in.",
    ],
    education: "Opleiding",
    languages: "Talen",
  },
  contact: {
    title: "Contact",
    body: "Een vraag, een project of een job na 2027? Stuur gerust een bericht.",
    email: "E-mail",
    phone: "Telefoon",
    location: "Locatie",
    profiles: "Profielen",
    cv: "Download cv",
  },
}

export type Dictionary = typeof nl

const en: Dictionary = {
  meta: {
    title: "Tiebe Vaes · Full-stack developer",
    description:
      "Tiebe Vaes, full-stack developer in training at AP University of Applied Sciences, Antwerp. Projects for real clients in TypeScript, React, Next.js, Java and Spring Boot.",
  },
  nav: { catalogue: "Catalogue", about: "About", contact: "Contact", skip: "Skip to content" },
  switchLocale: { label: "Nederlands", href: "/", lang: "nl" },
  theme: { toLight: "Light mode", toDark: "Dark mode" },
  tag: {
    artNo: "Art.",
    localTime: "Hoboken",
    graduates: "Graduating 2027",
    viewCatalogue: "View the catalogue",
    downloadCv: "Download CV",
  },
  route: {
    title: "Route Hoboken – Oslo",
    hint: "Move along the ridge",
    slider: "Walk the route",
    waypoints: [
      { key: "home", title: "Hoboken", detail: "Home base, just south of Antwerp." },
      { key: "ap", title: "AP University", detail: "Applied Computer Science, software. Graduating in 2027." },
      { key: "scouts", title: "Scouts", detail: "Two years as a leader of the Cub Scouts." },
      { key: "makerlab", title: "Maker lab", detail: "Making things with 3D printers and laser cutters." },
      { key: "photo", title: "Photography", detail: "Always a camera along, especially on the road." },
      { key: "mountains", title: "Mountains", detail: "Hiking, preferably as high as possible." },
      { key: "experiments", title: "Experiments", detail: "Side projects and trying out new technology." },
      { key: "oslo", title: "Oslo", detail: "Erasmus at OsloMet, January to June 2027." },
    ],
  },
  catalogue: {
    title: "Catalogue",
    intro: "Nine projects, from client work to personal experiments.",
    keysHint: "Open an item straight away with the keys",
    filters: { all: "All", web: "Web", mobile: "Mobile", other: "Games and desktop" },
    filterLabel: "Filter by type",
    shipped: "Shipped",
    inDevelopment: "In development",
    drawingLabel: "Technical drawing of {name}",
  },
  sheet: {
    myPart: "My part",
    team: "Team",
    years: "Period",
    stack: "Stack",
    status: "Status",
    repo: "Source code",
    live: "View online",
    noRepo: "Source code is private",
    stackPending: "Stack is chosen in sprint 0",
    prev: "Previous image",
    next: "Next image",
  },
  gear: {
    title: "Kit",
    intro: "Everything I build with. Feel free to drag the patches around.",
    reset: "Tidy up",
  },
  github: {
    title: "On GitHub",
    summary: (total: number, days: number) =>
      `${total} public contributions across ${days} days in the last year.`,
    note: "Most school projects live on AP's GitLab and are not counted here.",
    link: "View my GitHub",
    unavailable: "GitHub can't be reached right now.",
  },
  about: {
    title: "About the maker",
    body: [
      "I study Applied Computer Science (software) at AP University of Applied Sciences in Antwerp and graduate in 2027. From January to June 2027 I am on an Erasmus exchange at OsloMet.",
      "I like building whole systems for real users: from the interface to the API, the database and the deployment. After my studies I am looking for a job as a full-stack developer.",
      "Outside code I spent two years as a scout leader, I make things in the maker lab, I take photos and I head into the mountains.",
    ],
    education: "Education",
    languages: "Languages",
  },
  contact: {
    title: "Contact",
    body: "A question, a project or a job after 2027? Feel free to get in touch.",
    email: "Email",
    phone: "Phone",
    location: "Location",
    profiles: "Profiles",
    cv: "Download CV",
  },
}

const dictionaries: Record<Locale, Dictionary> = { nl, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
