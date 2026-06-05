import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const PLANE_SIZE = 32
const PLANE_HALF = PLANE_SIZE / 2
const NOSE_OFFSET = 12.7
const TRAIL_POINT_COUNT = 16

function rotateVector(x, y, degrees) {
  const radians = (degrees * Math.PI) / 180
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)

  return {
    x: x * cos - y * sin,
    y: x * sin + y * cos,
  }
}

function normalizeAngle(angle) {
  let next = angle
  while (next > 180) next -= 360
  while (next < -180) next += 360
  return next
}

function buildCurvedTrailPath(points) {
  if (!points.length) {
    return ''
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`
  }

  let path = `M ${points[0].x} ${points[0].y}`

  for (let index = 1; index < points.length - 1; index += 1) {
    const current = points[index]
    const next = points[index + 1]
    const midX = (current.x + next.x) / 2
    const midY = (current.y + next.y) / 2
    path += ` Q ${current.x} ${current.y} ${midX} ${midY}`
  }

  const last = points[points.length - 1]
  path += ` T ${last.x} ${last.y}`

  return path
}

const PROFILE = {
  name: 'Tiebe Vaes',
  age: 19,
  email: 'tiebevaes@gmail.com',
  phone: '+32 468 54 71 53',
  location: '2660 Hoboken, Belgium',
  githubUsernames: ['Tiebe-Vaes', 'TiebeVaes'],
  githubPrimaryUsername: 'Tiebe-Vaes',
  gitlabUsername: 'tiebevaes',
}

const EDUCATION = [
  {
    title: 'IT & Software, AP Hogeschool',
    period: '2024 - heden',
    place: 'Antwerpen',
  },
  {
    title: 'Boekhouden-Informatica, H. Pius X - Instituut',
    period: '2022 - 2024',
    place: 'Wilrijk',
  },
  {
    title: 'Wetenschappen, H. Pius X - Instituut',
    period: '2018 - 2022',
    place: 'Wilrijk',
  },
]

const CONTENT = {
  nl: {
    tagline: 'Building smart digital solutions',
    description:
      'Gemotiveerde student die zelfstandig en stipt werkt. Buiten code geef ik scoutsleiding, train ik in de fitness en bouw ik graag webprojecten met focus op kwaliteit.',
    ctaProjects: 'Bekijk Projecten',
    ctaContact: 'Contacteer Mij',
    downloadCv: 'Download CV',
    aboutTitle: 'Over mij',
    aboutText:
      'Ik ben 19 jaar en studeer Toegepaste Informatica in Antwerpen. Mijn focus ligt op groeien als developer door constant bij te leren, echte problemen op te lossen en projecten af te werken met een hoge standaard.',
    languagesTitle: 'Talen',
    educationTitle: 'Opleiding',
    skillsTitle: 'Skills',
    projectsTitle: 'Projecten',
    projectsSubtitle:
      'Automatisch ingeladen vanuit GitHub/GitLab met extra gepinde projecten.',
    filterType: 'Type',
    filterLanguage: 'Taal',
    loadingProjects: 'Projecten worden geladen...',
    repo: 'Repo',
    liveDemo: 'Live Demo',
    contactTitle: 'Contact',
    programming: 'Programming',
    frameworks: 'Frameworks',
    tools: 'Tools',
    all: 'All',
  },
  en: {
    tagline: 'Building smart digital solutions',
    description:
      'Motivated student who works independently and punctually. Outside coding, I lead scouts activities, train in the gym, and build web projects with a quality-first mindset.',
    ctaProjects: 'View Projects',
    ctaContact: 'Contact Me',
    downloadCv: 'Download CV',
    aboutTitle: 'About me',
    aboutText:
      'I am 19 years old and study Applied Computer Science in Antwerp. My focus is on growing as a developer by continuously learning, solving real problems, and finishing projects to a high standard.',
    languagesTitle: 'Languages',
    educationTitle: 'Education',
    skillsTitle: 'Skills',
    projectsTitle: 'Projects',
    projectsSubtitle:
      'Automatically loaded from GitHub/GitLab with additional pinned projects.',
    filterType: 'Type',
    filterLanguage: 'Language',
    loadingProjects: 'Loading projects...',
    repo: 'Repo',
    liveDemo: 'Live Demo',
    contactTitle: 'Contact',
    programming: 'Programming',
    frameworks: 'Frameworks',
    tools: 'Tools',
    all: 'All',
  },
}

const SKILL_ICON_SLUGS = {
  'c#': 'dotnet',
  typescript: 'typescript',
  javascript: 'javascript',
  java: 'openjdk',
  sql: 'mysql',
  html: 'html5',
  css: 'css',
  react: 'react',
  angular: 'angular',
  'next.js': 'nextdotjs',
  'spring boot': 'springboot',
  'react native': 'react',
  tailwind: 'tailwindcss',
  flutter: 'flutter',
  git: 'git',
  github: 'github',
  gitlab: 'gitlab',
  mysql: 'mysql',
  firebase: 'firebase',
  docker: 'docker',
  'vs code': 'visualstudiocode',
  dart: 'dart',
  express: 'express',
  expo: 'expo',
  babel: 'babel',
  'google maps': 'googlemaps',
  traefik: 'traefikproxy',
  monogame: 'monogame',
  'docker swarm': 'docker',
  '.net 9': 'dotnet',
  node: 'nodedotjs',
  'node.js': 'nodedotjs',
  postgresql: 'postgresql',
  rabbitmq: 'rabbitmq',
  redis: 'redis',
}

const DARK_BRAND_SLUGS = new Set([
  'github',
  'nextdotjs',
  'dotnet',
  'flutter',
  'angular',
  'openjdk',
  'express',
  'expo',
  'traefikproxy',
])

const SKILL_ICON_OVERRIDES = {
  visualstudiocode:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  css: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
}

function SkillIcon({ name, theme }) {
  const slug = SKILL_ICON_SLUGS[name.toLowerCase()]
  const [failed, setFailed] = useState(false)
  if (!slug || failed) {
    return <UiIcon name="code" className="h-4 w-4 text-cyan-300" />
  }
  const needsLight = theme === 'dark' && DARK_BRAND_SLUGS.has(slug)
  const src = needsLight
    ? `https://cdn.simpleicons.org/${slug}/ffffff`
    : SKILL_ICON_OVERRIDES[slug] || `https://cdn.simpleicons.org/${slug}`
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="h-4 w-4"
      onError={() => setFailed(true)}
    />
  )
}

const PROJECT_SCREENSHOTS = {
  gosmartlib: ['/GSLSS.png', '/GSLSS2.png', '/GSLSS3.png'],
  redline: ['/Redline1.jpeg', '/Redline2.jpeg', '/Redline3.jpeg', '/Redline4.jpeg'],
  locallend: ['/LLSS1.png', '/LLSS2.png', '/LLSS3.png', '/LLSS4.png'],
  mono: ['/MONOSS1.png'],
  petalpurrs: ['/PPSS1.png'],
  travel: ['/c4-context.png', '/c4-containers.png', '/c4-deployment.png'],
}

function getProjectScreenshots(projectName) {
  const key = projectName.trim().toLowerCase().split(' ')[0]
  return PROJECT_SCREENSHOTS[key]
}

function ProjectGallery({ images, projectName }) {
  const [index, setIndex] = useState(0)
  if (!images || !images.length) return null
  const total = images.length
  const go = (event, dir) => {
    event.stopPropagation()
    setIndex((i) => (i + dir + total) % total)
  }
  return (
    <div className="project-gallery">
      <div className="project-gallery-frame">
        <img
          key={images[index]}
          src={images[index]}
          alt={`${projectName} screenshot ${index + 1}`}
          loading="lazy"
          className="project-gallery-img"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={(event) => go(event, -1)}
              className="project-gallery-nav project-gallery-nav-prev"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(event) => go(event, 1)}
              className="project-gallery-nav project-gallery-nav-next"
            >
              ›
            </button>
          </>
        )}
      </div>
      {total > 1 && (
        <div className="project-gallery-dots">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={(event) => {
                event.stopPropagation()
                setIndex(i)
              }}
              className={`project-gallery-dot${i === index ? ' is-active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectModal({ project, locale, theme, onClose, labels }) {
  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  if (!project) {
    return null
  }

  const images = getProjectScreenshots(project.name)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <p className="modal-eyebrow">
          {localizedText(project.category, locale) || project.source}
        </p>
        <h2 className="modal-title font-title">{project.name}</h2>

        {images?.length > 0 && (
          <div className="modal-gallery">
            <ProjectGallery images={images} projectName={project.name} />
          </div>
        )}

        <p className="modal-desc">
          {localizedText(project.details || project.description, locale)}
        </p>

        {project.tech?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={`modal-${project.id}-${tag}`}
                className="chip flex items-center gap-2"
              >
                <SkillIcon name={tag} theme={theme} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.repoUrl && (
          <div className="mt-6 flex text-sm">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="project-link inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/50 px-3 py-2 font-semibold text-cyan-300 transition hover:border-cyan-400/60 hover:bg-zinc-800"
            >
              <ContactIcon name="github" />
              <span>{labels.repo}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

const SKILLS = {
  programming: ['C#', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'HTML', 'CSS'],
  frameworks: ['React', 'Angular', 'Next.js', 'Spring Boot', 'React Native', 'Flutter', 'Tailwind'],
  tools: ['Git', 'GitHub', 'GitLab', 'MySQL', 'Firebase', 'Docker', 'VS Code'],
  languages: [
    { icon: 'nl', nl: 'Nederlands', en: 'Dutch' },
    { icon: 'en', nl: 'Engels', en: 'English' },
  ],
}

const MANUAL_PROJECTS = [
  {
    id: 'manual-gosmartlib',
    source: 'GitLab',
    name: 'GoSmartLib',
    description: {
      nl: 'Full-stack bibliotheekplatform voor scholen met Smartschool-login, uitleenbeheer, reviews en AI-aanbevelingen over meerdere campussen.',
      en: 'Full-stack library platform for schools with Smartschool login, lending management, reviews and AI recommendations across multiple campuses.',
    },
    details: {
      nl: 'GoSmartLib is een full-stack bibliotheekplatform voor onderwijsinstellingen die over meerdere scholen en campussen werken. Het combineert een gedeelde boekencatalogus, de volledige uitleenflow, sociale leesfeatures en AI-aanbevelingen achter één responsieve webinterface. Authenticatie verloopt volledig via Smartschool OAuth 2.0 met stateless JWT\'s en vier rollen (student, leerkracht, admin, super admin), met strikte data-isolatie per school. Gebouwd met Next.js & React op de frontend en Spring Boot (Java 21) op de backend, met MySQL, Traefik en Docker. (AP-teamproject, GitLab-repo afgeschermd.)',
      en: 'GoSmartLib is a full-stack library platform for educational institutions operating across multiple schools and campuses. It combines a shared book catalog, the complete borrowing lifecycle, social reading features and AI-assisted recommendations behind a single responsive web interface. Authentication runs entirely on Smartschool OAuth 2.0 with stateless JWTs and four roles (student, teacher, admin, super admin), with strict per-school data isolation. Built with Next.js & React on the frontend and Spring Boot (Java 21) on the backend, with MySQL, Traefik and Docker. (AP team project, GitLab repo is private.)',
    },
    category: { nl: 'Full-stack webapp', en: 'Full-Stack Web App' },
    language: 'Full Stack',
    tech: ['TypeScript', 'Java', 'Next.js', 'React', 'Spring Boot', 'MySQL', 'Docker'],
    repoUrl: '',
    liveUrl: '',
    updatedAt: '2026-04-02T00:00:00Z',
  },
]

const KARTING_DESCRIPTION = {
  nl: 'Mobiele app voor (kart)racers: bekijk circuits, maak races aan, reserveer een plek en chat live met de deelnemers.',
  en: 'Mobile app for (kart) racers: browse tracks, create races, reserve a spot and chat live with the participants.',
}
const LOCALLEND_DESCRIPTION = {
  nl: 'Peer-to-peer verhuurapp waarmee buren toestellen en gereedschap uitlenen, met zoeken op kaart, boekingen en reviews.',
  en: 'Peer-to-peer rental app for neighbours to lend out appliances and tools, with map search, bookings and reviews.',
}
const MONO_DESCRIPTION = {
  nl: '2D-platformer waarin je levels doorloopt, obstakels zoals spikes en tornado\'s ontwijkt en gems verzamelt.',
  en: '2D platformer where you clear levels, dodge obstacles like spikes and tornadoes, and collect gems.',
}
const ICT_ARCH_DESCRIPTION = {
  nl: 'Architectuur case study voor een reisplanning-platform: modulaire monoliet met C4-modellen, ADR\'s en vijf proof-of-concepts.',
  en: 'Architecture case study for a travel-planning platform: modular monolith with C4 models, ADRs and five proofs of concept.',
}
const PETALPURRS_DESCRIPTION = {
  nl: 'Cozy theewinkel-game waarin je thee zet voor kat-klanten, fooien verdient en nieuwe koppen en theesoorten ontgrendelt.',
  en: 'Cozy tea-shop game where you brew tea for cat customers, earn tips and unlock new cups and tea types.',
}

// Longer descriptions shown in the project detail modal.
const KARTING_DETAILS = {
  nl: 'RedLine is een mobiele app voor (kart)racers, gebouwd met React Native, Expo en TypeScript. Je bekijkt beschikbare circuits, maakt zelf races aan op een track en reserveert een plek om mee te doen. Elke race heeft een eigen live chatroom zodat deelnemers kunnen afspreken, en je kan tracks en races beoordelen. Authenticatie en data verlopen via Firebase (Auth + Firestore).',
  en: 'RedLine is a mobile app for (kart) racers, built with React Native, Expo and TypeScript. You browse available tracks, create your own races on a circuit and reserve a spot to join. Every race has its own live chatroom so participants can coordinate, and you can rate tracks and races. Authentication and data run on Firebase (Auth + Firestore).',
}
const LOCALLEND_DETAILS = {
  nl: 'LocalLend is een peer-to-peer verhuurapp waarmee buren huishoudtoestellen en gereedschap aan elkaar uitlenen. Eigenaars plaatsen items met foto, prijs, categorie en een beschikbaarheidskalender; huurders zoeken items in de buurt via een lijst of een interactieve Google Map, boeken de dagen die ze nodig hebben en laten achteraf reviews achter. Gebouwd met Flutter en Riverpod, met Firebase (Auth + Firestore) en real-time sync zodat boekingen meteen bij iedereen verschijnen.',
  en: 'LocalLend is a peer-to-peer rental app that lets neighbours lend household appliances and tools to each other. Owners list items with a photo, price, category and availability calendar; renters browse nearby items on a list or an interactive Google Map, book the days they need and leave reviews afterwards. Built with Flutter and Riverpod, backed by Firebase (Auth + Firestore) with real-time sync so bookings show up for everyone instantly.',
}
const MONO_DETAILS = {
  nl: 'Mono is een 2D-platformer gebouwd met C# en het MonoGame-framework op .NET 9. Je navigeert door verschillende levels, ontwijkt obstakels zoals spikes, tornado\'s en boekenkasten, en verzamelt gems om je score te verhogen. Het project gebruikt eigen animaties, een state-systeem voor de gamestates en factories voor de obstakels, met een oplopende moeilijkheidsgraad per level.',
  en: 'Mono is a 2D platformer built with C# and the MonoGame framework on .NET 9. You navigate through multiple levels, dodge obstacles like spikes, tornadoes and bookshelves, and collect gems to boost your score. The project uses custom animations, a state system for the game states and factories for the obstacles, with difficulty that ramps up per level.',
}
const ICT_ARCH_DETAILS = {
  nl: 'Een software-architectuur case study (AP Hogeschool, team van vijf) voor een platform waarmee vrienden samen reizen plannen met gedeelde budgetten, activiteiten en integraties naar externe reisproviders. De gekozen stijl is een modulaire monoliet in Node.js, met ACID-transacties voor gedeelde budgetten en duidelijke modulegrenzen richting microservices. De uitwerking omvat zeven kwaliteitsattributen, een C4-model in Structurizr, zes ADR\'s (MADR) en vijf deploybare proof-of-concepts op Docker Swarm. Mijn bijdrage: ADR-003 (authenticatie) en POC 1 (OAuth2 + eigen JWT).',
  en: 'A software architecture case study (AP University, team of five) for a platform where friends plan trips together with shared budgets, activities and integrations to external travel providers. The chosen style is a modular monolith in Node.js, with ACID transactions for shared budgets and clear module boundaries that keep a path open to microservices. The work covers seven quality attributes, a C4 model in Structurizr, six ADRs (MADR) and five deployable proofs of concept on Docker Swarm. My contribution: ADR-003 (authentication) and POC 1 (OAuth2 + own JWT).',
}
const PETALPURRS_DETAILS = {
  nl: 'PetalPurrs is een cozy theewinkel-game waarin je bestellingen van kat-klanten serveert. Lees de wens in hun tekstballon en zet de juiste thee met de juiste kop, temperatuur (ijs/warm/heet) en extra\'s; een perfecte match levert bovenop de basismunten ook fooi op. Werk de wachtrij af, level op en ontgrendel nieuwe koppen en zeldzamere theesoorten, en beheer ondertussen je tuin om je voorraad theeblaadjes aan te vullen. Gebouwd met React (via CDN) en Babel, zonder buildstap.',
  en: 'PetalPurrs is a cozy tea-shop game where you serve orders to cat customers. Read each cat\'s request in their speech bubble and brew the right tea with the right cup, temperature (iced/warm/hot) and extras; a perfect match earns a tip on top of the base coins. Work through the queue, level up and unlock new cups and rarer tea types, and manage your garden to keep your tea-leaf stock full. Built with React (via CDN) and Babel, with no build step.',
}

const GITHUB_DESCRIPTION_OVERRIDES = {
  'Tiebe-Vaes/intro-mobile-react': KARTING_DESCRIPTION,
  'TiebeVaes/intro-mobile-react': KARTING_DESCRIPTION,
  'Tiebe-Vaes/LocalLend': LOCALLEND_DESCRIPTION,
  'TiebeVaes/LocalLend': LOCALLEND_DESCRIPTION,
  'Tiebe-Vaes/Mono': MONO_DESCRIPTION,
  'TiebeVaes/Mono': MONO_DESCRIPTION,
  'Tiebe-Vaes/ICT-arch': ICT_ARCH_DESCRIPTION,
  'TiebeVaes/ICT-arch': ICT_ARCH_DESCRIPTION,
  'Tiebe-Vaes/PetalPurrs': PETALPURRS_DESCRIPTION,
  'TiebeVaes/PetalPurrs': PETALPURRS_DESCRIPTION,
}

const GITHUB_PROJECT_OVERRIDES = {
  'Tiebe-Vaes/intro-mobile-react': { name: 'RedLine' },
  'TiebeVaes/intro-mobile-react': { name: 'RedLine' },
  'Tiebe-Vaes/LocalLend': { name: 'LocalLend' },
  'TiebeVaes/LocalLend': { name: 'LocalLend' },
  'Tiebe-Vaes/ICT-arch': { name: 'Travel Planning Platform' },
  'TiebeVaes/ICT-arch': { name: 'Travel Planning Platform' },
}

// Languages + frameworks per repo, taken from the actual code in each repo.
// GitHub's languages API is noisy here (Flutter ships C++/CMake/Swift platform
// folders, ICT-arch ships Mermaid/Dockerfile), so these are curated to the real
// languages/frameworks rather than the raw byte counts.
const REPO_TECH = {
  'intro-mobile-react': {
    category: { nl: 'Mobiele app', en: 'Mobile App' },
    languages: ['TypeScript'],
    frameworks: ['React Native', 'Expo', 'Firebase'],
    details: KARTING_DETAILS,
  },
  LocalLend: {
    category: { nl: 'Mobiele app', en: 'Mobile App' },
    languages: ['Dart'],
    frameworks: ['Flutter', 'Riverpod', 'Firebase', 'Google Maps'],
    details: LOCALLEND_DETAILS,
  },
  Mono: {
    category: { nl: '2D-platformer', en: '2D Platformer' },
    languages: ['C#'],
    frameworks: ['MonoGame', '.NET 9'],
    details: MONO_DETAILS,
  },
  'ICT-arch': {
    category: { nl: 'Software-architectuur', en: 'Software Architecture' },
    languages: ['JavaScript', 'HTML'],
    frameworks: ['Express', 'React', 'Docker Swarm', 'Traefik'],
    details: ICT_ARCH_DETAILS,
  },
  PetalPurrs: {
    category: { nl: 'Browsergame', en: 'Browser Game' },
    languages: ['JavaScript', 'CSS', 'HTML'],
    frameworks: ['React', 'Babel'],
    details: PETALPURRS_DETAILS,
  },
}

// Expand to both username variants (Tiebe-Vaes/ and TiebeVaes/).
const GITHUB_TECH_OVERRIDES = Object.fromEntries(
  Object.entries(REPO_TECH).flatMap(([repo, value]) => [
    [`Tiebe-Vaes/${repo}`, value],
    [`TiebeVaes/${repo}`, value],
  ]),
)

// Pick the right language from a { nl, en } object (falls back gracefully,
// and tolerates plain strings from older cached data).
function localizedText(value, locale) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[locale] || value.nl || value.en || ''
}

function getGithubDescription(repo) {
  const override = GITHUB_DESCRIPTION_OVERRIDES[repo.full_name]
  if (override) {
    return override
  }

  if (repo.description) {
    return { nl: repo.description, en: repo.description }
  }

  return {
    nl: `${repo.name} is een ${repo.language || 'software'} project dat ik heb opgebouwd als onderdeel van mijn leer- en projecttraject.`,
    en: `${repo.name} is a ${repo.language || 'software'} project I built as part of my learning and project journey.`,
  }
}

function normalizeGithubProject(repo) {
  const projectOverride = GITHUB_PROJECT_OVERRIDES[repo.full_name] || {}
  const techOverride = GITHUB_TECH_OVERRIDES[repo.full_name] || {}

  const languages =
    techOverride.languages || [repo.language].filter(Boolean)
  const frameworks = techOverride.frameworks || repo.topics || []

  return {
    id: `gh-${repo.id}`,
    source: 'GitHub',
    name: projectOverride.name || repo.name,
    description: getGithubDescription(repo),
    category: techOverride.category || repo.language || 'Project',
    language: repo.language || 'Other',
    languages,
    frameworks,
    tech: [...languages, ...frameworks],
    details: techOverride.details || getGithubDescription(repo),
    repoUrl: repo.html_url,
    liveUrl: repo.homepage || '',
    updatedAt: repo.updated_at,
  }
}

function normalizeGitlabProject(project) {
  const languages = [project.language].filter(Boolean)
  const frameworks = project.tag_list || []

  return {
    id: `gl-${project.id}`,
    source: 'GitLab',
    name: project.name,
    description: project.description
      ? { nl: project.description, en: project.description }
      : { nl: 'Geen beschrijving toegevoegd.', en: 'No description provided.' },
    category: project.language || 'Project',
    language: project.language || 'Other',
    languages,
    frameworks,
    tech: [...languages, ...frameworks],
    details: project.description
      ? { nl: project.description, en: project.description }
      : { nl: 'Geen beschrijving toegevoegd.', en: 'No description provided.' },
    repoUrl: project.web_url,
    liveUrl: project.homepage || '',
    updatedAt: project.last_activity_at,
  }
}

function ContactIcon({ name }) {
  const iconClass = 'h-5 w-5 shrink-0 text-cyan-300'

  if (name === 'mail') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
        <path
          d="M4 6h16v12H4V6Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m5 7 7 6 7-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'phone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
        <path
          d="M8.2 5.3c.4-.4 1-.5 1.5-.2l1.8 1c.6.3.8 1 .5 1.6l-.8 1.7c-.2.4-.1.9.2 1.2l2.6 2.6c.3.3.8.4 1.2.2l1.7-.8c.6-.3 1.3-.1 1.6.5l1 1.8c.3.5.2 1.1-.2 1.5l-1.2 1.2c-.8.8-2 1.1-3 .7-2.7-1.1-5.1-2.9-7-4.9-2.1-1.9-3.9-4.3-5-7-.4-1-.2-2.2.6-3l1.2-1.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'location') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
        <path
          d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
        <path
          d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.5-.2.5-.4v-1.6c-2.2.5-2.6-.9-2.6-.9-.4-.9-.9-1.1-.9-1.1-.7-.5 0-.5 0-.5.8.1 1.2.8 1.2.8.7 1.2 1.8.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.3-1 .1-2.1 0 0 .7-.2 2.1.8a7.6 7.6 0 0 1 3.9 0c1.5-1 2.2-.8 2.2-.8.4 1.1.1 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3-1.8 3.7-3.6 3.9.3.2.5.7.5 1.4v2c0 .2.1.5.5.4A8.5 8.5 0 0 0 12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
      <path
        d="M4 5h16v14H4V5Zm3 3h10M7 12h10M7 16h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function UiIcon({ name, className = 'h-4 w-4' }) {
  if (name === 'moon') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M20 14.2a8 8 0 1 1-10.2-10 7 7 0 1 0 10.2 10Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'sun') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (name === 'download') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 4v12m0 0-4-4m4 4 4-4M5 20h14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'language') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M4 6h10M9 6c-.3 3.7-1.8 7.2-4.3 10M13 18l3.7-8 3.8 8M14.4 15h4.7M11.4 4c1.4 2.2 3.3 4.1 5.6 5.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'nl') {
    return <span className={className}>NL</span>
  }

  if (name === 'en') {
    return <span className={className}>EN</span>
  }

  if (name === 'nederlands') {
    return <span className={className}>NL</span>
  }

  if (name === 'engels') {
    return <span className={className}>EN</span>
  }

  if (name === 'java') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M8 18h7.5a3.5 3.5 0 0 0 0-7H14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 10v4a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4v-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.2 6.5c0 .8-.6 1.2-.6 2m3-2c0 .8-.6 1.2-.6 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (name === 'code') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="m8 8-4 4 4 4m8-8 4 4-4 4m-6 4 4-16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'tool') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M14.5 4.5a4.5 4.5 0 0 0 5 6L12 18l-4 1 1-4 7.5-7.5a4.5 4.5 0 0 0-2-3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return null
}

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [languageFilter, setLanguageFilter] = useState('all')
  const [activeProject, setActiveProject] = useState(null)
  const [plane, setPlane] = useState({
    x: 140,
    y: 140,
    angle: -12,
    roll: 0,
  })
  const cursorTargetRef = useRef({ x: 140, y: 140 })
  const trailPointsRef = useRef(
    Array.from({ length: TRAIL_POINT_COUNT }, () => ({ x: 140, y: 140 })),
  )
  const boostUntilRef = useRef(0)
  const rollRef = useRef({ start: 0, active: false })
  const planePosRef = useRef({ x: 140, y: 140 })
  const puffIdRef = useRef(0)
  const [puffs, setPuffs] = useState([])
  const trailHotTimeoutRef = useRef(0)
  const [trailHot, setTrailHot] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'nl')
  const t = CONTENT[locale] || CONTENT.nl

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.classList.toggle('body-light', theme === 'light')
  }, [theme])

  useEffect(() => {
    function updateFavicons(currentTheme) {
      const icon = currentTheme === 'dark' ? '/TVbl.png' : '/TV.png'

      const setLink = (selector, relValue) => {
        let el = document.querySelector(selector)
        if (!el) {
          el = document.createElement('link')
          el.rel = relValue
          document.head.appendChild(el)
        }
        el.href = icon
      }

      setLink("link[rel='icon']", 'icon')
      setLink("link[rel='shortcut icon']", 'shortcut icon')
      setLink("link[rel='apple-touch-icon']", 'apple-touch-icon')

      const msTile = document.querySelector("meta[name='msapplication-TileImage']")
      if (msTile) msTile.content = icon

      const themeColor = document.querySelector("meta[name='theme-color']")
      if (themeColor) themeColor.content = currentTheme === 'dark' ? '#0b1220' : '#06b6d4'
    }

    updateFavicons(theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('locale', locale)
  }, [locale])

  useEffect(() => {
    function onPointerMove(event) {
      cursorTargetRef.current = { x: event.clientX, y: event.clientY }
    }

    window.addEventListener('pointermove', onPointerMove)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  useEffect(() => {
    function onClick(event) {
      const now = performance.now()
      boostUntilRef.current = now + 650
      rollRef.current = { start: now, active: true }
      cursorTargetRef.current = { x: event.clientX, y: event.clientY }

      const id = puffIdRef.current + 1
      puffIdRef.current = id
      const { x, y } = planePosRef.current
      setPuffs((prev) => [...prev, { id, x, y }])
      window.setTimeout(() => {
        setPuffs((prev) => prev.filter((puff) => puff.id !== id))
      }, 650)

      setTrailHot(true)
      window.clearTimeout(trailHotTimeoutRef.current)
      trailHotTimeoutRef.current = window.setTimeout(() => setTrailHot(false), 1600)
    }

    window.addEventListener('pointerdown', onClick)

    return () => {
      window.removeEventListener('pointerdown', onClick)
    }
  }, [])

  useEffect(() => {
    let frameId

    function tick() {
      const target = cursorTargetRef.current
      const now = performance.now()
      const boosting = now < boostUntilRef.current

      let roll = 0
      if (rollRef.current.active) {
        const progress = (now - rollRef.current.start) / 600
        if (progress >= 1) {
          rollRef.current.active = false
        } else {
          roll = 360 * (1 - Math.pow(1 - progress, 3))
        }
      }

      setPlane((current) => {
        const chase = boosting ? 0.24 : 0.07
        const trailLag = 0.05

        const targetDirection =
          (Math.atan2(target.y - current.y, target.x - current.x) * 180) / Math.PI + 45
        const angleDelta = normalizeAngle(targetDirection - current.angle)
        const nextAngle = current.angle + angleDelta * (boosting ? 0.24 : 0.12)

        const noseVector = rotateVector(NOSE_OFFSET, -NOSE_OFFSET, nextAngle)
        const desiredCenterX = target.x - noseVector.x
        const desiredCenterY = target.y - noseVector.y

        const nextX = current.x + (desiredCenterX - current.x) * chase
        const nextY = current.y + (desiredCenterY - current.y) * chase

        // Emit the trail from the plane's actual (rolling) nose so the trail
        // curls into a natural loop during the barrel-roll.
        const nextNose = rotateVector(NOSE_OFFSET, -NOSE_OFFSET, nextAngle + roll)
        const nosePoint = {
          x: nextX + nextNose.x,
          y: nextY + nextNose.y,
        }

        const previous = trailPointsRef.current
        const nextTrail = [nosePoint]

        for (let index = 1; index < TRAIL_POINT_COUNT; index += 1) {
          const source = previous[index - 1] || previous[previous.length - 1] || nosePoint
          const currentPoint = previous[index] || source
          nextTrail.push({
            x: currentPoint.x + (source.x - currentPoint.x) * trailLag,
            y: currentPoint.y + (source.y - currentPoint.y) * trailLag,
          })
        }

        trailPointsRef.current = nextTrail
        planePosRef.current = { x: nextX, y: nextY }

        return {
          x: nextX,
          y: nextY,
          angle: nextAngle,
          roll,
          boost: boosting,
        }
      })

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    let ignore = false

    async function loadProjects() {
      setLoading(true)
      setError('')

      try {
        const githubPromises = PROFILE.githubUsernames.map((username) => {
          return fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
          ).then((response) => {
            if (!response.ok) {
              throw new Error(`GitHub gebruiker ${username} kon niet geladen worden.`)
            }

            return response.json()
          })
        })

        const gitlabPromise = fetch(
          `https://gitlab.com/api/v4/users?username=${PROFILE.gitlabUsername}`,
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error('GitLab profiel kon niet geladen worden.')
            }

            return response.json()
          })
          .then((users) => {
            if (!users.length) {
              return []
            }

            return fetch(
              `https://gitlab.com/api/v4/users/${users[0].id}/projects?order_by=last_activity_at&sort=desc&per_page=100`,
            ).then((response) => {
              if (!response.ok) {
                throw new Error('GitLab projecten konden niet geladen worden.')
              }

              return response.json()
            })
          })

        const [githubRepoResults, gitlabProjects] = await Promise.all([
          Promise.allSettled(githubPromises),
          gitlabPromise,
        ])

        const githubRepos = githubRepoResults
          .filter((result) => result.status === 'fulfilled')
          .flatMap((result) => result.value)

        if (!githubRepos.length) {
          throw new Error('GitHub kon niet geladen worden.')
        }

        if (ignore) {
          return
        }

        const mergedProjects = [
          ...MANUAL_PROJECTS,
          ...githubRepos.map(normalizeGithubProject),
          ...gitlabProjects.map(normalizeGitlabProject),
        ]
        const uniqueProjects = Array.from(
          new Map(mergedProjects.map((project) => [project.repoUrl, project])).values(),
        )

        const sortedProjects = uniqueProjects
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .filter((project) => {
            const projectName = project.name.toLowerCase()
            return !projectName.includes('config') && projectName !== 'tiebevs'
          })

        setProjects(sortedProjects)
        try {
          localStorage.setItem(
            'tv:projects-cache',
            JSON.stringify({ at: Date.now(), projects: sortedProjects }),
          )
        } catch {}
      } catch (fetchError) {
        if (!ignore) {
          let usedFallback = false
          try {
            const raw = localStorage.getItem('tv:projects-cache')
            if (raw) {
              const cached = JSON.parse(raw)
              if (Array.isArray(cached?.projects) && cached.projects.length) {
                setProjects(cached.projects)
                usedFallback = true
              }
            }
          } catch {}
          if (!usedFallback) {
            setProjects(MANUAL_PROJECTS)
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadProjects()

    return () => {
      ignore = true
    }
  }, [])

  const languages = useMemo(() => {
    return [
      'all',
      ...new Set(projects.map((project) => project.language).filter(Boolean)),
    ]
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const sourceMatches =
        sourceFilter === 'all' || project.source.toLowerCase() === sourceFilter
      const languageMatches =
        languageFilter === 'all' || project.language === languageFilter

      return sourceMatches && languageMatches
    })
  }, [projects, sourceFilter, languageFilter])

  const planeNose = rotateVector(NOSE_OFFSET, -NOSE_OFFSET, plane.angle)
  const noseX = plane.x + planeNose.x
  const noseY = plane.y + planeNose.y
  const trailPath = buildCurvedTrailPath(trailPointsRef.current)

  return (
    <div
      className={`theme-${theme} relative min-h-screen overflow-x-hidden ${theme === 'dark' ? 'bg-graphite text-zinc-100' : 'bg-slate-50 text-slate-900'
        }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="scene-sky" />
        <div className="scene-stars" />
        <div className="scene-horizon-glow" />
        <div className="scene-ground" />
        <svg
          viewBox="0 0 1440 900"
          className="scene-giant-mountain"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 900 120 900 260 710 390 560 520 660 680 430 820 610 960 520 1120 700 1260 620 1440 900Z"
            fill="rgba(12, 24, 36, 0.93)"
          />
          <path
            d="M80 900 270 650 390 560 520 660 600 760 700 540 820 610 900 700 1040 560 1160 700 1260 620 1320 760 1440 900Z"
            fill="rgba(31, 48, 66, 0.82)"
          />
          <path
            d="M650 520 680 430l34 56 44-10-26 46 24 34-50-18-38 32-12-46-42-18 32-16Z"
            fill="rgba(225, 236, 247, 0.76)"
          />
          <path
            d="M1010 565 1110 490 1180 560 1220 690 1100 720Z"
            fill="rgba(19, 33, 48, 0.76)"
          />
          <path
            d="M260 710 390 560 520 660M680 430 820 610 960 520M960 520 1120 700 1260 620"
            stroke="rgba(142, 175, 206, 0.4)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <svg
          viewBox="0 0 1440 260"
          className="scene-trees"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 260V220l26-30 20 30 19-24 18 24 22-28 23 28 21-22 18 22 30-32 20 32 18-20 22 20 28-36 24 36 18-18 16 18 29-26 24 26 22-32 22 32 16-18 24 18 26-30 22 30 24-36 25 36 18-22 19 22 24-30 28 30 18-24 24 24 16-18 22 18 24-28 28 28 20-20 20 20 28-24 22 24 24-36 24 36 20-20 17 20 22-26 24 26 30-34 24 34 20-22 22 22 24-20 22 20 30-28 21 28 22-26 22 26 19-18 18 18 21-24 18 24 25-34 22 34 19-22 20 22 26-30 24 30 21-26 18 26 20-18 17 18v40H0Z"
            fill="rgba(13, 24, 33, 0.9)"
          />
          <path
            d="M0 260V236l34-26 30 26 28-22 32 22 30-20 34 20 24-18 30 18 28-24 36 24 24-22 32 22 28-20 34 20 24-18 28 18 30-22 36 22 24-20 28 20 30-22 32 22 28-20 30 20 34-24 28 24 32-20 30 20 26-18 28 18 30-20 34 20 26-18 30 18 26-16 34 16 30-20 28 20 30-18 36 18 24-16 32 16 28-20 34 20 28-18 30 18v24H0Z"
            fill="rgba(22, 39, 53, 0.65)"
          />
        </svg>
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-80 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 hidden lg:block" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient
              id="trail-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="240"
              y2="0"
              spreadMethod="repeat"
            >
              <stop offset="0" stopColor="#22d3ee" stopOpacity="0.22" />
              <stop offset="0.4" stopColor="#22d3ee" stopOpacity="0.45" />
              <stop offset="0.5" stopColor="#fcd34d" stopOpacity="0.95" />
              <stop offset="0.6" stopColor="#22d3ee" stopOpacity="0.45" />
              <stop offset="1" stopColor="#22d3ee" stopOpacity="0.22" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="0 0"
                to="240 0"
                dur="0.7s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>
          <path
            d={trailPath}
            stroke={trailHot ? 'url(#trail-gradient)' : 'rgba(34, 211, 238, 0.35)'}
            strokeWidth={trailHot ? 3 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {puffs.map((puff) => (
          <span
            key={puff.id}
            className="plane-puff"
            style={{ left: `${puff.x}px`, top: `${puff.y}px` }}
          />
        ))}

        <div
          className="absolute left-0 top-0"
          style={{
            transform: `translate(${plane.x - PLANE_HALF}px, ${plane.y - PLANE_HALF}px) rotate(${plane.angle + (plane.roll || 0)}deg)`,
            transformOrigin: `${PLANE_HALF}px ${PLANE_HALF}px`,
          }}
        >
          <svg
            viewBox="0 0 48 48"
            className={`plane-craft drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]${plane.boost ? ' is-boost' : ''}`}
            style={{ width: `${PLANE_SIZE}px`, height: `${PLANE_SIZE}px` }}
            fill="none"
          >
            <path
              d="M5 22.5 43 5 28.5 43l-7.5-13-16-7.5Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M43 5 21 28"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <main className="main-shell relative mx-auto max-w-6xl px-6 pb-16 pt-10 sm:px-10">
        <div className="top-toolbar mb-8 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            className="control-btn inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition hover:border-cyan-400"
          >
            <UiIcon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4" />
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            type="button"
            onClick={() => setLocale((current) => (current === 'nl' ? 'en' : 'nl'))}
            className="control-btn inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition hover:border-cyan-400"
          >
            <UiIcon name="language" className="h-4 w-4" />
            <UiIcon name={locale === 'nl' ? 'en' : 'nl'} className="text-[11px] font-bold" />
            {locale === 'nl' ? 'English' : 'Nederlands'}
          </button>
        </div>

        <motion.section
          className="hero-panel mb-20"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -6, transition: { duration: 0.12, ease: 'easeOut' } }}
        >
          <p className="hero-kicker mb-5 inline-block rounded-full border border-zinc-700 px-4 py-1 text-xs uppercase tracking-[0.2em] text-zinc-400">
            Portfolio 2026
          </p>
          <div className="flex items-center gap-4">
            {(() => {
              const logoSrc = theme === 'dark' ? '/TVbl.png' : '/TV.png'
              return (
                <img
                  src={logoSrc}
                  alt="Tiebe Vaes logo"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = '/TV.png'
                  }}
                  className="hero-logo h-12 w-12 rounded object-cover"
                />
              )
            })()}
            <h1 className="hero-title max-w-3xl font-title text-4xl font-bold leading-tight text-white sm:text-6xl">
              {PROFILE.name}
            </h1>
          </div>
          <p className="hero-subtitle mt-4 max-w-2xl text-lg text-zinc-300 sm:text-xl">
            {t.tagline}
          </p>
          <p className="hero-copy mt-6 max-w-3xl text-zinc-400">{t.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="btn-primary rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              {t.ctaProjects}
            </a>
            <a
              href="#contact"
              className="btn-ghost rounded-xl border border-zinc-600 px-5 py-3 font-semibold transition hover:border-zinc-300"
            >
              {t.ctaContact}
            </a>
            <a
              href="/CV Tiebe Vaes.pdf"
              download
              className="btn-ghost inline-flex items-center gap-2 rounded-xl border border-zinc-600 px-5 py-3 font-semibold transition hover:border-zinc-300"
            >
              <UiIcon name="download" className="h-4 w-4" />
              {t.downloadCv}
            </a>
          </div>
        </motion.section>

        <motion.section
          className="mb-20 grid gap-6 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <article className="card md:col-span-2">
            <h2 className="section-title">{t.aboutTitle}</h2>
            <p className="mt-3 text-zinc-300">{t.aboutText}</p>
          </article>
          <article className="card">
            <h2 className="section-title">{t.languagesTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {SKILLS.languages.map((language) => (
                <span className="chip flex items-center gap-2" key={language.icon}>
                  <UiIcon
                    name={language.icon}
                    className="text-[11px] font-bold text-cyan-300"
                  />
                  {localizedText(language, locale)}
                </span>
              ))}
            </div>
          </article>
        </motion.section>

        <motion.section
          className="mb-20 grid gap-6 lg:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <article className="card">
            <h2 className="section-title">{t.educationTitle}</h2>
            <ul className="mt-4 space-y-4">
              {EDUCATION.map((item) => (
                <li key={item.title} className="rounded-lg border border-zinc-800 p-4">
                  <p className="font-semibold text-zinc-100">{item.title}</p>
                  <p className="text-sm text-zinc-400">{item.period}</p>
                  <p className="text-sm text-zinc-500">{item.place}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2 className="section-title">{t.skillsTitle}</h2>

            <p className="mt-4 text-sm uppercase tracking-[0.14em] text-zinc-500">
              {t.programming}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SKILLS.programming.map((skill) => (
                <span className="chip flex items-center gap-2" key={skill}>
                  <SkillIcon name={skill} theme={theme} />
                  {skill}
                </span>
              ))}
            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.14em] text-zinc-500">
              {t.frameworks}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SKILLS.frameworks.map((framework) => (
                <span className="chip flex items-center gap-2" key={framework}>
                  <SkillIcon name={framework} theme={theme} />
                  {framework}
                </span>
              ))}
            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.14em] text-zinc-500">
              {t.tools}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SKILLS.tools.map((tool) => (
                <span className="chip flex items-center gap-2" key={tool}>
                  <SkillIcon name={tool} theme={theme} />
                  {tool}
                </span>
              ))}
            </div>
          </article>
        </motion.section>

        <motion.section
          id="projects"
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="section-title">{t.projectsTitle}</h2>
              <p className="mt-2 text-zinc-400">{t.projectsSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="filter-wrap">
                <span className="filter-label">{t.filterType}</span>
                <select
                  value={sourceFilter}
                  onChange={(event) => setSourceFilter(event.target.value)}
                  className="filter-select"
                >
                  <option value="all">{t.all}</option>
                  <option value="github">GitHub</option>
                  <option value="gitlab">GitLab</option>
                </select>
              </label>
              <label className="filter-wrap">
                <span className="filter-label">{t.filterLanguage}</span>
                <select
                  value={languageFilter}
                  onChange={(event) => setLanguageFilter(event.target.value)}
                  className="filter-select"
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {loading && (
            <div className="card text-zinc-300">{t.loadingProjects}</div>
          )}

          {error && <div className="card text-rose-300">{error}</div>}

          {!loading && !error && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  className="project-card flex cursor-pointer flex-col"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setActiveProject(project)
                    }
                  }}
                >
                  <ProjectGallery
                    images={getProjectScreenshots(project.name)}
                    projectName={project.name}
                  />
                  <div className="mb-4 text-xs uppercase tracking-[0.15em] text-zinc-500">
                    {localizedText(project.category, locale) || project.source}
                  </div>
                  <h3 className="font-title text-xl font-semibold text-white">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-300">
                    {localizedText(project.description, locale)}
                  </p>

                  {project.tech?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tag) => (
                        <span
                          key={`${project.id}-${tag}`}
                          className="chip flex items-center gap-2"
                        >
                          <SkillIcon name={tag} theme={theme} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-6 flex text-sm">
                    {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="project-link inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/50 px-3 py-2 font-semibold text-cyan-300 transition hover:border-cyan-400/60 hover:bg-zinc-800"
                      aria-label={t.repo}
                    >
                      <ContactIcon name="github" />
                      <span>Source</span>
                    </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section
          id="contact"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -6, transition: { duration: 0.12, ease: 'easeOut' } }}
        >
          <h2 className="section-title">{t.contactTitle}</h2>
          <div className="mt-4 grid gap-3 text-zinc-300 sm:grid-cols-2">
            <a
              href={`mailto:${PROFILE.email}`}
              className="contact-link flex items-center gap-3"
            >
              <ContactIcon name="mail" />
              <span>{PROFILE.email}</span>
            </a>
            <a href="tel:+32468547153" className="contact-link flex items-center gap-3">
              <ContactIcon name="phone" />
              <span>{PROFILE.phone}</span>
            </a>
            <p className="contact-link flex items-center gap-3">
              <ContactIcon name="location" />
              <span>{PROFILE.location}</span>
            </p>
            <a
              href={`https://github.com/${PROFILE.githubPrimaryUsername}`}
              target="_blank"
              rel="noreferrer"
              className="contact-link flex items-center gap-3"
            >
              <ContactIcon name="github" />
              <span>GitHub</span>
            </a>
            <a
              href={`https://gitlab.com/${PROFILE.gitlabUsername}`}
              target="_blank"
              rel="noreferrer"
              className="contact-link flex items-center gap-3"
            >
              <ContactIcon name="gitlab" />
              <span>GitLab</span>
            </a>
          </div>
        </motion.section>
      </main>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          locale={locale}
          theme={theme}
          labels={t}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  )
}

export default App
