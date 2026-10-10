import type { Locale } from "./types"

const nl = {
  meta: {
    title: "Tiebe Vaes · Full-stack developer",
    description:
      "Tiebe Vaes, full-stack developer. Toegepaste Informatica aan AP Hogeschool, diploma juni 2027. TypeScript, React, Next.js, Java, Spring Boot.",
  },
  nav: { catalogue: "Projecten", about: "Over mij", contact: "Contact", skip: "Naar de inhoud" },
  switchLocale: { label: "English", href: "/en", lang: "en" },
  theme: { toLight: "Lichte modus", toDark: "Donkere modus" },
  tag: {
    available: "Beschikbaar vanaf juli 2027",
    viewCatalogue: "Bekijk projecten",
    contact: "Contact",
  },
  hero: {
    pitch: "Ik bouw webapps van interface tot database.",
    facts: [
      { label: "Opleiding", value: "Toegepaste Informatica · AP Hogeschool → OsloMet" },
      { label: "Diploma", value: "Juni 2027" },
      { label: "Locatie", value: "Hoboken, Antwerpen" },
    ],
  },
  route: {
    label: "Route van Hoboken naar Oslo",
    hint: "Beweeg over de route",
    slider: "Kies een stop",
    waypoints: [
      { key: "home", title: "Hoboken", detail: "Thuisbasis. District in het zuiden van Antwerpen." },
      { key: "ap", title: "AP", detail: "Toegepaste Informatica, software. Tot december 2026." },
      { key: "scouts", title: "Scouts", detail: "Leiding bij de Welpen, twee jaar." },
      { key: "makerlab", title: "Makerlab", detail: "3D-printers en lasercutters." },
      { key: "photo", title: "Fotografie", detail: "Altijd een camera mee." },
      { key: "mountains", title: "Bergen", detail: "Hiken, hoe hoger hoe beter." },
      { key: "experiments", title: "Experimenten", detail: "Zijprojecten en nieuwe technologie." },
      { key: "oslo", title: "Oslo", detail: "Laatste semester aan OsloMet. Diploma juni 2027." },
    ],
  },
  catalogue: {
    title: "Projecten",
    intro: "Negen projecten: klantwerk en eigen experimenten.",
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
    live: "Live site",
    noRepo: "Privé-repository",
    prev: "Vorige afbeelding",
    next: "Volgende afbeelding",
  },
  playing: {
    title: "Werkwijze",
    intro: "Dagelijks gereedschap, meest gebruikt eerst.",
    figureLabel: "lijntekening die je muis volgt",
    newTab: "(opent in een nieuw tabblad)",
  },
  gear: {
    title: "Stack",
    intro: "Talen, frameworks en tools.",
    loopLabel: "Technologieën die ik gebruik",
  },
  github: {
    title: "GitHub",
    stats: { contributions: "Publieke bijdragen", activeDays: "Actieve dagen", period: "Periode", periodValue: "Laatste 12 maanden" },
    note: "Publieke activiteit, laatste 12 maanden. De meeste schoolprojecten staan niet op GitHub.",
    link: "GitHub-profiel",
    unavailable: "GitHub is nu niet bereikbaar.",
    intlLocale: "nl-BE",
    heatmap: { less: "Minder", more: "Meer", one: "bijdrage", many: "bijdragen" },
  },
  about: {
    title: "Over mij",
    body: [
      "Toegepaste Informatica (software) aan AP Hogeschool, tot december 2026. Laatste semester via Erasmus aan OsloMet. Diploma in juni 2027.",
      "Focus: volledige systemen voor echte gebruikers. Interface, API, database en uitrol.",
      "Open voor een full-time job als full-stack developer vanaf juli 2027.",
      "Naast code: twee jaar scoutsleiding, makerlab, fotografie en de bergen.",
    ],
    education: "Opleiding",
    languages: "Talen",
    levelHint: "ERK-niveau (A1 tot C2)",
  },
  contact: {
    title: "Contact",
    body: "Vragen, projecten of een job vanaf juli 2027: mail me.",
    email: "E-mail",
    location: "Locatie",
    profiles: "Profielen",
    copy: "Kopieer",
    copied: "Gekopieerd",
  },
}

export type Dictionary = typeof nl

const en: Dictionary = {
  meta: {
    title: "Tiebe Vaes · Full-stack developer",
    description:
      "Tiebe Vaes, full-stack developer. Applied Computer Science at AP University of Applied Sciences, graduating June 2027. TypeScript, React, Next.js, Java, Spring Boot.",
  },
  nav: { catalogue: "Projects", about: "About", contact: "Contact", skip: "Skip to content" },
  switchLocale: { label: "Nederlands", href: "/", lang: "nl" },
  theme: { toLight: "Light mode", toDark: "Dark mode" },
  tag: {
    available: "Available from July 2027",
    viewCatalogue: "View projects",
    contact: "Contact",
  },
  hero: {
    pitch: "I build web apps, from interface to database.",
    facts: [
      { label: "Education", value: "Applied Computer Science · AP University → OsloMet" },
      { label: "Degree", value: "June 2027" },
      { label: "Location", value: "Hoboken, Antwerp" },
    ],
  },
  route: {
    label: "Route from Hoboken to Oslo",
    hint: "Move along the route",
    slider: "Pick a stop",
    waypoints: [
      { key: "home", title: "Hoboken", detail: "Home base. A district in the south of Antwerp." },
      { key: "ap", title: "AP", detail: "Applied Computer Science, software track. Until December 2026." },
      { key: "scouts", title: "Scouts", detail: "Cub Scout leader for two years." },
      { key: "makerlab", title: "Maker lab", detail: "3D printers and laser cutters." },
      { key: "photo", title: "Photography", detail: "Never without a camera." },
      { key: "mountains", title: "Mountains", detail: "Hiking, the higher the better." },
      { key: "experiments", title: "Experiments", detail: "Side projects and new tech." },
      { key: "oslo", title: "Oslo", detail: "Final semester at OsloMet. Degree in June 2027." },
    ],
  },
  catalogue: {
    title: "Projects",
    intro: "Nine projects: client work and personal experiments.",
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
    live: "Live site",
    noRepo: "Private repository",
    prev: "Previous image",
    next: "Next image",
  },
  playing: {
    title: "Workflow",
    intro: "Everyday tools, most used first.",
    figureLabel: "line drawing that follows your pointer",
    newTab: "(opens in a new tab)",
  },
  gear: {
    title: "Stack",
    intro: "Languages, frameworks and tools.",
    loopLabel: "Technologies I use",
  },
  github: {
    title: "GitHub",
    stats: { contributions: "Public contributions", activeDays: "Active days", period: "Period", periodValue: "Last 12 months" },
    note: "Public activity, last 12 months. Most school projects aren't on GitHub.",
    link: "GitHub profile",
    unavailable: "GitHub can't be reached right now.",
    intlLocale: "en-GB",
    heatmap: { less: "Less", more: "More", one: "contribution", many: "contributions" },
  },
  about: {
    title: "About",
    body: [
      "Applied Computer Science (software track) at AP University of Applied Sciences, until December 2026. Final semester on Erasmus at OsloMet. Graduating June 2027.",
      "Focus: complete systems for real users. Interface, API, database and deployment.",
      "Open to a full-time role as a full-stack developer from July 2027.",
      "Outside code: two years as a Scout leader, the maker lab, photography and the mountains.",
    ],
    education: "Education",
    languages: "Languages",
    levelHint: "CEFR level (A1 to C2)",
  },
  contact: {
    title: "Contact",
    body: "Questions, projects or a role from July 2027: email me.",
    email: "Email",
    location: "Location",
    profiles: "Profiles",
    copy: "Copy",
    copied: "Copied",
  },
}

const dictionaries: Record<Locale, Dictionary> = { nl, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
